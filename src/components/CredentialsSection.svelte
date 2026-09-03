<script lang="ts">
	import { PORTFOLIO_CONTENT } from '$lib/constants';

	const credentials = PORTFOLIO_CONTENT.credentials;
</script>

<section
	id="credentials"
	data-section="04"
	class="snap-section relative min-h-screen w-full flex items-center justify-center px-6 lg:px-16 py-24 lg:py-32 z-10 bg-transparent border-t border-[#E5E5E5]/60"
	aria-label="Credentials and Trajectory"
>
	<div class="max-w-4xl w-full mx-auto">
		<!-- Section Header -->
		<div class="mb-14 lg:mb-18">
			<div class="flex items-center gap-2 mb-3">
				<span class="w-1.5 h-1.5 bg-[#B76E79]" aria-hidden="true"></span>
				<span class="font-mono text-xs text-[#B76E79] uppercase tracking-[0.15em]">
					04 // CREDENTIALS
				</span>
			</div>
			<h2
				class="font-heading text-[#000000] tracking-[-0.01em] uppercase leading-tight"
				style="font-size: clamp(1.75rem, 4vw, 2.5rem);"
			>
				ENGINEERING TRAJECTORY
			</h2>
			<p class="font-mono text-xs text-[#666666] tracking-wider uppercase mt-2">
				VERIFIED BACKGROUND IN TECHNICAL RIGOR, MEASURABLE RESULTS & DEPLOYED CODE
			</p>
		</div>

		<!-- Vertical Timeline on Left Side Spanning Full Container Height -->
		<div class="relative pl-8 sm:pl-12 border-l border-[#E5E5E5] space-y-10 sm:space-y-12">
			{#each credentials as item}
				<div class="relative group">
					<!-- Timeline Rose Gold Node Point (Square per 0 border-radius) -->
					<div
						class="absolute -left-[37px] sm:-left-[53px] top-1.5 w-2.5 h-2.5 bg-white border border-[#B76E79] group-hover:bg-[#B76E79] transition-colors"
						aria-hidden="true"
					></div>

					<!-- Year in Rose Gold -->
					<div class="font-mono text-[0.75rem] text-[#B76E79] tracking-[0.12em] uppercase mb-1">
						{item.year} // {item.institution}
					</div>

					<!-- Title in Archivo Black -->
					<h3 class="font-heading text-lg sm:text-xl text-[#000000] uppercase tracking-normal">
						{item.title}
					</h3>

					<!-- Description in Inter Medium Grey -->
					<p class="font-body text-sm sm:text-base text-[#666666] leading-relaxed max-w-2xl mt-1.5">
						{item.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
