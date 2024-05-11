<script lang="ts">
	import type { PageData } from '../$types';
	export let data: PageData;
	const { lead } = data;
	console.log(lead);

	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import Copy from 'lucide-svelte/icons/copy';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import Truck from 'lucide-svelte/icons/truck';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { goto } from '$app/navigation';
	function handleNavigation() {
		goto(`/leads/${lead.id + 1}`);
	}

	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import { Badge } from '$lib/components/ui/badge/index.js';

	import * as Table from '$lib/components/ui/table/index.js';

	import * as Tabs from '$lib/components/ui/tabs/index.js';
</script>

<Card.Root class="mx-4 mt-4 overflow-hidden">
	<Card.Header class="flex flex-row items-start bg-muted/50">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-lg">
				{lead.firstname}
				{lead.lastname}
				<Button
					size="icon"
					variant="outline"
					class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<Copy class="h-3 w-3" />
					<span class="sr-only">Copy Lead ID</span>
				</Button>
			</Card.Title>
			<Card.Description>ID: {lead.id}</Card.Description>
		</div>
		<div class="ml-auto flex items-center gap-1">
			<Button size="sm" variant="outline" class="h-8 gap-1">
				<Truck class="h-3.5 w-3.5" />
				<span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap"> Track Order </span>
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} size="icon" variant="outline" class="h-8 w-8">
						<EllipsisVertical class="h-3.5 w-3.5" />
						<span class="sr-only">More</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Edit</DropdownMenu.Item>
					<DropdownMenu.Item>Export</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Trash</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Header>
</Card.Root>

<div class="m-4 flex gap-4">
	<Card.Root class=" overflow-hidden">
		<Card.Footer class="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
			<div class="text-xs text-muted-foreground">
				Updated <time>{lead.updated.toDateString()}</time>
			</div>
			<Pagination.Root count={10} class="ml-auto mr-0 w-auto">
				<Pagination.Content>
					<Pagination.Item>
						<Button size="icon" variant="outline" class="h-6 w-6">
							<ChevronLeft class="h-3.5 w-3.5" />
							<span class="sr-only">Previous Lead</span>
						</Button>
					</Pagination.Item>
					<Pagination.Item>
						<Button size="icon" variant="outline" class="h-6 w-6" on:click={handleNavigation}>
							<ChevronRight class="h-3.5 w-3.5" />
							<span class="sr-only">Next Lead</span>
						</Button>
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root>
		</Card.Footer>
		<Card.Content class="p-6 text-sm">
			<div class="grid gap-3">
				<div class="font-semibold">Customer Information</div>
				<dl class="grid gap-3">
					<div class="flex items-center justify-between">
						<dt class="text-muted-foreground">Customer</dt>
						<dd>{lead.firstname} {lead.lastname}</dd>
					</div>
					<div class="flex items-center justify-between">
						<dt class="text-muted-foreground">Email</dt>
						<dd>
							<a href="mailto:">{lead.email}</a>
						</dd>
					</div>
					<div class="flex items-center justify-between">
						<dt class="text-muted-foreground">Phone</dt>
						<dd>
							<a href="tel:">{lead.contact_no}</a>
						</dd>
					</div>
				</dl>
			</div>
			<Separator class="my-4" />
			<div class="grid grid-cols-2 gap-4">
				<div class="grid gap-3">
					<div class="font-semibold">Address Information</div>
					<address class="grid gap-0.5 not-italic text-muted-foreground">
						<span>{lead.Address?.line1 || ''}</span>
						<span>{lead.Address?.line2 || ''}</span>
						<span>{lead.Address?.line3 || ''}</span>
						<span>{lead.Address?.line4 || ''}</span>
						<span>{lead.Address?.line5 || ''}</span>
						<span>{lead.Address?.line6 || ''}</span>
						<span>{lead.Address?.postCode || ''}</span>
					</address>
				</div>
			</div>
			<Separator class="my-4" />
			<div class="grid grid-cols-2 gap-4">
				<div class="grid gap-3">
					<div class="font-semibold">Marketing Preferences</div>
					<div>
						{#if lead.dns}
							<span class="not-italic text-muted-foreground">Ok to send marketing</span>
						{:else}
							<span class="not-italic text-muted-foreground">Do not send marketing</span>
						{/if}
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
	<Tabs.Root value="all" class="basis-1/3">
		<div class="flex items-center">
			<Tabs.List>
				<Tabs.Trigger value="all">All</Tabs.Trigger>
				<Tabs.Trigger value="active">Activities</Tabs.Trigger>
				<Tabs.Trigger value="emails">Emails</Tabs.Trigger>
				<Tabs.Trigger value="documents">Documents</Tabs.Trigger>
				<Tabs.Trigger value="notes">Notes</Tabs.Trigger>
			</Tabs.List>
		</div>
		<Tabs.Content value="all">
			<Card.Root>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head class="hidden w-[300px] sm:table-cell">Name</Table.Head>
								<Table.Head>Status</Table.Head>
								<Table.Head class="hidden md:table-cell">Price</Table.Head>
								<Table.Head class="hidden md:table-cell">Total Sales</Table.Head>
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
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Products</Card.Title>
			<Card.Description>Manage your products and view their sales performance.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="hidden w-[100px] sm:table-cell">
							<span class="sr-only">Image</span>
						</Table.Head>
						<Table.Head>Name</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head class="hidden md:table-cell">Price</Table.Head>
						<Table.Head class="hidden md:table-cell">Total Sales</Table.Head>
						<Table.Head class="hidden md:table-cell">Created at</Table.Head>
						<Table.Head>
							<span class="sr-only">Actions</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="hidden sm:table-cell">
							<img
								alt="Product example"
								class="aspect-square rounded-md object-cover"
								height="64"
								src="/images/placeholder.svg"
								width="64"
							/>
						</Table.Cell>
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
						<Table.Cell class="hidden sm:table-cell">
							<img
								alt="Product"
								class="aspect-square rounded-md object-cover"
								height="64"
								src="/images/placeholder.svg"
								width="64"
							/>
						</Table.Cell>
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
						<Table.Cell class="hidden sm:table-cell">
							<img
								alt="Product"
								class="aspect-square rounded-md object-cover"
								height="64"
								src="/images/placeholder.svg"
								width="64"
							/>
						</Table.Cell>
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
						<Table.Cell class="hidden sm:table-cell">
							<img
								alt="Product"
								class="aspect-square rounded-md object-cover"
								height="64"
								src="/images/placeholder.svg"
								width="64"
							/>
						</Table.Cell>
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
						<Table.Cell class="hidden sm:table-cell">
							<img
								alt="Product"
								class="aspect-square rounded-md object-cover"
								height="64"
								src="/images/placeholder.svg"
								width="64"
							/>
						</Table.Cell>
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
						<Table.Cell class="hidden sm:table-cell">
							<img
								alt="Product"
								class="aspect-square rounded-md object-cover"
								height="64"
								src="/images/placeholder.svg"
								width="64"
							/>
						</Table.Cell>
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
		</Card.Footer>
	</Card.Root>
</div>
