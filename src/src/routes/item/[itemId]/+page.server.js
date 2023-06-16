import { error } from '@sveltejs/kit';
import { Item } from '~/../lib/db';

export const load = async ({ params }) => {
	const item = await Item.findById(params.itemId)
		.populate('images')
		.populate('category')
		.then((item) => item?.toJSON());

	if (item) {
		return {
			item
		};
	}

	throw error(404, 'Not found');
};
