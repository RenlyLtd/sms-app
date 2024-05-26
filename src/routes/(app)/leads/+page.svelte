<script lang="ts">
	import { enhance } from '$app/forms';
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
	import CreateLeadForm from './create-lead-form.svelte';
	export let data: PageData;
	const { leads } = data;
	export let form;

	$: console.log(form);

	import Search from 'lucide-svelte/icons/search';
	import { Input } from '$lib/components/ui/input';
	import FileSpreadsheet from 'lucide-svelte/icons/file-spreadsheet';

	import ImportCsvForm from './import-csv-form.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	let selectedItems: number[] = [];

	function toggleAll(e) {
		selectedItems = e.target.checked ? leads.map((item) => item.id) : [];
	}

	import * as Alert from '$lib/components/ui/alert';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import Tick from 'lucide-svelte/icons/check';
</script>

<main class="flex-1 items-start space-y-4 p-4">
	{#if form?.message}
		<Alert.Root variant="destructive">
			<CircleAlert class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{form.message}</Alert.Description>
		</Alert.Root>
	{:else if form?.success}
		<Alert.Root>
			<Tick class="h-4 w-4" />
			<Alert.Title>Success!</Alert.Title>
			<Alert.Description>Lead has been deleted succesfully.</Alert.Description>
		</Alert.Root>
	{:else}{/if}

	<div class="mx-2 grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Leads</h1>
		<p class="text-muted-foreground">Manage your leads</p>
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
				<form method="POST" action="?/deleteLeads">
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
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Add New Lead </span>
					</Button></Dialog.Trigger
				>
				<Dialog.Content>
					<CreateLeadForm data={data.form} />
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
								checked={selectedItems.length === leads.length}
							/></Table.Head
						>
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
					{#each leads as item}
						<!-- content here -->
						<Table.Row>
							<Table.Cell class="font-medium">
								<input type="checkbox" bind:group={selectedItems} value={item.id} /></Table.Cell
							>
							<Table.Cell class="font-medium">{item.firstname}</Table.Cell>

							<Table.Cell class="table-cell">{item.lastname}</Table.Cell>
							<Table.Cell class="table-cell">{item.contact_no}</Table.Cell>
							<Table.Cell class="table-cell">{item.email}</Table.Cell>
							<Table.Cell class="table-cell">{item.Address.line1}</Table.Cell>
							<Table.Cell class="table-cell">{item.Address.postCode}</Table.Cell>
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
											on:click={() => goto(`/leads/${item.id}`)}
											class="cursor-pointer">Edit</DropdownMenu.Item
										>

										<form method="POST" action="?/deleteLead">
											<input type="hidden" name="leadId" value={item.id} />
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
				Showing <strong>1-10</strong> of <strong>{data.leads.length}</strong> leads
			</div>
		</Card.Footer>
	</Card.Root>
</main>
