<script lang="ts">
	export let data: PageData;
	console.log(data);
	const { list } = data;
	import { enhance } from '$app/forms';
	import File from 'lucide-svelte/icons/file';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import { page } from '$app/stores';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { PageData } from './$types';

	import * as Table from '$lib/components/ui/table/index.js';
	import Trash from 'lucide-svelte/icons/trash-2';

	let showStatusBar = true;
	let showActivityBar = false;
	let showPanel = false;

	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import { Description } from 'formsnap';

	const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next.js',
			label: 'Next.js'
		},
		{
			value: 'nuxt.js',
			label: 'Nuxt.js'
		},
		{
			value: 'remix',
			label: 'Remix'
		},
		{
			value: 'astro',
			label: 'Astro'
		}
	];

	let open = false;
	let value = '';

	$: selectedValue = frameworks.find((f) => f.value === value)?.label ?? 'Select a framework...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	import { Badge } from '$lib/components/ui/badge';
	import * as Dialog from '$lib/components/ui/dialog';
	import FileSpreadsheet from 'lucide-svelte/icons/file-spreadsheet';
	import ImportCsvForm from './import-csv-form.svelte';
	import CreateLeadForm from './create-lead-form.svelte';
	import Send from 'lucide-svelte/icons/send';
	import LeadToListForm from './lead-to-list-form.svelte';
</script>

<main class="m-4 space-y-4">
	<Card.Root class="border-none shadow-none">
		<Card.Header class="flex flex-row justify-between ">
			<div class="space-y-1">
				<h1 class="text-3xl font-semibold">{list.name}</h1>

				<Card.Description class="text-lg">
					{list.account}
				</Card.Description>
				<div class="flex h-fit gap-1">
					{#each list.tags as item}
						<!-- content here -->
						<Badge>{item}</Badge>
					{/each}
				</div>
			</div>
			<div class="flex gap-2">
				<Dialog.Root>
					<Dialog.Trigger
						><Button size="sm" variant="outline" class="h-8 gap-1">
							<FileSpreadsheet class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Import CSV </span>
						</Button></Dialog.Trigger
					>
					<Dialog.Content>
						<ImportCsvForm data={data.csvForm} />
					</Dialog.Content>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger
						><Button size="sm" variant="outline" class="h-8 gap-1">
							<FileSpreadsheet class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Add Leads to List </span>
						</Button></Dialog.Trigger
					>
					<Dialog.Content><LeadToListForm /></Dialog.Content>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger
						><Button size="sm" variant="destructive" class="h-8 gap-1">
							<Trash class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Delete </span>
						</Button></Dialog.Trigger
					>
					<Dialog.Content>
						<ImportCsvForm data={data.csvForm} />
					</Dialog.Content>
				</Dialog.Root>

				<Dialog.Root>
					<Dialog.Trigger
						><Button size="sm" variant="outline" class="h-8 gap-1">
							<CirclePlus class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Add New Lead </span>
						</Button></Dialog.Trigger
					>
					<Dialog.Content>
						<CreateLeadForm data={data.form} list={data.list} />
					</Dialog.Content>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger
						><Button size="sm" class="h-8 gap-1">
							<Send class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Bulk Send SMS </span>
						</Button></Dialog.Trigger
					>
					<Dialog.Content>
						<CreateLeadForm data={data.form} list={data.list} />
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</Card.Header>
	</Card.Root>

	<Card.Root>
		<Card.Content class="p-0">
			<Table.Root class="overflow-auto">
				<Table.Header>
					<Table.Row>
						<Table.Head class="table-cell"><input type="checkbox" /></Table.Head>
						<Table.Head class="table-cell">First Name</Table.Head>
						<Table.Head class="table-cell">Last Name</Table.Head>
						<Table.Head class="table-cell">Contact Number</Table.Head>
						<Table.Head class="table-cell">Email</Table.Head>
						<Table.Head class="table-cell">Address</Table.Head>
						<Table.Head class="table-cell">Postcode</Table.Head>
						<Table.Head class="hidden md:table-cell">Created at</Table.Head>
						<Table.Head class="table-cell">
							<span class="sr-only">Actions</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each list.leads as item}
						<Table.Row>
							<Table.Cell class="font-medium"><input type="checkbox" /></Table.Cell>
							<Table.Cell class="font-medium">{item.lead.firstname}</Table.Cell>

							<Table.Cell class="table-cell">{item.lead.lastname}</Table.Cell>
							<Table.Cell class="table-cell">{item.lead.contact_no}</Table.Cell>
							<Table.Cell class="table-cell">{item.lead.email}</Table.Cell>
							<Table.Cell class="table-cell">{item.lead.Address.line1}</Table.Cell>
							<Table.Cell class="table-cell">{item.lead.Address.postCode}</Table.Cell>
							<Table.Cell class="hidden md:table-cell"
								>{item.lead.created.toLocaleString()}</Table.Cell
							>
							<Table.Cell>
								<form method="POST" action="?/removeLeadFromList">
									<input type="hidden" name="listId" value={$page.params.id} />
									<input type="hidden" name="leadId" value={item.lead.id} />
									<Button aria-haspopup="true" size="icon" variant="ghost" type="submit">
										<Trash class=" h-4 w-4" />
									</Button>
								</form>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Card.Footer>
			<div class="text-xs text-muted-foreground">
				Showing <strong>1-10</strong> of <strong>{list?.leads.length}</strong> leads
			</div>
		</Card.Footer>
	</Card.Root>
</main>
