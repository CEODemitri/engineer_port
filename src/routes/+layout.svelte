<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/assets/images/panda-astronaut.png" />
	<title>DEMITRI — Creative Developer</title>
	<meta
		name="description"
		content="Demitri — Creative developer marching towards the future. Full-stack software engineer building measurable results."
	/>
</svelte:head>

{@render children?.()}
