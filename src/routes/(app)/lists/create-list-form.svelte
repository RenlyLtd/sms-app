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
	import { Textarea } from '$lib/components/ui/textarea';
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
	import InputChip from '$lib/components/ui/input-chip/Input-chip.svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	const listType = [
		{ value: 'Public', label: 'Public' },
		{ value: 'Private', label: 'Private' }
	];
</script>

<h2 class="text-xl font-bold">Create a new List</h2>

<form method="POST" use:enhance action="?/createList">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>This is public name of your list.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="type">
		<Form.Control let:attrs>
			<Form.Label>Type</Form.Label>

			<Select.Root>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select a list type" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each listType as type}
							<Select.Item value={type.value} label={type.label}>{type.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="type" />
			</Select.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="account">
		<Form.Control let:attrs>
			<Form.Label>Account</Form.Label>
			<Input {...attrs} bind:value={$formData.account} />
		</Form.Control>
		<Form.Description
			>Accounts are freeholders who own the building for example Southwark Council</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="tags">
		<Form.Control let:attrs>
			<Form.Label>Tags</Form.Label>

			<InputChip {...attrs} bind:value={$formData.tags} placeholder="Enter tags and press enter" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
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
