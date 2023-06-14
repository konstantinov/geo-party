import { Item } from '$lib/db';
import mongoose from 'mongoose';

export const load = async ({ locals }) => {
	if (locals.user) {
		const items = await Item.find({ userId: locals.user.id }, {}, { sort: { name: 1 } })
			.populate('images')
			.then((cats) => cats.map((cat) => cat.toJSON()));

		return {
			items
		};
	}
};
