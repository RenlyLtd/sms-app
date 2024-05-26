import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const msgid = url.searchParams.get('msgid');
	const dest = url.searchParams.get('destinationnumber');
	const code = url.searchParams.get('reportcode');
	const dlr = url.searchParams.get('dlr');
	const ts = url.searchParams.get('ts');

	try {
		const report = await db.deliveryReport.create({
			data: {
				msg_id: msgid,
				destination_number: dest,
				code: code,
				dlr_body: dlr,
				timestamp: new Date(ts * 1000)
			}
		});

		console.log(report);
		return {
			status: 200,
			body: {
				message: 'Delivery report logged successfully',
				report
			}
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			body: {
				message: 'Error logging the delivery report',
				error: error.message
			}
		};
	}
};
