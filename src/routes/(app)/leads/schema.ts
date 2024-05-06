import { z } from 'zod';

export const formSchema = z.object({
	firstname: z.string().min(2, 'You must provide a first name for your lead.').max(50),
	lastname: z.string().min(2, 'You must provide a last name for your lead.').max(50),
	phone: z.string(),
	email: z.string().email(),
	line1: z.string(),
	line2: z.string().optional().nullable(),
	line3: z.string().optional().nullable(),
	line4: z.string().optional().nullable(),
	line5: z.string().optional().nullable(),
	line6: z.string().optional().nullable(),
	postcode: z.string()
});

export type FormSchema = typeof formSchema;
