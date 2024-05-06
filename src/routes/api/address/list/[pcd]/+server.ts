// https://api.hermesworld.co.uk/customer-order-api/v1/validate-postcode/e1%200jj
// https://api.hermesworld.co.uk/address-api/v1/addresses/summary?query=e1%200jj&maxResults=100
// https://api.hermesworld.co.uk/address-api/v1/addresses/8692887

import type { RequestHandler } from '@sveltejs/kit';

import { EVRI_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const pcd: string = params.pcd;

	const queryParams = new URLSearchParams({
		pcd: pcd,
		maxResults: '100'
	});

	try {
		const l = await fetch(
			`https://api.hermesworld.co.uk/address-api/v1/addresses/summary?${queryParams.toString()}`,
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

		if (!l.ok) throw new Error('Failed to fetch address list');

		const addressListRes = await l.json();

		return addressListRes;
	} catch (error) {
		console.error('Unable to process request to get address list:', error.message);
	}
};
