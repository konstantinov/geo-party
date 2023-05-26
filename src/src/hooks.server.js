import { User, Session } from '$lib/db';

import mongoose from 'mongoose';

export const handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const sessionId = cookies.get('sid');

	if (sessionId) {
		const session = await Session.findOne({
			_id: new mongoose.Types.ObjectId(sessionId),
			expiresAt: { $gt: new Date() }
		}).exec();

		if (session) {
			event.locals.user = (await User.findById(session.userId)).toJSON();
			event.locals.user.id = event.locals.user._id.toString();
			delete event.locals.user._id;
		}
		if (!event.locals.user) cookies.delete('sid');
	}

	const response = await resolve(event);

	return response;
};
