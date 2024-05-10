import type { PageServerLoad, Actions, RequestEvent } from '../$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/prisma';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';



export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id, 10);

	return {
		form: await superValidate(zod(formSchema)),
		list: await db.list.findUnique({
			where: {
				list_id: id
			},
			include: {
				leads: {
					// Include related lists through the join table
					include: {
						lead: {
							include: {
								Address: true
							}
						}
						// This includes the actual List details
					}
				}
			}
		})
	};
};

export const actions: Actions = {
	deleteList: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		try {
			await db.list.delete({
				where: {
					list_id: Number(id)
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
	},
	createListOnLead: async (event: RequestEvent) => {
		const id = event.url.searchParams.get('listid');

		const listid = parseInt(id);
		if (!listid) {
			return fail(400, { message: 'URL Parameter does not exist' });
		}
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
					postCode: data.postcode
				}
			});

			// Then create the lead, linking the newly created address
			const lead = await db.lead.create({
				data: {
					firstname: data.firstname,
					lastname: data.lastname,
					contact_no: data.phone,
					email: data.email,
					addressId: address.id // Assuming 'AddressId' is the foreign key in 'lead' table
				}
			});

			await db.listOnLead.create({
				data: {
					leadId: lead.id,
					listId: listid
				}
			});

			// If everything goes well, return a 201 status code
			return {
				status: 201,
				form

				// Optionally include ID of the newly created lead
			};
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not create the lead.' });
		}
	},
	importCSV: async (request) => {
		const files = request.body.get('files');
		const csvFile = files.get('csv');

		return new Promise((resolve, reject) => {
			Papa.parse(csvFile.stream(), {
				header: true,
				complete: async (results) => {
					const data = results.data;
					// Assuming `data` is an array of objects with `name` and `email` properties
					try {
						for (const item of data) {
							await prisma.user.create({
								data: item
							});
						}
						resolve({ status: 200, body: { message: 'Data uploaded successfully' } });
					} catch (error) {
						reject({ status: 500, body: { error: 'Failed to upload data' } });
					}
				}
			});
		});
	}
};
