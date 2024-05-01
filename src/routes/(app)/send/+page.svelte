<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	let message = '';
	let number = '';
	let destination: string[] = [];
	let inputField;
	let smsCount = 1;

	const onInput = (event) => {
		if (event.key !== 'Enter') return;
		const isValidMobileNumber = validateMobileNumber(event.target.value);

		if (!isValidMobileNumber) {
			alert('Please enter a mobile number in this format: 447500123456');
			return;
		}
		destination = [...destination, event.target.value];
		inputField.value = '';
	};

	function validateMobileNumber(number) {
		const regex = /^447\d{9}$/;
		return regex.test(number);
	}

	async function sendSMS() {
		const res = await fetch('/api/send-sms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				destinations: [destination],
				message: message
			})
		});

		await res.json();
	}
</script>

<main
	class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
>
	<div class="mx-auto grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Send a SMS</h1>
	</div>
	<div
		class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
	>
		<nav
			class="grid gap-4 text-sm text-muted-foreground"
			data-x-chunk-container="chunk-container after:right-0"
		>
			<a href="##" class="font-semibold text-primary"> General </a>
			<a href="##">Security</a>
			<a href="##">Integrations</a>
			<a href="##">Support</a>
			<a href="##">Organizations</a>
			<a href="##">Advanced</a>
		</nav>
		<div class="grid gap-6">
			<Card.Root class="w-full max-w-md">
				<Card.Header>
					<Card.Title>Send a SMS</Card.Title>
					<Card.Description>Use this form to send an SMS</Card.Description>
				</Card.Header>
				<Card.Content>
					<Label for="tel">Mobile Number</Label>

					<input
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						type="tel"
						bind:value={number}
						on:keydown={onInput}
						placeholder="Enter mobile number"
						bind:this={inputField}
					/>
					<div>
						<Label>Recipients</Label>
						<div class="min-h-10 space-x-1 rounded-md border p-1">
							{#each destination as item}
								<!-- content here -->
								<Badge>{item}</Badge>
							{/each}
						</div>
					</div>
					<Label for="message">Message</Label>
					<textarea
						class="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						bind:value={message}
						on:input={() => {
							smsCount = Math.ceil(message.length / 160) * destination.length;
						}}
					/>
					<div class="flex justify-end p-1">
						<small>credit(s): {smsCount}</small>
					</div>
				</Card.Content>
				<Card.Footer>
					<Button on:click={sendSMS}>Send</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</div>
</main>
