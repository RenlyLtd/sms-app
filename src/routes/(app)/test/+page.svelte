<script lang="ts">
	import InputChip from '$lib/components/ui/input-chip/Input-chip.svelte';
	let list: string[] = ['foo', 'bar', 'fizz', 'buzz'];
</script>

<InputChip bind:value={list} name="chips" placeholder="Enter any value..." />
