import { error } from '@sveltejs/kit';

import { itemValidationSchema } from '~/../schemas/item.js';
import { Item } from '~/../lib/db';
import mongoose from 'mongoose';

export const POST = async ({ locals, request }) => {
	const item =  await request.json();
	if (!locals.user) {
		throw error(403, 'Not authorized');
	}

	try {
		itemValidationSchema.validateSync(item, { abortEarly: false });
	} catch(e) {
		throw error(400, e.message)
	}

	const id = item.id;
	delete item.id;

	await Item.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: { ...item } }, { upsert: true });


	return new Response(JSON.stringify({ status: 'ok' }));
};
