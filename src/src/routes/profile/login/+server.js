import axios from 'axios';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
	const { accessToken } = await request.json();
	console.log(accessToken);
	const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
		headers: { Authorization: `Bearer ${accessToken}` }
	});
	console.log(data);
	cookies.set('sid', '123', {
		path: '/',
		httpOnly: true,
		expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		sameSite: 'strict'
	});

	return new Response('');
}
