<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import {
		type SuperValidated,
		type Infer,
		type FormResult,
		superForm
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;

	let submitting = false;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onSubmit() {
			submitting = true;
		},
		onResult({ result }) {
			if (result.type == 'success') {
				submitting = false;
				toast.success('Your new list has been created', {
					description: 'To send SMS to this list, assign to a campaign.'
				});
				const closeButton = document.querySelector('[data-dialog-close]') as HTMLButtonElement;
				if (closeButton) {
					closeButton.click(); // Simulates a user clicking the close button
				}
			}
		}
	});

	const { form: formData, enhance } = form;
	import { Button } from '$lib/components/ui/button';
</script>

<h2 class="text-xl font-bold">Upload CSV</h2>

<form method="POST" use:enhance action="?/importCSV">
	<Form.Field {form} name="name" class="py-6">
		<Form.Control let:attrs>
			<Input
				{...attrs}
				bind:value={$formData.name}
				class="h-48 w-full border border-dashed"
				type="file"
			>
				<Form.Label>Name</Form.Label>
			</Input>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="account">
		<Form.Control let:attrs>
			<Form.Label>or upload from URL</Form.Label>

			<form class="flex w-full max-w-sm items-center space-x-2">
				<Input type="url" placeholder="Add file URL" {...attrs} bind:value={$formData.account} />
				<Button type="submit">Upload</Button>
			</form>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<div class="my-4 flex justify-end">
		<Form.Button disabled={submitting}
			>{#if submitting}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				Please Wait...
			{:else}
				Create List
			{/if}</Form.Button
		>
	</div>
</form>
