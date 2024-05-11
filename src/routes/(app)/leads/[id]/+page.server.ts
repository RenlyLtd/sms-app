import type { PageServerLoad, Actions, RequestEvent } from '../$types';

import { db } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	return {
		lead: await db.lead.findUnique({
			where: {
				id: parseInt(id)
			},
			include: {
				Address: true,
				lists: {
					include: {
						list: true
					}
				}
			}
		})
	};
};
