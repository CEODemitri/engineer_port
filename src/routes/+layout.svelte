<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/Navbar.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '@fontsource/space-grotesk';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/600.css';
	import '@fontsource/space-grotesk/700.css';
	import '@fontsource/inter';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/fira-code';
	import '@fontsource/fira-code/500.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Demitri Echols — AI-Driven Software Engineer</title>
	<meta
		name="description"
		content="AI-Driven Software Engineer & Technical Strategist. Building intelligent digital systems that help businesses scale smarter in an AI-first world."
	/>
</svelte:head>

<Navbar />
{@render children?.()}
