import { db } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {campaigns: await db.campaign.findMany()};
}) satisfies PageServerLoad;