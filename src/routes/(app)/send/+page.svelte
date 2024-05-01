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

<div class="flex h-svh items-center justify-center">
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
