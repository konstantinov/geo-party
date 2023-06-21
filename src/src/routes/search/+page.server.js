import { Category, Item } from '$lib/db';

export const load = async ({ url }) => {
	const categories = await Category.find({}, {}, { sort: { name: 1 } }).then((cats) =>
		cats.map((cat) => cat.toJSON())
	);

	const query = url.searchParams.get('query');
	const bounds = url.searchParams.get('bounds');

	let items = [];

	// console.log(bounds);

	if (query || bounds) {
		let boundsQuery;
		if (bounds && bounds !== '-') {
			try {
				const boundsData = JSON.parse(url.searchParams.get('bounds'));

				boundsQuery = {
					latitude: { $gt: boundsData[0][0], $lt: boundsData[1][0] },
					longitude: { $gt: boundsData[0][1], $lt: boundsData[1][1] }
				};
			} catch (e) {}

			const searchQuery = query ? { $text: { $search: query } } : undefined;

			const categoriesQuery = url.searchParams.get('categoryIds')
				? { categoryId: { $in: url.searchParams.get('categoryIds').split(/,/) } }
				: undefined;
			if (searchQuery) {
				items = Item.find(
					{ ...searchQuery, ...categoriesQuery, ...boundsQuery },
					{ score: { $meta: 'textScore' } }
				).sort({
					score: { $meta: 'textScore' }
				});
			} else {
				items = Item.find({ ...categoriesQuery, ...boundsQuery });
			}

			items = await items
				.populate('images')
				.populate('category')
				.then((result) => result.map((r) => r.toJSON()));
		}
	}
	return {
		categories,
		items
	};
};
