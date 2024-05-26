import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		templates: await db.template.findMany()
	};
};

export const actions: Actions = {
	createTemplate: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name');
		const content = formData.get('content');

		try {
			await db.template.create({
				data: {
					name: name,
					content: content
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, {
				message: 'Something went wrong creating this template'
			});
		}

		return {
			status: 200
		};
	},
	deleteTemplate: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		try {
			await db.template.delete({
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
