import { Item } from '$lib/db';

export const load = async ({ locals }) => {
	if (locals.user) {
		const items = await Item.find({ userId: locals.user.id }, {}, { sort: { name: 1 } })
			.populate('images')
			.populate('category')
			.populate('stat')
			.then((cats) => cats.map((cat) => cat.toJSON()));

		return {
			items
		};
	}
};
