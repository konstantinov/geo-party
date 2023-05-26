import mongoose from 'mongoose';

const { Schema, model } = mongoose;
import { MONGO_URL } from '$env/static/private';

export const db = await mongoose.connect(MONGO_URL);

const userSchema = new Schema({
	name: String,
	email: { type: String, unique: true },
	googleId: { type: String, unique: true },
	avatar: String,
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: Date
});

const sessionSchema = new Schema({
	userId: { type: mongoose.Types.ObjectId, index: true },
	expiresAt: Date,
	createdAt: { type: Date, default: () => new Date() }
});

export const User = model('users', userSchema);
export const Session = model('sessions', sessionSchema);
