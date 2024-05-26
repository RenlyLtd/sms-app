<script lang="ts">
	import FileSpreadsheet from 'lucide-svelte/icons/file-spreadsheet';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import type { PageData } from './$types.js';
	import CreateListForm from './create-list-form.svelte';
	import ImportCsvForm from './import-csv-form.svelte';
	export let data: PageData;
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import { enhance } from '$app/forms';
	let openDialogId = null; // Holds the ID of the item whose dialog is open
	let dialogOpen = false;
	function openDialog(id: number) {
		dialogOpen = true;
		openDialogId = id; // Set this ID when the delete button is clicked
	}

	function closeDialog() {
		dialogOpen = false;
		openDialogId = null; // Reset when closing the dialog
	}
	console.log(data);

	$: ({ lists } = data);
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Dialog from '$lib/components/ui/dialog';

	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input';
	import Search from 'lucide-svelte/icons/search';
	import * as Pagination from '$lib/components/ui/pagination';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	import { onMount } from 'svelte';

	const desktopQuery = '(min-width: 768px)';
	let count = 20;
	let perPage: number;
	let siblingCount: number;

	// Function to handle window resize
	function handleResize() {
		const isDesktop = window.matchMedia(desktopQuery).matches;
		perPage = isDesktop ? 3 : 8;
		siblingCount = isDesktop ? 1 : 0;
	}

	// Setup and teardown the resize listener only in the client-side environment
	onMount(() => {
		handleResize(); // Initialize values correctly on load
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
	import { Label } from '$lib/components/ui/label';
	import { goto } from '$app/navigation';
	let selectedItems: number[] = [];

	function toggleAll(e) {
		selectedItems = e.target.checked ? lists.map((list) => list.list_id) : [];
	}
	import Trash from 'lucide-svelte/icons/trash-2';

	$: console.log(selectedItems);
</script>

<svelte:window on:resize={handleResize} />

<main class="m-4 space-y-4">
	<div class="mx-2 grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Lists</h1>
		<p class="text-muted-foreground">Manage your lists</p>
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
			{#if selectedItems.length > 0}
				<form method="POST" action="?/deleteLists">
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
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Add New List </span>
					</Button></Dialog.Trigger
				>
				<Dialog.Content>
					<CreateListForm data={data.form} />
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>

	<Card.Root>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="hidden  sm:table-cell"
							><input
								type="checkbox"
								on:change={toggleAll}
								checked={selectedItems.length === lists.length}
							/></Table.Head
						>
						<Table.Head class="hidden  sm:table-cell">Name</Table.Head>
						<Table.Head>Type</Table.Head>
						<Table.Head class="hidden w-[300px] md:table-cell">Description</Table.Head>
						<Table.Head class="hidden md:table-cell">Account</Table.Head>
						<Table.Head class="hidden md:table-cell">Tags</Table.Head>
						<Table.Head class="hidden md:table-cell">Leads</Table.Head>
						<Table.Head class="hidden md:table-cell">Created at</Table.Head>
						<Table.Head class="table-cell">
							<span class="sr-only">Actions</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each lists as list}
						<!-- content here -->
						<Table.Row>
							<Table.Cell class="font-medium"
								><input
									type="checkbox"
									bind:group={selectedItems}
									value={list.list_id}
								/></Table.Cell
							>
							<Table.Cell class="font-medium">{list.name}</Table.Cell>
							<Table.Cell>
								{list.type}
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">{list.description}</Table.Cell>
							<Table.Cell class="hidden md:table-cell">{list.account}</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								{#each list.tags as tag}
									<Badge class="m-0.5">{tag}</Badge>
									<!-- content here -->
								{/each}
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">{list.leads.length}</Table.Cell>
							<Table.Cell class="hidden md:table-cell">{list.created.toLocaleString()}</Table.Cell>
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
											on:click={() => goto(`/lists/${list.list_id}`)}
											class="cursor-pointer">Edit</DropdownMenu.Item
										>
										<form method="POST" action="?/deleteList">
											<input type="hidden" name="listId" value={list.list_id} />
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
				Showing <strong>1-10</strong> of <strong>32</strong> lists
			</div>

			<Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage>
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton>
							<ChevronLeft class="h-4 w-4" />
							<span class="hidden sm:block">Previous</span>
						</Pagination.PrevButton>
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton>
							<span class="hidden sm:block">Next</span>
							<ChevronRight class="h-4 w-4" />
						</Pagination.NextButton>
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root>
		</Card.Footer>
	</Card.Root>
</main>
