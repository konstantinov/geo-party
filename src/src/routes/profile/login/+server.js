import axios from 'axios';

import { PUBLIC_SESSION_TTL } from '$env/static/public';
import { User, Session } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
	const { accessToken } = await request.json();
	const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
		headers: { Authorization: `Bearer ${accessToken}` }
	});
	const existsingsUser = await User.findOne({ googleId: data.id }).exec();

	const { _id: userId } =
		existsingsUser ||
		(await User.create({
			name: data.name,
			email: data.email,
			googleId: data.id,
			avatar: data.picture
		}));

	const { _id: sessionId } = await Session.create({
		userId,
		expiresAt: Date.now() + parseInt(PUBLIC_SESSION_TTL) * 1000
	});

	cookies.set('sid', sessionId.toString(), {
		path: '/',
		httpOnly: true,
		expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		sameSite: 'strict'
	});

	return new Response('');
}
