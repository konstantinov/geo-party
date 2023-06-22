import { Bookmark, Item } from '$lib/db';

export const load = async ({ locals }) => {
	if (locals.user) {
		const bookmark = (await Bookmark.findOne({ userId: locals.user.id })) || { bookmarks: {} };

		const itemIds = Object.keys(bookmark.bookmarks);

		const items = await Item.find({ _id: { $in: itemIds } })
			.populate('images')
			.populate('category')
			.then((r) => r.map((i) => i.toJSON()));

		return { items };
	}
};
