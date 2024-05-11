<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { csvSchema, type CSVSchema } from './schema';
	import SuperDebug, {
		type SuperValidated,
		type Infer,
		type FormResult,
		superForm,
		fileProxy
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<CSVSchema>>;
	console.log(data);

	let submitting = false;
	const { form, enhance, errors } = superForm(data, {
		validators: zodClient(csvSchema),
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

	const file = fileProxy(form, 'csvFile');
</script>

<h2 class="text-xl font-bold">Upload CSV</h2>
<form method="POST" enctype="multipart/form-data" use:enhance action="?/importCSV">
	<input type="file" name="csvFile" accept="text/csv" bind:files={$file} />
	{#if $errors.csvFile}<span>{$errors.csvFile}</span>{/if}
	<button>Submit</button>
</form>
<SuperDebug data={$form} />

<!-- <form method="POST" enctype="multipart/form-data" use:enhance action="?/importCSV">
	<Form.Field {csvForm} name="csv" class="py-6">
		<Form.Control let:attrs>
			<input
				{...attrs}
				type="file"
				bind:files={$file}
				class="h-48 w-full border border-dashed"
				accept=".csv"
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="my-4 flex justify-end">
		<Form.Button disabled={submitting}
			>{#if submitting}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				Please Wait...
			{:else}
				Import CSV
			{/if}</Form.Button
		>
	</div>
</form> -->
