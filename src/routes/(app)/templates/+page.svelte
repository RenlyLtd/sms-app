<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { templates } = data;
	console.log(data);
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
	import * as Dialog from '$lib/components/ui/dialog';
	import CreateTemplateForm from './CreateTemplateForm.svelte';
	import { goto } from '$app/navigation';
</script>

<main class="grid items-start gap-4 p-4">
	<div class="mx-2 grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Templates</h1>
		<p class="text-muted-foreground">Manage your SMS templates</p>
	</div>

	<div class="flex items-center">
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
			<Dialog.Root>
				<Dialog.Trigger>
					<Button size="sm" class="h-8 gap-1">
						<CirclePlus class="h-3.5 w-3.5" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> New Template </span>
					</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<CreateTemplateForm />
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>

	<Card.Root>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head><Checkbox /></Table.Head>
						<Table.Head>Name</Table.Head>
						<Table.Head class="hidden sm:table-cell">Content</Table.Head>
						<Table.Head class="hidden md:table-cell">Created</Table.Head>
						<Table.Head class="hidden md:table-cell">Updated</Table.Head>

						<Table.Head>
							<span class="sr-only">Actions</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each templates as template}
						<!-- content here -->
						<Table.Row>
							<Table.Cell><Checkbox /></Table.Cell>
							<Table.Cell class="font-medium">{template.name}</Table.Cell>

							<Table.Cell class="hidden md:table-cell">{template.content}</Table.Cell>
							<Table.Cell class="hidden md:table-cell"
								>{template.created.toLocaleString()}</Table.Cell
							>
							<Table.Cell class="hidden md:table-cell"
								>{template.updated.toLocaleString()}</Table.Cell
							>
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
										<DropdownMenu.Item>
											<a href={`/templates/${template.id}`}> Edit </a>
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<form method="POST" action="?/deleteTemplate&id={template.id}">
												<Button variant="ghost" class=" h-fit p-0" type="submit">Delete</Button>
											</form>
										</DropdownMenu.Item>
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
</main>
