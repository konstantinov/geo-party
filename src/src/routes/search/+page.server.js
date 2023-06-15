import { Category } from '$lib/db';

export const load = async () => {
	const categories = await Category.find({}, {}, { sort: { name: 1 } }).then((cats) =>
		cats.map((cat) => cat.toJSON())
	);

	return {
		categories
	};
};
