import { AQL_PRIMARY_TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { destinations, message } = await request.json();

	const res = await fetch('https://api.aql.com/v2/sms/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': AQL_PRIMARY_TOKEN
		},
		body: JSON.stringify({
			destinations: destinations,
			message: message
		})
	});

	return new Response(null, { status: res.status });
};
