<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/Navbar.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '@fontsource/dm-sans';
	import '@fontsource/dm-sans/500.css';
	import '@fontsource/dm-sans/700.css';
	import '@fontsource/fira-code';
	import '@fontsource/fira-code/500.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<div class="p-8">
	{@render children?.()}
</div>
