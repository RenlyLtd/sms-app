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

export const csvSchema = z.object({
	csvFile: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 100_000, 'Max 100 kB upload size.')
		.refine((f) => f.type === 'text/csv', 'Only CSV files are allowed.')
});

export type CSVSchema = typeof csvSchema;
export type FormSchema = typeof formSchema;
