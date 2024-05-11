import type { PageServerLoad, Actions, RequestEvent } from '../$types';
import Papa from 'papaparse';
import { db } from '$lib/server/prisma';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { formSchema, csvSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id, 10);

	return {
		form: await superValidate(zod(formSchema)),
		csvForm: await superValidate(zod(csvSchema)),
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
	importCSV: async ({ request }) => {
		const csvForm = await superValidate(request, zod(csvSchema));

		if (!csvForm.valid) {
			return fail(400, { csvForm });
		}

		const readableCsv = csvForm.data.csvFile;
		const fileContent = await readableCsv.text();

		return new Promise((resolve, reject) => {
			Papa.parse(fileContent, {
				header: true,
				skipEmptyLines: true,
				complete: async (results) => {
					const data = results.data;
					try {
						for (const item of data) {

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
