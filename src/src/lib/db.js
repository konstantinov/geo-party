import mongoose from 'mongoose';

const { Schema, model } = mongoose;
import { MONGO_URL } from '$env/static/private';

export const db = await mongoose.connect(MONGO_URL);

const transformId = (doc, ret) => {
	ret.id = ret._id.toString();
	delete ret._id;
	delete ret.password;
	delete ret.__v;

	Object.keys(ret).forEach((field) => {
		if (ret[field] instanceof mongoose.Types.ObjectId) {
			ret[field] = ret[field].toString();
		} else if (ret[field] && ret[field]['toJSON']) {
			ret[field] = ret[field].toJSON();
		}
	});
};

const userSchema = new Schema(
	{
		name: String,
		email: { type: String, unique: true },
		googleId: { type: String, unique: true },
		avatar: String
	},
	{
		toJSON: {
			transform: transformId
		},
		timestamps: true
	}
);

const sessionSchema = new Schema({
	userId: { type: mongoose.Types.ObjectId, index: true },
	expiresAt: Date,
	createdAt: { type: Date, default: () => new Date() }
});

const categorySchema = new Schema(
	{
		name: { type: String, unique: true },
		icon: String
	},
	{
		toJSON: {
			transform: transformId
		}
	}
);

const statSchema = new Schema(
	{
		itemId: { type: mongoose.Types.ObjectId, unique: true, ref: 'items' },
		viewsData: {
			type: Object,
			default: () => ({})
		}
	},
	{
		toJSON: {
			virtuals: true,
			transform: transformId
		},
		timestamps: true,
		virtuals: {
			views: {
				get() {
					return Object.keys(this?.viewsData).length;
				}
			}
		}
	}
);

const itemSchema = new Schema(
	{
		categoryId: { type: mongoose.Types.ObjectId, index: true, ref: 'categories' },
		userId: { type: mongoose.Types.ObjectId, index: true, ref: 'users', required: true },
		name: String,
		description: String,
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true },
		zoom: Number
	},
	{
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				transformId(doc, ret);

				ret.images = ret.images?.map((image) => {
					const result = { ...image };

					transformId(image, result);

					return result;
				});
			}
		},
		timestamps: true,
		virtuals: {
			category: {
				options: {
					ref: 'categories',
					localField: 'categoryId',
					foreignField: '_id',
					justOne: true
				}
			},
			images: {
				options: {
					ref: 'images',
					localField: '_id',
					foreignField: 'itemId'
				}
			},
			stat: {
				options: {
					ref: 'stats',
					localField: '_id',
					foreignField: 'itemId',
					justOne: true
				}
			}
		}
	}
);

itemSchema.index({ name: 'text', description: 'text' });

const imageSchema = new Schema({
	itemId: { type: mongoose.Types.ObjectId, index: true, ref: 'items' },
	uuid: String,
	mimeType: String,
	size: Number,
	name: String,
	height: Number,
	width: Number,
	createdAt: { type: Date, default: () => new Date() }
});

export const User = model('users', userSchema);
export const Session = model('sessions', sessionSchema);
export const Category = model('categories', categorySchema);
export const Item = model('items', itemSchema);
export const Image = model('images', imageSchema);
export const Stat = model('stats', statSchema);
