import { error } from '@sveltejs/kit';

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

	const id = item.id;
	delete item.id;

	const userId = new mongoose.Types.ObjectId(locals.user.id);

	const result = await Item.updateOne(
		{ _id: new mongoose.Types.ObjectId(id), userId },
		{ $set: { ...item, userId } },
		{ upsert: true }
	);

	const itemId = id || result.upsertedId?.toString();

	await Promise.all(
		item.images.map(async (image) => {
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
	);

	return new Response(JSON.stringify({ status: 'ok', id: itemId }));
};
