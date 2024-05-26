import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function GET() {
	try {
		const leads = await db.lead.findMany({
			include: {
				Address: true, // Include related Address
				lists: {
					include: {
						list: true // This includes the actual List details
					}
				}
			}
		});
		console.log(leads);
		return new Response(JSON.stringify(leads), { status: 200 });
	} catch (error) {
		console.error('Error fetching leads:', error);
		return new Response(JSON.stringify({ error: 'Error fetching leads' }), { status: 500 });
	}
}
