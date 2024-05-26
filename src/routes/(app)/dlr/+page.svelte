<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { dlr } = data;

	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	const deliveredDlr = dlr.filter((report) => report.code === 1);
	const rejectedDlr = dlr.filter((report) => report.code === 2);
	const bufferingDlr = dlr.filter((report) => report.code === 4);
	const acceptedDlr = dlr.filter((report) => report.code === 8);
	const errorDlr = dlr.filter((report) => report.code === 16);
</script>

<main class="grid items-start gap-4 p-4 sm:px-6 sm:py-6 md:gap-8">
	<div class="mx-2 grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Customers</h1>
		<p class="text-muted-foreground">Manage your customers</p>
	</div>
	<Tabs.Root value="delivered">
		<div class="flex items-center">
			<Tabs.List>
				<Tabs.Trigger value="delivered">Delivered - Handset</Tabs.Trigger>
				<Tabs.Trigger value="rejected">Rejected - Handset</Tabs.Trigger>
				<Tabs.Trigger value="buffering" class="hidden sm:flex">Buffering</Tabs.Trigger>
				<Tabs.Trigger value="accepted" class="hidden sm:flex">Accepted - SMSC</Tabs.Trigger>
				<Tabs.Trigger value="error">Rejected - SMSC</Tabs.Trigger>
			</Tabs.List>
		</div>
		<Tabs.Content value="delivered">
			<Card.Root>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>ID</Table.Head>
								<Table.Head class="hidden sm:table-cell">Destination</Table.Head>
								<Table.Head class="hidden md:table-cell">Code</Table.Head>

								<Table.Head class="hidden md:table-cell">Body</Table.Head>
								<Table.Head class="hidden md:table-cell">Timestamp</Table.Head>
								<Table.Head class="hidden md:table-cell">Message ID</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each deliveredDlr as report}
								<Table.Row>
									<Table.Cell>{report.id}</Table.Cell>
									<Table.Cell>{report.destination_number}</Table.Cell>
									<Table.Cell>{report.code}</Table.Cell>
									<Table.Cell>{report.dlr_body}</Table.Cell>
									<Table.Cell>{new Date(report.timestamp).toLocaleString()}</Table.Cell>
									<Table.Cell>{report.msg_id}</Table.Cell>
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
		<Tabs.Content value="rejected">
			<Card.Root>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>ID</Table.Head>
								<Table.Head class="hidden sm:table-cell">Destination</Table.Head>
								<Table.Head class="hidden md:table-cell">Code</Table.Head>

								<Table.Head class="hidden md:table-cell">Body</Table.Head>
								<Table.Head class="hidden md:table-cell">Timestamp</Table.Head>
								<Table.Head class="hidden md:table-cell">Message ID</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each rejectedDlr as report}
								<Table.Row>
									<Table.Cell>{report.id}</Table.Cell>
									<Table.Cell>{report.destination_number}</Table.Cell>
									<Table.Cell>{report.code}</Table.Cell>
									<Table.Cell>{report.dlr_body}</Table.Cell>
									<Table.Cell>{new Date(report.timestamp).toLocaleString()}</Table.Cell>
									<Table.Cell>{report.msg_id}</Table.Cell>
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
		<Tabs.Content value="buffering">
			<Card.Root>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>ID</Table.Head>
								<Table.Head class="hidden sm:table-cell">Destination</Table.Head>
								<Table.Head class="hidden md:table-cell">Code</Table.Head>

								<Table.Head class="hidden md:table-cell">Body</Table.Head>
								<Table.Head class="hidden md:table-cell">Timestamp</Table.Head>
								<Table.Head class="hidden md:table-cell">Message ID</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each bufferingDlr as report}
								<Table.Row>
									<Table.Cell>{report.id}</Table.Cell>
									<Table.Cell>{report.destination_number}</Table.Cell>
									<Table.Cell>{report.code}</Table.Cell>
									<Table.Cell>{report.dlr_body}</Table.Cell>
									<Table.Cell>{new Date(report.timestamp).toLocaleString()}</Table.Cell>
									<Table.Cell>{report.msg_id}</Table.Cell>
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
		<Tabs.Content value="accepted">
			<Card.Root>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>ID</Table.Head>
								<Table.Head class="hidden sm:table-cell">Destination</Table.Head>
								<Table.Head class="hidden md:table-cell">Code</Table.Head>

								<Table.Head class="hidden md:table-cell">Body</Table.Head>
								<Table.Head class="hidden md:table-cell">Timestamp</Table.Head>
								<Table.Head class="hidden md:table-cell">Message ID</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each acceptedDlr as report}
								<Table.Row>
									<Table.Cell>{report.id}</Table.Cell>
									<Table.Cell>{report.destination_number}</Table.Cell>
									<Table.Cell>{report.code}</Table.Cell>
									<Table.Cell>{report.dlr_body}</Table.Cell>
									<Table.Cell>{new Date(report.timestamp).toLocaleString()}</Table.Cell>
									<Table.Cell>{report.msg_id}</Table.Cell>
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
		<Tabs.Content value="error">
			<Card.Root>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>ID</Table.Head>
								<Table.Head class="hidden sm:table-cell">Destination</Table.Head>
								<Table.Head class="hidden md:table-cell">Code</Table.Head>

								<Table.Head class="hidden md:table-cell">Body</Table.Head>
								<Table.Head class="hidden md:table-cell">Timestamp</Table.Head>
								<Table.Head class="hidden md:table-cell">Message ID</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each errorDlr as report}
								<Table.Row>
									<Table.Cell>{report.id}</Table.Cell>
									<Table.Cell>{report.destination_number}</Table.Cell>
									<Table.Cell>{report.code}</Table.Cell>
									<Table.Cell>{report.dlr_body}</Table.Cell>
									<Table.Cell>{new Date(report.timestamp).toLocaleString()}</Table.Cell>
									<Table.Cell>{report.msg_id}</Table.Cell>
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
