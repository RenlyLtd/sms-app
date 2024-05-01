<script lang="ts">
	import { navItems } from './data/navItems';
	import MessagesSquare from 'lucide-svelte/icons/messages-square';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	export let page;
	$: isActive = (href: string) => $page.url.pathname === href;
</script>

<div class="hidden border-r bg-muted/40 md:block">
	<div class="flex h-full max-h-screen flex-col gap-2">
		<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
			<a href="/" class="flex items-center gap-2 font-semibold">
				<MessagesSquare class="h-8 w-8" />
				<span class="">SMS App</span>
			</a>
		</div>
		<div class="flex-1">
			<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
				{#each navItems as item}
					<!-- content here -->
					<a
						data-active={isActive(item.url)}
						href={item.url}
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
					>
						<svelte:component this={item.icon} class="h-5 w-5" />

						{item.link}
					</a>
				{/each}
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
