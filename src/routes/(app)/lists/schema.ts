import { z } from 'zod';

export const formSchema = z.object({
	name: z.string().min(2,'You must provide a name for your list.').max(50),
	account: z.string().min(2,'Please enter the Account this list relates to').max(50),
	tags: z.array(z.string().min(2).max(50)),
	description: z.string().min(2, 'You must provide a description for this list').max(150)
});

export type FormSchema = typeof formSchema;
