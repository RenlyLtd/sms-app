<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Trash from 'lucide-svelte/icons/trash-2';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import CreateCampaignForm from './create-campaign-form.svelte';
	export let data: PageData;
	const { campaigns, lists, templates } = data;

	console.log(data);

	import Search from 'lucide-svelte/icons/search';
	import { Input } from '$lib/components/ui/input';
	import FileSpreadsheet from 'lucide-svelte/icons/file-spreadsheet';
	import { Checkbox } from '$lib/components/ui/checkbox';
	let selectedItems: number[] = [];

	function toggleAll(e) {
		selectedItems = e.target.checked ? campaigns.map((item) => item.id) : [];
	}
</script>

<main class="flex-1 items-start space-y-4 p-4">
	<div class="mx-2 grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Campaigns</h1>
		<p class="text-muted-foreground">Manage your campaigns</p>
	</div>
	<div class="flex justify-between">
		<div class=" relative">
			<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search..."
				class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
			/>
		</div>
		<div>
			{#if selectedItems?.length > 0}
				<form method="POST" action="?/deleteCampaigns">
					<Button size="sm" variant="destructive" class="h-8 gap-1" type="submit">
						<Trash class="h-3.5 w-3.5" />
						<input type="hidden" value={selectedItems} name="selectedItems" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Delete </span>
					</Button>
				</form>
				<!-- content here -->
			{/if}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" size="sm" class="h-8 gap-1">
						<ListFilter class="h-3.5 w-3.5" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Filter </span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>Filter by</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.CheckboxItem checked>Active</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem>Draft</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem>Archived</DropdownMenu.CheckboxItem>
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<Dialog.Root>
				<Dialog.Trigger
					><Button size="sm" class="h-8 gap-1">
						<CirclePlus class="h-3.5 w-3.5" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Add New Campaign </span>
					</Button></Dialog.Trigger
				>
				<Dialog.Content>
					<CreateCampaignForm {templates} {lists} />
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
	<Card.Root>
		<Card.Content class="p-0">
			<Table.Root class="overflow-auto">
				<Table.Header>
					<Table.Row>
						<Table.Head class="table-cell"
							><input
								type="checkbox"
								on:change={toggleAll}
								checked={selectedItems.length === campaigns.length}
							/></Table.Head
						>
						<Table.Head class="table-cell">Title</Table.Head>
						<Table.Head class="table-cell">Message</Table.Head>
						<Table.Head class="table-cell">Lists</Table.Head>
						<Table.Head class="table-cell">Status</Table.Head>
						<Table.Head class="hidden md:table-cell">Created at</Table.Head>
						<Table.Head class="table-cell">
							<span class="sr-only">Actions</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each campaigns as item}
						<!-- content here -->
						<Table.Row>
							<Table.Cell class="font-medium">
								<input type="checkbox" bind:group={selectedItems} value={item.id} /></Table.Cell
							>
							<Table.Cell class="font-medium">{item.name}</Table.Cell>

							<Table.Cell class="table-cell">{item.template?.content}</Table.Cell>
							<Table.Cell class="table-cell space-x-1 space-y-1">
								{#each item.CampaignLists as list}
									<!-- content here -->
									<Badge>{list.List.name}</Badge>
								{/each}
							</Table.Cell>
							<Table.Cell class="table-cell capitalize">{item.status}</Table.Cell>

							<Table.Cell class="hidden md:table-cell">{item.created.toLocaleString()}</Table.Cell>
							<Table.Cell>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger asChild let:builder>
										<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
											<Ellipsis class="h-4 w-4" />
											<span class="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										<DropdownMenu.Label>Actions</DropdownMenu.Label>
										<DropdownMenu.Item
											on:click={() => goto(`/campaigns/${item.id}`)}
											class="cursor-pointer">Edit</DropdownMenu.Item
										>
										<form method="POST" action="?/deleteCampaign">
											<input type="hidden" name="campaignId" value={item.id} />
											<DropdownMenu.Item class="cursor-pointer"
												><Button type="submit" variant="ghost" class="m-0 h-fit p-0" size="icon"
													>Delete</Button
												></DropdownMenu.Item
											>
										</form>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Card.Footer>
			<div class="text-xs text-muted-foreground">
				Showing <strong>1-10</strong> of <strong>{data.campaigns.length}</strong> leads
			</div>
		</Card.Footer>
	</Card.Root>
</main>
