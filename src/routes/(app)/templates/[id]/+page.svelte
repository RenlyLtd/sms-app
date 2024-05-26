<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';

	import { Button } from '$lib/components/ui/button';
</script>

<form action="?/updateTemplate" method="POST">
	<Card.Root class="m-2 max-w-md ">
		<Card.Header>
			<Card.Title>Editing Template: {data.name}</Card.Title>
			<Card.Description>Edit SMS template</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-1">
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" value={data.name} />
			<Label for="content">SMS Message</Label>
			<Textarea id="content" name="content" rows={5} value={data.content} />
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Save</Button>
		</Card.Footer>
	</Card.Root>
</form>
