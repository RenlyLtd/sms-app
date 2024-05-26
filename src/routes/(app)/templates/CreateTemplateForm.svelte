<script>
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
</script>

<h1>Template Form</h1>
<form class="flex w-full max-w-sm flex-col gap-1.5" method="POST" action="?/createTemplate">
	<Label for="name">Name</Label>
	<Input type="text" id="name" name="name" placeholder="Name" />
	<Label for="content">Content</Label>
	<Textarea id="content" placeholder="Content" name="content" />
	<Button size="sm" class="h-8 gap-1" type="submit">
		<CirclePlus class="h-3.5 w-3.5" />
		<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Create Template </span>
	</Button>
</form>
