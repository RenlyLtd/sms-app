import type { PageServerLoad, Actions } from '../$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id, 10);

	return {
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
	createList: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data } = form;

		try {
			// Then create the lead, linking the newly created address
			const list = await db.list.create({
				data: {
					name: data.name,
					account: data.account,
					tags: data.tags,
					description: data.description,
					type: data.type
				}
			});

			// If everything goes well, return a 201 status code
			return {
				status: 201,
				form,
				list: list.id // Optionally include ID of the newly created lead
			};
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not create the lead.' });
		}
	}
};
