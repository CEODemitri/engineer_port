<script>
	export let src;
	export let alt;
	export let projectTitle;
	export let techStack;
	export let description;
</script>

<div
	class="relative m-auto h-[475px] w-[350px] rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:shadow-lg"
>
	<!-- Top Actions -->
	<div class="absolute top-4 right-4 left-4 z-10 flex justify-between">
		<a
			href="#"
			class="rounded-full border border-black/20 bg-white/80 px-4 py-1 text-xs font-medium backdrop-blur transition hover:border-black hover:bg-black hover:text-white"
		>
			Live
		</a>
		<a
			href="#"
			class="rounded-full border border-black/20 bg-white/80 px-4 py-1 text-xs font-medium backdrop-blur transition hover:border-black hover:bg-black hover:text-white"
		>
			Repo
		</a>
	</div>

	<!-- Image / Hero -->
	<div class="h-[200px] w-full overflow-hidden rounded-xl border border-black/10">
		<img {src} {alt} class="h-full w-full object-cover transition duration-500 hover:scale-105" />
	</div>

	<!-- Content -->
	<div class="mt-5 space-y-4">
		<!-- Title -->
		<h3 class="text-xl leading-tight font-semibold tracking-tight">
			{projectTitle}
		</h3>

		<!-- Stack Pills -->
		<div class="flex flex-wrap gap-2">
			{#each techStack.split(',') as tech}
				<span
					class="rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/80"
				>
					{tech.trim()}
				</span>
			{/each}
		</div>

		<!-- Description -->
		<p class="text-sm leading-relaxed text-black/70">
			{description}
		</p>
	</div>
</div>
