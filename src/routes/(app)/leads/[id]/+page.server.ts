import type { PageServerLoad, Actions } from '../$types';

import { db } from '$lib/server/prisma';
import { redirect, fail } from '@sveltejs/kit';

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

export const actions: Actions = {
	updateLead: async ({ request, params }) => {
		const { firstname, lastname, contact_no, email } = Object.fromEntries(
			await request.formData()
		) as {
			firstname: string;
			lastname: string;
			contact_no: string;
			email: string;
		};

		try {
			await db.lead.update({
				where: {
					id: Number(params.id)
				},
				data: {
					firstname,
					lastname,
					contact_no,
					email
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not update lead' });
		}
		throw redirect(303, '/leads');
	}
};
