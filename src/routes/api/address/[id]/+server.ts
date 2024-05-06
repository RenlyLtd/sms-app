// https://api.hermesworld.co.uk/customer-order-api/v1/validate-postcode/e1%200jj
// https://api.hermesworld.co.uk/address-api/v1/addresses/summary?query=e1%200jj&maxResults=100
// https://api.hermesworld.co.uk/address-api/v1/addresses/8692887
import type { RequestHandler } from '@sveltejs/kit';

import { EVRI_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');

	try {
		const v = await fetch(`https://api.hermesworld.co.uk/address-api/v1/addresses/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Origin: 'https://www.evri.com',
				Apikey: EVRI_API_KEY, // Ensure API key is securely stored and accessed
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
			}
		});

		if (!v.ok) throw new Error('Failed to fetch validation details');

		const validationRes = await v.json();

		return validationRes;
	} catch (error) {
		console.error('Error fetching address details:', error.message);
	}
};
