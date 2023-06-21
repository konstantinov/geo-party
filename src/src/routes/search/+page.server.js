import { Category, Item } from '$lib/db';

export const load = async ({ url }) => {
	const categories = await Category.find({}, {}, { sort: { name: 1 } }).then((cats) =>
		cats.map((cat) => cat.toJSON())
	);

	const query = url.searchParams.get('query');

	let items = [];

	if (query) {
		const categoriesQuery = url.searchParams.get('categoryIds')
			? { categoryId: { $in: url.searchParams.get('categoryIds').split(/,/) } }
			: undefined;

		items = await Item.find(
			{ $text: { $search: query }, ...categoriesQuery },
			{ score: { $meta: 'textScore' } }
		)
			.sort({
				score: { $meta: 'textScore' }
			})

			.populate('images')
			.populate('category')
			.then((result) => result.map((r) => r.toJSON()));
	}

	return {
		categories,
		items
	};
};
