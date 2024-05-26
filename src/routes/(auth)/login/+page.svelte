<!-- routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<form method="POST" use:enhance class="flex h-svh items-center justify-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your username below to login to your account.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="grid gap-2">
				<Label for="username">Username</Label>
				<Input id="username" name="username" type="username" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" type="password" name="password" required />
			</div>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" type="submit">Sign in</Button>
		</Card.Footer>
	</Card.Root>
</form>
