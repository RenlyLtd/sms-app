<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import Papa from 'papaparse';

	let message = '';
	let file: File | null = null;

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			file = input.files[0];
		}
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		if (!file) {
			alert('Please upload a CSV file.');
			return;
		}

		Papa.parse(file, {
			complete: async (results: any) => {
				const destinations = results.data
					.map((row: { destinations: string }) => row.destinations)
					.filter(Boolean);

				const payload = {
					message,
					destinations
				};

				const response = await fetch('api/bulk-send', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(payload)
				});

				if (response.ok) {
					alert('Messages sent successfully!');
				} else {
					alert('Error sending messages.');
				}
			},
			header: true,
			skipEmptyLines: true
		});
	};
</script>

<form on:submit={handleSubmit}>
	<Card.Root class="m-2 max-w-lg">
		<Card.Header>
			<Card.Title>Bulk Send SMS</Card.Title>
			<Card.Description>
				Send SMS in Bulk. Ensure the CSV file has one column with destinations in correct format.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<Label for="message">Message</Label>
			<Textarea bind:value={message} required />
			<Label for="csv">Import CSV</Label>
			<Input type="file" accept=".csv" on:change={handleFileChange} required />
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Send Bulk SMS</Button>
		</Card.Footer>
	</Card.Root>
</form>
