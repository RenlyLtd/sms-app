<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';

	import Topbar from '$lib/Topbar.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<Sidebar {page} />
	<div class="flex flex-col">
		<Topbar {page} />
		<slot></slot>
	</div>
</div>
