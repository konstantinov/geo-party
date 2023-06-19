import { error } from '@sveltejs/kit';

import { Item } from '~/../lib/db';

export const load = async ({ params, locals }) => {
	const item = await Item.findById(params.itemId).populate('images').populate('category');

	if (!item) {
		throw error(404, 'Not found');
	}

	if (!locals.user || locals.user.id !== item.userId.toString()) {
		throw error(403, 'Forbidden');
	}

	return {
		item: item.toJSON()
	};
};
