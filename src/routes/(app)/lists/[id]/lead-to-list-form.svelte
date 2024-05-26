<script lang="ts">
	const fetchLeads = async () => {
		const res = await fetch(`/api/leads`);
		console.log(res);
		return await res.json();
	};

	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	let selectedItems: number[] = [];

	function toggleAll(e) {
		selectedItems = e.target.checked ? data.leads.map((item) => item.id) : [];
	}
</script>

{#await fetchLeads()}
	fetchLeads is pending
{:then data}
	<Card.Root>
		<Card.Content>
			{#each data as item}
				<Card.Root>
					<Card.Content class="flex items-start gap-4 p-2">
						<input type="checkbox" />
						<div>
							<p>{item.firstname}</p>
							<p>{item.lastname}</p>
							<p>{item.email}</p>
							<p>{item.contact_no}</p>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</Card.Content>
	</Card.Root>
{:catch error}
	fetchLeads was rejected
{/await}
