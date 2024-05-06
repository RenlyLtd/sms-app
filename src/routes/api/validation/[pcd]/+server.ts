import type { RequestHandler } from '@sveltejs/kit';

import { EVRI_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const pcd = params.pcd;

	try {
		const v = await fetch(
			`https://api.hermesworld.co.uk/customer-order-api/v1/validate-postcode/${pcd}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'https://www.evri.com',
					Apikey: EVRI_API_KEY, // Ensure API key is securely stored and accessed
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
				}
			}
		);

		if (!v.ok) throw new Error('Failed to fetch validation details');

		const validationRes = await v.json();

		return validationRes;
	} catch (error) {
		console.error('Unable to process validation:', error.message);
	}
};
