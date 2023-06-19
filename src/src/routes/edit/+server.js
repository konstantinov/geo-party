import { error, json } from '@sveltejs/kit';

import { itemValidationSchema } from '~/../schemas/item.js';
import { UPLOADCARE_KEY } from '$env/static/private';
import { Item, Image } from '~/../lib/db';
import mongoose from 'mongoose';
import { uploadDirect } from '@uploadcare/upload-client';

export const POST = async ({ locals, request }) => {
	const item = await request.json();

	if (!locals.user) {
		throw error(403, 'Not authorized');
	}

	try {
		itemValidationSchema.validateSync(item, { abortEarly: false });
	} catch (e) {
		throw error(400, e.message);
	}
	item.categoryId = item.category;
	delete item.category;
	const id = item.id;
	delete item.id;

	const userId = locals.user.id;

	const result = await Item.updateOne(
		{ _id: id, userId },
		{ $set: { ...item, userId } },
		{ upsert: true }
	);

	const itemId = id || result.upsertedId?.toString();

	const imageIds = item.images.filter(({ id }) => id).map(({ id }) => id);

	await Promise.all([
		imageIds.length > 0
			? Image.deleteMany({
					itemId: id,
					_id: { $nin: imageIds }
			  })
			: undefined,
		...item.images
			.filter(({ id }) => !id)
			.map(async (image) => {
				const fileData = Object.fromEntries(
					image.content.split(';').map((chunk) => chunk.split(/[:,]/))
				);

				const result = await uploadDirect(Buffer.from(fileData.base64, 'base64'), {
					publicKey: UPLOADCARE_KEY,
					fileName: image.name,
					contentType: fileData.data,
					store: true,
					metadata: {
						itemId,
						userId: locals.user.id
					}
				});

				await Image.create({
					itemId: new mongoose.Types.ObjectId(itemId),
					uuid: result.uuid,
					name: image.name,
					size: image.size,
					height: result.imageInfo?.height,
					width: result.imageInfo?.width,
					mimeType: result.contentInfo?.mime?.mime
				});
			})
	]);

	return json({ status: 'ok', id: itemId });
};
