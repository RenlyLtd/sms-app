import type { PageServerLoad } from './$types';
import { db } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return {
		dlr: await db.deliveryReport.findMany()
	};
};
