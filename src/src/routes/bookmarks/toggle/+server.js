import { error, json } from '@sveltejs/kit';

import { Bookmark, Item } from '$lib/db';

export const POST = async ({ locals, request }) => {
	if (!locals.user) throw error(403, 'Forbidden');

	const body = await request.json();

	if (body.itemId) {
		const item = await Item.findById(body.itemId);

		if (!item) return error(404, 'Not Found');

		const bookmark =
			(await Bookmark.findOne({ userId: locals.user.id })) ||
			new Bookmark({ userId: locals.user.id });

		const key = `bookmarks.${body.itemId}`;
		const newValue = bookmark.get(key) ? undefined : new Date();

		bookmark.set(key, newValue);
		bookmark.save();

		return json({ status: 'ok' });
	}
	return error(400, 'Bad request');
};
