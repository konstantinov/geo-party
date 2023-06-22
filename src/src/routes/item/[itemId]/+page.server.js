import { error } from '@sveltejs/kit';

import { Bookmark, Item, Stat } from '~/../lib/db';

export const load = async ({ params, locals }) => {
	const item = await Item.findById(params.itemId)
		.populate('images')
		.populate('category')
		.populate('stat')
		.then((item) => item?.toJSON());

	if (item) {
		let stat, bookmarked;
		if (locals.user) {
			stat = (await Stat.findOne({ itemId: item.id })) || new Stat({ itemId: item.id });

			stat.set(`viewsData.${locals.user.id}`, new Date());
			stat.save();

			bookmarked = !!(await Bookmark.findOne({ userId: locals.user.id }).then((r) => r?.toJSON()))
				?.bookmarks[item.id];
		}
		return {
			item,
			stat: stat?.toJSON(),
			bookmarked
		};
	}

	throw error(404, 'Not found');
};
