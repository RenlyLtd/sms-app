import { AQL_PRIMARY_TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { destinations, message } = await request.json();

		const response = await fetch('https://api.aql.com/v2/sms/send', {
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

		const responseBody = await response.json(); // Assuming API returns JSON

		if (!response.ok) {
			// Handle non-2xx responses
			return new Response(
				JSON.stringify({
					message: responseBody.message,
					errors: responseBody.errors || 'Unknown error'
				}),
				{
					status: response.status,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		// Successful response handling
		return new Response(JSON.stringify(responseBody), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		// Catch fetch errors or other exceptions
		return new Response(
			JSON.stringify({
				message: 'Error making the request',
				error: error.message
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
};
