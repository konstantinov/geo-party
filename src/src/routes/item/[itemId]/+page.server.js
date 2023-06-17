import { error } from '@sveltejs/kit';
import mongoose from 'mongoose';
import { Item, Stat } from '~/../lib/db';

export const load = async ({ params, locals }) => {
	const item = await Item.findById(params.itemId)
		.populate('images')
		.populate('category')
		.populate('stat')
		.then((item) => item?.toJSON());

	if (item) {
		let stat;
		if (locals.user) {
			stat = (await Stat.findOne({ itemId: item.id })) || new Stat({ itemId: item.id });

			stat.set(`viewsData.${locals.user.id}`, new Date());
			stat.save();
		}
		return {
			item,
			stat: stat?.toJSON()
		};
	}

	throw error(404, 'Not found');
};
