<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { customers } from '$lib/data/customers';
</script>

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-6 md:gap-8">
	<div class="mx-2 grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Customers</h1>
		<p class="text-muted-foreground">Manage your customers</p>
	</div>
	<Tabs.Root value="order">
		<div class="flex items-center">
			<Tabs.List>
				<Tabs.Trigger value="active">Active</Tabs.Trigger>
				<Tabs.Trigger value="order">New Orders</Tabs.Trigger>
				<Tabs.Trigger value="terminated" class="hidden sm:flex">Terminated</Tabs.Trigger>
				<Tabs.Trigger value="cancelled" class="hidden sm:flex">Cancelled</Tabs.Trigger>
				<Tabs.Trigger value="all">All</Tabs.Trigger>
			</Tabs.List>
			<div class="ml-auto flex items-center gap-2">
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
				<Button size="sm" variant="outline" class="h-8 gap-1">
					<File class="h-3.5 w-3.5" />
					<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Export </span>
				</Button>
			</div>
		</div>
		<Tabs.Content value="order">
			<Card.Root>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head><Checkbox /></Table.Head>
								<Table.Head>Name</Table.Head>
								<Table.Head class="hidden sm:table-cell">Status</Table.Head>
								<Table.Head class="hidden md:table-cell">Address</Table.Head>
								<Table.Head class="hidden md:table-cell">Postcode</Table.Head>
								<Table.Head class="hidden md:table-cell">Phone</Table.Head>
								<Table.Head class="hidden md:table-cell">Email</Table.Head>
								<Table.Head>
									<span class="sr-only">Actions</span>
								</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each customers as customer}
								<!-- content here -->
								<Table.Row>
									<Table.Cell><Checkbox /></Table.Cell>
									<Table.Cell class="font-medium">{customer.name}</Table.Cell>
									<Table.Cell>
										<Badge variant="outline">Draft</Badge>
									</Table.Cell>
									<Table.Cell class="hidden md:table-cell">{customer.address}</Table.Cell>
									<Table.Cell class="hidden md:table-cell">{customer.postalZip}</Table.Cell>
									<Table.Cell class="hidden md:table-cell">{customer.phone}</Table.Cell>
									<Table.Cell class="hidden md:table-cell">{customer.email}</Table.Cell>
									<Table.Cell>
										<DropdownMenu.Root>
											<DropdownMenu.Trigger asChild let:builder>
												<Button
													aria-haspopup="true"
													size="icon"
													variant="ghost"
													builders={[builder]}
												>
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
							{/each}
						</Table.Body>
					</Table.Root>
				</Card.Content>
				<Card.Footer>
					<div class="text-xs text-muted-foreground">
						Showing <strong>1-10</strong> of <strong>32</strong> products
					</div>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</main>
