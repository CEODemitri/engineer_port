<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<div class="p-8">
	{@render children?.()}
</div>
