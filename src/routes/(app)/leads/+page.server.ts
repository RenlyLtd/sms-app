import type { PageServerLoad } from './$types';
import { db } from '$lib/server/prisma';


export const load = (async () => {
    return {leads: await db.lead.findMany()};
}) satisfies PageServerLoad;