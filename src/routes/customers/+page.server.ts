import type { PageServerLoad } from './$types';
import { db } from '$lib/server/prisma';


export const load = (async () => {
    return {customers: await db.customer.findMany()};
}) satisfies PageServerLoad;