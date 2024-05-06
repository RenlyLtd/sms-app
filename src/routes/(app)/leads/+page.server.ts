import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		leads: await db.lead.findMany(),
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	createLead: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data } = form;

		try {
			// Create the address first
			const address = await db.address.create({
				data: {
					line1: data.line1,
					line2: data.line2,
					line3: data.line3,
					line4: data.line4,
					line5: data.line5,
					line6: data.line6,
					postcode: data.postcode
				}
			});

			// Then create the lead, linking the newly created address
			const lead = await db.lead.create({
				data: {
					firstname: data.first_name,
					lastname: data.last_name,
					contact_no: data.phone,
					email: data.email,
					addressId: address.id // Assuming 'AddressId' is the foreign key in 'lead' table
				}
			});

			// If everything goes well, return a 201 status code
			return {
				status: 201,
				form,
				lead: lead.id // Optionally include ID of the newly created lead
			};
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not create the lead.' });
		}
	},
	deleteLead: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		try {
			await db.lead.delete({
				where: {
					id: Number(id)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, {
				message: 'Something went wrong deleting your article'
			});
		}

		return {
			status: 200
		};
	}
};
