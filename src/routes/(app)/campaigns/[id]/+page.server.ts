import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const campaign = await db.campaign.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			template: true, // Include the related template
			CampaignLists: {
				include: {
					List: {
						select: {
							name: true // Include only the name of the list
						}
					}
				}
			}
		}
	});

	const lists = await db.list.findMany();

	const templates = await db.template.findMany();

	return {
		campaign,
		lists,
		templates
	};
};

export const actions: Actions = {
	updateCampaign: async ({ request, params }) => {
		const formData = Object.fromEntries(await request.formData());
		const { name, template, lists } = formData;
		const templateObj = JSON.parse(template); // Assuming this is a JSON string containing an array of objects

		const campaignId = Number(params.id);

		try {
			// Update the campaign
			const campaign = await db.campaign.update({
				where: {
					id: campaignId
				},
				data: {
					name: name,
					status: 'draft',
					template: {
						connect: { id: templateObj.id }
					}
				}
			});

			// Delete existing CampaignLists entries
			await db.campaignLists.deleteMany({
				where: {
					campaignId: campaignId
				}
			});

			// Recreate CampaignLists entries
			const listIds = JSON.parse(lists);
			await Promise.all(
				listIds.map((listId) =>
					db.campaignLists.create({
						data: {
							listId: Number(listId),
							campaignId: campaign.id
						}
					})
				)
			);
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not update campaign' });
		}

		throw redirect(303, '/campaigns');
	}
};
