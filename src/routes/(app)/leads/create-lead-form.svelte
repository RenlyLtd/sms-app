<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { browser } from '$app/environment';

	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, type FormResult } from 'sveltekit-superforms';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';
	import { PUBLIC_EVRI_KEY } from '$env/static/public';

	export let data: SuperValidated<Infer<FormSchema>>;

	let submitting = false;
	let validationError;
	let addressSuggestions;
	let fetched = false;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onSubmit() {
			submitting = true;
		},
		onResult({ result }) {
			try {
				if (result.type == 'success') {
					submitting = false;
					toast.success('A new lead has been created', {
						description: 'To send SMS to this contact, assign to a list.'
					});
					const closeButton = document.querySelector('[data-dialog-close]') as HTMLButtonElement;
					if (closeButton) {
						closeButton.click(); // Simulates a user clicking the close button
					}
				}
			} catch (error) {
				console.error(error);
			}
		}
	});

	const { form: formData, enhance } = form;

	import { fromError } from 'zod-validation-error';
	const handleClick = async () => {
		// parse some invalid value
		let pcd;
		try {
			postcode.parse(inputValue);
			pcd = inputValue;
		} catch (err) {
			validationError = fromError(err);

			return validationError;
		}

		const queryParams = new URLSearchParams({
			query: pcd,
			maxResults: '100'
		});

		try {
			const l = await fetch(
				`https://api.hermesworld.co.uk/address-api/v1/addresses/summary?${queryParams.toString()}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Origin: 'https://www.evri.com',
						Apikey: PUBLIC_EVRI_KEY, // Ensure API key is securely stored and accessed
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
					}
				}
			);

			if (!l.ok) throw new Error('Failed to fetch address list');

			const addressListRes = await l.json();

			addressSuggestions = addressListRes.results;

			return addressSuggestions;
		} catch (error) {
			console.error('Unable to process request to get address list:', error.message);
		}
	};

	import * as Select from '$lib/components/ui/select/index.js';

	const getAddressDetails = async (id: number) => {
		try {
			const a = await fetch(`https://api.hermesworld.co.uk/address-api/v1/addresses/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'https://www.evri.com',
					Apikey: PUBLIC_EVRI_KEY, // Ensure API key is securely stored and accessed
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
				}
			});

			if (!a.ok) throw new Error('Failed to fetch address details');

			const addressRes = await a.json();

			$formData.line1 = addressRes.line1;
			$formData.line2 = addressRes.line2;
			$formData.line3 = addressRes.line3;
			$formData.line4 = addressRes.line4;
			$formData.line5 = addressRes.line5;
			$formData.line6 = addressRes.line6;
			$formData.postcode = addressRes.postCode;
			fetched = true;

			return addressRes;
		} catch (error) {
			console.error('Error fetching address details:', error.message);
		}
	};

	import { Button } from '$lib/components/ui/button';
	let inputValue = '';

	import { z } from 'zod';

	const postcode = z
		.string()
		.regex(
			/(GIR 0AA)|((([A-Z][0-9]{1,2})|([A-Z][A-HJ-Y][0-9]{1,2})|([A-Z][0-9][A-Z])|([A-Z][A-HJ-Y][0-9][A-Z]?))\s?[0-9][A-Z]{2})/i,
			'Please enter a valid UK postcode'
		);

	import Label from '$lib/components/ui/label/label.svelte';
</script>

<h2 class="text-xl font-bold">Create a new Lead</h2>

<form method="POST" use:enhance action="?/createLead">
	<Form.Field {form} name="firstname">
		<Form.Control let:attrs>
			<Form.Label>First Name</Form.Label>
			<Input {...attrs} bind:value={$formData.firstname} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="lastname">
		<Form.Control let:attrs>
			<Form.Label>Last Name</Form.Label>
			<Input {...attrs} bind:value={$formData.lastname} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="phone">
		<Form.Control let:attrs>
			<Form.Label>Contact Number</Form.Label>
			<Input {...attrs} bind:value={$formData.phone} type="tel" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} type="email" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if fetched}
		<!-- content here -->
		<Form.Field {form} name="line1">
			<Form.Control let:attrs>
				<Form.Label>Address Line 1</Form.Label>
				<Input {...attrs} bind:value={$formData.line1} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="line2">
			<Form.Control let:attrs>
				<Form.Label>Address Line 2</Form.Label>
				<Input {...attrs} bind:value={$formData.line2} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="line3">
			<Form.Control let:attrs>
				<Form.Label>Address Line 3</Form.Label>
				<Input {...attrs} bind:value={$formData.line3} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="line4">
			<Form.Control let:attrs>
				<Form.Label>Address Line 4</Form.Label>
				<Input {...attrs} bind:value={$formData.line4} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="line5">
			<Form.Control let:attrs>
				<Form.Label>Address Line 5</Form.Label>
				<Input {...attrs} bind:value={$formData.line5} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="line6">
			<Form.Control let:attrs>
				<Form.Label>Address Line 6</Form.Label>
				<Input {...attrs} bind:value={$formData.line6} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="postcode">
			<Form.Control let:attrs>
				<Form.Label>Postcode</Form.Label>
				<Input {...attrs} bind:value={$formData.postcode} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{:else}
		<Label>Address</Label>

		<div class="my-2 flex w-full max-w-sm items-center space-x-2">
			<Input placeholder="Search by postcode" bind:value={inputValue} />
			<Button on:click={handleClick}>Search</Button>
		</div>
		{#if validationError}
			<p class="text-red-500">
				{validationError.toString()}
			</p>
		{/if}

		{#if addressSuggestions}
			<!-- content here -->
			<Select.Root>
				<Select.Trigger class="my-2 max-w-sm">
					<Select.Value placeholder="Select an address" />
				</Select.Trigger>
				<Select.Content class="h-[300px] overflow-y-auto">
					<Select.Group>
						{#each addressSuggestions as item}
							<Select.Item
								value={item.id}
								on:click={() => getAddressDetails(item.id)}
								label={item.suggestion}>{item.suggestion}</Select.Item
							>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="address" />
			</Select.Root>
		{/if}
	{/if}

	<div class="my-4 flex justify-end">
		<Form.Button disabled={submitting}
			>{#if submitting}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				Please Wait...
			{:else}
				Create Lead
			{/if}</Form.Button
		>
	</div>
</form>
