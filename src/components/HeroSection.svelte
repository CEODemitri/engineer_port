<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { PORTFOLIO_CONTENT } from '$lib/constants';

	let h1El = $state<HTMLElement | null>(null);
	let h2El = $state<HTMLElement | null>(null);
	let measureSpan = $state<HTMLElement | null>(null);
	let letterSpacing = $state('0.285em');

	let resizeObserver: ResizeObserver | null = null;

	function syncWidth() {
		if (!h1El || !measureSpan) return;
		const targetWidth = h1El.getBoundingClientRect().width;
		const baseWidth = measureSpan.getBoundingClientRect().width;

		if (targetWidth > 0 && baseWidth > 0) {
			// "ECHOLS" has 6 letters and 5 inter-letter gaps.
			// The visual width of "ECHOLS" is: baseWidth + 5 * spacing.
			// Target width is the rendered width of "DEMITRI".
			// Therefore, required spacing = (targetWidth - baseWidth) / 5.
			// Setting `margin-right: -{letterSpacing}` subtracts the trailing space
			// after the final "S" added by CSS letter-spacing, ensuring exact alignment.
			const spacingPx = Math.max(0, (targetWidth - baseWidth) / 5);
			letterSpacing = `${spacingPx.toFixed(2)}px`;
			if (h2El) {
				h2El.style.letterSpacing = letterSpacing;
				h2El.style.marginRight = `-${letterSpacing}`;
			}
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			syncWidth();

			if (document.fonts) {
				document.fonts.ready.then(() => {
					syncWidth();
				});
			}

			if (typeof ResizeObserver !== 'undefined' && h1El) {
				resizeObserver = new ResizeObserver(() => {
					syncWidth();
				});
				resizeObserver.observe(h1El);
			}

			window.addEventListener('resize', syncWidth);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', syncWidth);
		}
		if (resizeObserver) {
			resizeObserver.disconnect();
		}
	});

	function scrollToSection(id: string) {
		const target = document.querySelector(id);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<section
	id="home"
	data-section="01"
	class="snap-section relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 lg:py-28 z-10 select-none"
	aria-label="Hero Introduction"
>
	<div class="max-w-4xl w-full text-center flex flex-col items-center justify-center mx-auto">
		<!-- Section Number subtle badge -->
		<div class="mb-4">
			<span class="font-mono text-[0.75rem] text-[#B76E79] tracking-[0.2em] uppercase">
				01 // HOME
			</span>
		</div>

		<!-- Big Bold Brand Name -->
		<h1
			bind:this={h1El}
			class="font-heading text-[#000000] tracking-[-0.02em] leading-none uppercase select-none inline-block w-fit"
			style="font-size: clamp(3rem, 8vw, 7rem);"
		>
			{PORTFOLIO_CONTENT.hero.name}
		</h1>

		<!-- Last Name (Matched to equal width of DEMITRI with increased letter-spacing, minus trailing space after 'S') -->
		<h2
			bind:this={h2El}
			class="font-heading text-[#000000] leading-none uppercase select-none mt-2 sm:mt-3 inline-block w-fit whitespace-nowrap"
			style="font-size: clamp(2rem, 6vw, 5rem); letter-spacing: {letterSpacing}; margin-right: -{letterSpacing};"
		>
			{PORTFOLIO_CONTENT.hero.lastName}
		</h2>

		<!-- Invisible reference element for unspaced base width of ECHOLS -->
		<span
			bind:this={measureSpan}
			class="font-heading uppercase leading-none invisible absolute pointer-events-none -z-50 select-none opacity-0 whitespace-nowrap"
			style="font-size: clamp(2rem, 6vw, 5rem); letter-spacing: 0px;"
			aria-hidden="true"
		>
			{PORTFOLIO_CONTENT.hero.lastName}
		</span>

		<!-- Title -->
		<p
			class="font-body font-medium text-[#333333] tracking-[0.05em] mt-5 mb-2"
			style="font-size: clamp(1rem, 2vw, 1.25rem);"
		>
			{PORTFOLIO_CONTENT.hero.title}
		</p>

		<!-- Tagline -->
		<p
			class="font-mono text-[#666666] tracking-[0.08em] mb-12"
			style="font-size: clamp(0.875rem, 1.5vw, 1rem);"
		>
			{PORTFOLIO_CONTENT.hero.tagline}
		</p>

		<!-- CTAs (0 border-radius, flat colors per spec) -->
		<div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
			<!-- View My Work -->
			<button
				type="button"
				onclick={() => scrollToSection('#skills-projects')}
				class="w-full sm:w-auto font-body font-semibold text-white bg-[#000000] hover:bg-[#4682B4] text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#4682B4] focus-visible:outline-none"
				style="border-radius: 0;"
			>
				{PORTFOLIO_CONTENT.hero.ctaWork}
			</button>

			<!-- Get In Touch -->
			<button
				type="button"
				onclick={() => scrollToSection('#contact')}
				class="w-full sm:w-auto font-body font-semibold text-[#000000] hover:text-white bg-transparent hover:bg-[#000000] border border-[#000000] text-[0.75rem] tracking-[0.1em] uppercase px-8 py-[15px] cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#4682B4] focus-visible:outline-none"
				style="border-radius: 0;"
			>
				{PORTFOLIO_CONTENT.hero.ctaContact}
			</button>
		</div>
	</div>

	<!-- Scroll Hint at Bottom Center -->
	<div
		class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
		aria-hidden="true"
	>
		<span class="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#666666]">
			{PORTFOLIO_CONTENT.hero.scrollHint}
		</span>
		<!-- Animated Rose Gold Line -->
		<div class="w-[1px] h-8 bg-[#E5E5E5] relative overflow-hidden">
			<div class="w-full h-3 bg-[#B76E79] animate-bounce" style="animation-duration: 2s;"></div>
		</div>
	</div>
</section>
