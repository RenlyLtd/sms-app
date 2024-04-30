<script lang="ts">
	import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import Home from 'lucide-svelte/icons/home';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Bell from 'lucide-svelte/icons/bell';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Users from 'lucide-svelte/icons/users';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<div class="hidden border-r bg-muted/40 md:block">
	<div class="flex h-full max-h-screen flex-col gap-2">
		<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
			<a href="/" class="flex items-center gap-2 font-semibold">
				<Package2 class="h-6 w-6" />
				<span class="">Acme Inc</span>
			</a>
			<Button variant="outline" size="icon" class="ml-auto h-8 w-8">
				<Bell class="h-4 w-4" />
				<span class="sr-only">Toggle notifications</span>
			</Button>
		</div>
		<div class="flex-1">
			<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
				<a
					href="/dashboard"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
				>
					<Home class="h-4 w-4" />
					Dashboard
				</a>
				<a
					href="/campaigns"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
				>
					<ShoppingCart class="h-4 w-4" />
					Campaigns
				</a>
				<a
					href="/contacts"
					class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
				>
					<Package class="h-4 w-4" />
					Contacts
				</a>
				<a
					href="/lists"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
				>
					<Users class="h-4 w-4" />
					Lists
				</a>
				<a
					href="/settings"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
				>
					<LineChart class="h-4 w-4" />
					Settings
				</a>
			</nav>
		</div>
		<div class="mt-auto p-4">
			<Card.Root>
				<Card.Header class="p-2 pt-0 md:p-4">
					<Card.Title>Upgrade to Pro</Card.Title>
					<Card.Description>
						Unlock all features and get unlimited access to our support team.
					</Card.Description>
				</Card.Header>
				<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
					<Button size="sm" class="w-full">Upgrade</Button>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
