<script>
	export let sectionTitle;
	export let subtitle;
	export let description;
	export let keywords;
</script>

<div class="my-4">
	<h2 class="text-3xl">{sectionTitle}</h2>
	<p class="text-sm bg-black text-white inline-block px-2 py-1 rounded-sm">{subtitle}</p>
	<p>{description}</p>
	<article>{keywords}</article>
</div>

<!-- properly format and add styles -->
