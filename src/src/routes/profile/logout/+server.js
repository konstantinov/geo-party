import mongoose from 'mongoose';

import { Session } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, url }) {
    const sessionId = cookies.get('sid');

    if (sessionId) {
        console.log(sessionId);
        await Session.deleteOne({ _id:new mongoose.Types.ObjectId(sessionId) });
    }

    const redirect = new URL('/', url);

    return Response.redirect(redirect, 302);
}