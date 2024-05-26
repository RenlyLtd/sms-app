<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	import { Button } from '$lib/components/ui/button';
</script>

<form action="?/updateLead" method="POST">
	<Card.Root class="m-2 max-w-md ">
		<Card.Header>
			<Card.Title>Editing Lead: {data.lead?.id}</Card.Title>
			<Card.Description>Edit Lead</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-1">
			<Label for="name">First Name</Label>
			<Input type="text" id="firstname" name="firstname" value={data.lead?.firstname} />
			<Label for="name">Last Name</Label>
			<Input type="text" id="lastname" name="lastname" value={data.lead?.lastname} />
			<Label for="name">Contact Number</Label>
			<Input type="text" id="contact_no" name="contact_no" value={data.lead?.contact_no} />
			<Label for="name">Email</Label>
			<Input type="email" id="email" name="email" value={data.lead?.email} />
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Save</Button>
		</Card.Footer>
	</Card.Root>
</form>
