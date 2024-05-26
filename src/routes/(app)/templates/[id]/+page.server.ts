import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const template = await db.template.findUnique({
		where: {
			id: Number(params.id)
		}
	});
	if (!template) {
		throw error(404, 'Template not found');
	}
	return template;
};

export const actions: Actions = {
	updateTemplate: async ({ request, params }) => {
		const { name, content } = Object.fromEntries(await request.formData()) as {
			name: string;
			content: string;
		};

		try {
			await db.template.update({
				where: {
					id: Number(params.id)
				},
				data: {
					name,
					content
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not update template' });
		}
		throw redirect(303, '/templates');
	}
};
