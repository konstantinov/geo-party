import { Category, Item } from '$lib/db';
import { ITEMS_PAGE_SIZE } from '$env/static/private';

export const load = async ({ url }) => {
	const categories = await Category.find({}, {}, { sort: { name: 1 } }).then((cats) =>
		cats.map((cat) => cat.toJSON())
	);

	const query = url.searchParams.get('query');

	let items = [];

	if (query) {
		const page = parseInt(url.searchParams.get('page')) || 1;
		const pageSize = parseInt(ITEMS_PAGE_SIZE);

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
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.populate('images')
			.populate('category')
			.then((result) => result.map((r) => r.toJSON()));
	}

	return {
		categories,
		items
	};
};
