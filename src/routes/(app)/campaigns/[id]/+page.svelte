<script lang="ts">
	export let data: PageData;
	console.log(data);
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	import * as Select from '$lib/components/ui/select';
	export let templates;
	export let lists;

	import { Button } from '$lib/components/ui/button';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';

	let selectedLists = [];
	let selectedTemplate;

	import * as Card from '$lib/components/ui/card';

	import type { PageData } from './$types';
</script>

<Card.Root class="m-2">
	<Card.Header>
		<Card.Title>Edit Campaign Details</Card.Title>
	</Card.Header>
	<Card.Content>
		<form class="flex w-full flex-col gap-1.5 space-y-4" method="POST" action="?/updateCampaign">
			<Label for="name">Title</Label>
			<Input type="text" id="name" name="name" placeholder="Name" value={data.campaign?.name} />
			<Label for="template">Template</Label>
			<Select.Root portal={null} bind:selected={selectedTemplate}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select a template" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each data.templates as template}
							<Select.Item value={template} label={template.name}>{template.name}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="template" value={data.campaign?.template} />
			</Select.Root>
			{#if selectedTemplate}
				<Card.Root>
					<Card.Content class="p-4">
						{selectedTemplate.value.content}
						<!-- content here -->
					</Card.Content>
				</Card.Root>
			{/if}

			<Label for="lists">Lists</Label>

			<Select.Root
				multiple
				bind:selected={selectedLists}
				on:selectedChange={(s) => {
					selectedLists = s ? s.map((c) => c.value) : [];
				}}
			>
				<Select.Trigger>
					<Select.Value placeholder="Select lists" />
				</Select.Trigger>
				<Select.Content>
					{#each data.lists as list}
						<Select.Item value={list}>{list.name}</Select.Item>
					{/each}
				</Select.Content>
				<Select.Input name="lists" />
			</Select.Root>

			<div class="mt-2 flex flex-wrap gap-2">
				{#each selectedLists as list}
					<div class="flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-800">
						{list.value.name}
						<button
							type="button"
							on:click={() => {
								selectedLists = selectedLists.filter((c) => c !== list);
							}}
							class="ml-2 text-blue-500 hover:text-blue-700"
						>
							&times;
						</button>
					</div>
				{/each}
			</div>
			<Button size="sm" class="h-8 gap-1" type="submit">
				<CirclePlus class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Create Campaign </span>
			</Button>
		</form>
	</Card.Content>
</Card.Root>
