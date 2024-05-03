<script lang="ts">
	import FileSpreadsheet from 'lucide-svelte/icons/file-spreadsheet';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import type { PageData } from './$types.js';
	import CreateListForm from './create-list-form.svelte';
	import ImportCsvForm from './import-csv-form.svelte';
	export let data: PageData;

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Dialog from '$lib/components/ui/dialog';

	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
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
					><Button size="sm" variant="outline" class="h-8 gap-1">
						<FileSpreadsheet class="h-3.5 w-3.5" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Import CSV </span>
					</Button></Dialog.Trigger
				>
				<Dialog.Content>
					<ImportCsvForm data={data.form} />
				</Dialog.Content>
			</Dialog.Root>

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
						<Table.Head class="hidden w-[300px] sm:table-cell">Name</Table.Head>
						<Table.Head>Type</Table.Head>
						<Table.Head class="hidden md:table-cell">Description</Table.Head>
						<Table.Head class="hidden md:table-cell">Total Leads</Table.Head>
						<Table.Head class="hidden md:table-cell">Created at</Table.Head>
						<Table.Head>
							<span class="sr-only">Actions</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium">Laser Lemonade Machine</Table.Cell>
						<Table.Cell>
							<Badge variant="outline">Draft</Badge>
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">$499.99</Table.Cell>
						<Table.Cell class="hidden md:table-cell">25</Table.Cell>
						<Table.Cell class="hidden md:table-cell">2023-07-12 10:42 AM</Table.Cell>
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
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="font-medium">Hypernova Headphones</Table.Cell>
						<Table.Cell>
							<Badge variant="outline">Active</Badge>
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">$129.99</Table.Cell>
						<Table.Cell class="hidden md:table-cell">100</Table.Cell>
						<Table.Cell class="hidden md:table-cell">2023-10-18 03:21 PM</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="font-medium">AeroGlow Desk Lamp</Table.Cell>
						<Table.Cell>
							<Badge variant="outline">Active</Badge>
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">$39.99</Table.Cell>
						<Table.Cell class="hidden md:table-cell">50</Table.Cell>
						<Table.Cell class="hidden md:table-cell">2023-11-29 08:15 AM</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="font-medium">TechTonic Energy Drink</Table.Cell>
						<Table.Cell>
							<Badge variant="secondary">Draft</Badge>
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">$2.99</Table.Cell>
						<Table.Cell class="hidden md:table-cell">0</Table.Cell>
						<Table.Cell class="hidden md:table-cell">2023-12-25 11:59 PM</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="font-medium">Gamer Gear Pro Controller</Table.Cell>
						<Table.Cell>
							<Badge variant="outline">Active</Badge>
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">$59.99</Table.Cell>
						<Table.Cell class="hidden md:table-cell">75</Table.Cell>
						<Table.Cell class="hidden md:table-cell">2024-01-01 12:00 AM</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="font-medium">Luminous VR Headset</Table.Cell>
						<Table.Cell>
							<Badge variant="outline">Active</Badge>
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">$199.99</Table.Cell>
						<Table.Cell class="hidden md:table-cell">30</Table.Cell>
						<Table.Cell class="hidden md:table-cell">2024-02-14 02:14 PM</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Card.Footer>
			<div class="text-xs text-muted-foreground">
				Showing <strong>1-10</strong> of <strong>32</strong> products
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
