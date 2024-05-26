import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
	return {
		campaigns: await db.campaign.findMany({
			include: {
				template: true, // Include the related template directly
				CampaignLists: {
					include: {
						List: {
							select: {
								name: true // Only include the name of the list
							}
						}
					}
				}
			}
		}),

		lists: await db.list.findMany({
			include: {
				leads: {
					// Include related lists through the join table
					include: {
						lead: true // This includes the actual List details
					}
				}
			}
		}),
		templates: await db.template.findMany()
	};
}) satisfies PageServerLoad;

export const actions = {
	createCampaign: async ({ request }) => {
		const formData = await request.formData();

		const title = formData.get('name');
		const template = JSON.parse(formData.get('template')); // Assuming this is a JSON string
		const lists = JSON.parse(formData.get('lists')); // Assuming this is a JSON string containing an array of objects

		try {
			// Create the campaign first
			const campaign = await db.campaign.create({
				data: {
					name: title,
					status: 'draft',
					template: {
						connect: { id: template.id }
					}
				}
			});

			// Create entries in the CampaignLists table
			await Promise.all(
				lists.map((list) =>
					db.campaignLists.create({
						data: {
							listId: list.list_id,
							campaignId: campaign.id
						}
					})
				)
			);
		} catch (err) {
			console.error(err);
			return {
				status: 500,
				body: {
					message: 'Something went wrong'
				}
			};
		}

		return {
			status: 200,
			body: {
				message: 'Campaign created successfully'
			}
		};
	},
	deleteCampaign: async ({ request }) => {
		const formData = await request.formData();
		const campaignId = formData.get('campaignId');

		try {
			await db.campaignLists.deleteMany({
				where: {
					campaignId: Number(campaignId)
				}
			});

			// Then, delete the campaign itself
			await db.campaign.delete({
				where: {
					id: Number(campaignId)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, {
				message: 'Something went wrong deleting the campaign'
			});
		}

		return {
			status: 200
		};
	}
};
