import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const db = await mongoose.connect('mongodb+srv://mongo/geo');

const userSchema = new Schema({
	name: String,
	email: String,
	googleId: String,
	createdAt: Date,
	updatedAt: Date
});

export const User = model('userrs', userSchema);
