<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { PORTFOLIO_CONTENT } from '$lib/constants';

	let h1El = $state<HTMLElement | null>(null);
	let h2El = $state<HTMLElement | null>(null);
	let halloEl = $state<HTMLElement | null>(null);
	let measureSpan = $state<HTMLElement | null>(null);
	let demMeasureSpan = $state<HTMLElement | null>(null);
	let halloMeasureSpan = $state<HTMLElement | null>(null);
	let letterSpacing = $state('0.285em');
	let halloLetterSpacing = $state('0.4em');
	let halloTranslate = $state('0px');

	let resizeObserver: ResizeObserver | null = null;

	function syncWidth() {
		if (h1El && measureSpan) {
			const targetWidth = h1El.getBoundingClientRect().width;
			const baseWidth = measureSpan.getBoundingClientRect().width;

			if (targetWidth > 0 && baseWidth > 0) {
				const spacingPx = Math.max(0, (targetWidth - baseWidth) / 5);
				letterSpacing = `${spacingPx.toFixed(2)}px`;
				if (h2El) {
					h2El.style.letterSpacing = letterSpacing;
					h2El.style.marginRight = `-${letterSpacing}`;
				}
			}
		}

		if (demMeasureSpan && halloMeasureSpan && h1El) {
			const targetDemWidth = demMeasureSpan.getBoundingClientRect().width;
			const baseHalloWidth = halloMeasureSpan.getBoundingClientRect().width;
			const targetDemitriWidth = h1El.getBoundingClientRect().width;

			if (targetDemWidth > 0 && baseHalloWidth > 0 && targetDemitriWidth > 0) {
				const spacingPx = Math.max(0, (targetDemWidth - baseHalloWidth) / 12);
				halloLetterSpacing = `${spacingPx.toFixed(2)}px`;

				const shiftPx = -((targetDemitriWidth - targetDemWidth) / 2);
				halloTranslate = `${shiftPx.toFixed(2)}px`;

				if (halloEl) {
					halloEl.style.letterSpacing = halloLetterSpacing;
					halloEl.style.marginRight = `-${halloLetterSpacing}`;
					halloEl.style.transform = `translateX(${halloTranslate})`;
				}
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

	function scrollToSection(e: MouseEvent, id: string) {
		const target = document.querySelector(id);
		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			try {
				history.pushState(null, '', id);
			} catch {
				// Fallback for restricted frame contexts
			}
		}
	}
</script>

<section
	id="home"
	data-section="01"
	class="snap-section relative flex min-h-screen min-h-dvh w-full select-none flex-col items-center justify-between px-6 py-16 sm:px-10 lg:px-16 lg:py-24 z-10"
	aria-label="Hero Introduction"
>
	<!-- Invisible reference elements for width sync calculation -->
	<span
		bind:this={measureSpan}
		class="font-heading pointer-events-none -z-50 invisible absolute select-none opacity-0 whitespace-nowrap uppercase leading-none"
		style="font-size: clamp(2.25rem, 6.5vw, 5.5rem); letter-spacing: 0px;"
		aria-hidden="true"
	>
		{PORTFOLIO_CONTENT.hero.lastName}
	</span>

	<span
		bind:this={demMeasureSpan}
		class="font-heading pointer-events-none -z-50 invisible absolute select-none opacity-0 whitespace-nowrap uppercase leading-none"
		style="font-size: clamp(3.25rem, 8.5vw, 7.5rem); letter-spacing: -0.02em;"
		aria-hidden="true"
	>
		DEM
	</span>

	<span
		bind:this={halloMeasureSpan}
		class="font-serif pointer-events-none -z-50 invisible absolute select-none opacity-0 whitespace-nowrap font-normal italic leading-none"
		style="font-family: 'EB Garamond', 'Noto Serif JP', 'Times New Roman', Georgia, serif; font-size: clamp(0.75rem, 1.15vw, 0.95rem); letter-spacing: 0px;"
		aria-hidden="true"
	>
		Hallo ich bin
	</span>

	<!-- Top Section Marker -->
	<div class="w-full max-w-5xl flex items-center justify-between pt-2">
		<div class="flex items-center gap-2">
			<span class="w-1.5 h-1.5 bg-[#B76E79]"></span>
			<span class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#B76E79]">
				01 // HOME
			</span>
		</div>

		<div
			class="hidden sm:flex items-center gap-2 font-mono text-[0.65rem] tracking-wider uppercase text-[#999999]"
		>
			<span>FULL-STACK</span>
			<span class="text-[#E5E5E5]">•</span>
			<span>OPERATIONS</span>
			<span class="text-[#E5E5E5]">•</span>
			<span>AI SYSTEMS</span>
		</div>
	</div>

	<!-- ─── Center Hero Content (Modern, Open, Editorial Spacing) ─── -->
	<div
		class="my-auto flex w-full max-w-5xl flex-col items-center justify-center text-center py-8 sm:py-12"
	>
		<!-- "Hallo ich bin" Greeting -->
		<p
			bind:this={halloEl}
			class="font-serif will-change-transform mb-3 inline-block w-fit select-none font-normal italic leading-none text-[#555555] whitespace-nowrap sm:mb-3.5"
			style="font-family: 'EB Garamond', 'Noto Serif JP', 'Times New Roman', Georgia, serif; font-size: clamp(0.75rem, 1.15vw, 0.95rem); letter-spacing: {halloLetterSpacing}; margin-right: -{halloLetterSpacing}; transform: translateX({halloTranslate});"
		>
			Hallo ich bin
		</p>

		<!-- Primary Brand Wordmark: DEMITRI -->
		<h1
			bind:this={h1El}
			class="font-heading inline-block w-fit select-none uppercase leading-[0.92] tracking-[-0.025em] text-[#000000]"
			style="font-size: clamp(3.25rem, 8.5vw, 7.5rem);"
		>
			{PORTFOLIO_CONTENT.hero.name}
		</h1>

		<!-- Family Name: ECHOLS (Width-locked to DEMITRI) -->
		<h2
			bind:this={h2El}
			class="font-heading mt-2 sm:mt-3 inline-block w-fit select-none whitespace-nowrap uppercase leading-[0.92] text-[#000000]"
			style="font-size: clamp(2.25rem, 6.5vw, 5.5rem); letter-spacing: {letterSpacing}; margin-right: -{letterSpacing};"
		>
			{PORTFOLIO_CONTENT.hero.lastName}
		</h2>

		<!-- Divider line for architectural structure -->
		<div class="w-16 h-[1px] bg-[#E5E5E5] my-6 sm:my-8"></div>

		<!-- Professional Sub-Title & Value Tagline -->
		<div class="max-w-2xl space-y-3">
			<p
				class="font-body text-base sm:text-lg lg:text-xl font-medium tracking-[0.04em] text-[#222222]"
			>
				{PORTFOLIO_CONTENT.hero.title}
			</p>
			<p class="font-body text-sm sm:text-base text-[#666666] leading-relaxed max-w-xl mx-auto">
				{PORTFOLIO_CONTENT.hero.tagline}
			</p>
		</div>

		<!-- Action Triggers (Modern, clean, spaced) -->
		<div
			class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
		>
			<a
				href="#skills-projects"
				onclick={(e) => scrollToSection(e, '#skills-projects')}
				class="w-full sm:w-auto font-body font-semibold text-white bg-[#000000] hover:bg-[#4682B4] text-[0.75rem] tracking-[0.12em] uppercase px-8 py-3.5 cursor-pointer text-center inline-block transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#4682B4] focus-visible:outline-none"
			>
				{PORTFOLIO_CONTENT.hero.ctaWork}
			</a>

			<a
				href="#contact"
				onclick={(e) => scrollToSection(e, '#contact')}
				class="w-full sm:w-auto font-body font-semibold text-[#000000] hover:text-white bg-transparent hover:bg-[#000000] border border-[#000000] text-[0.75rem] tracking-[0.12em] uppercase px-8 py-[13px] cursor-pointer text-center inline-block transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#4682B4] focus-visible:outline-none"
			>
				{PORTFOLIO_CONTENT.hero.ctaContact}
			</a>
		</div>
	</div>

	<!-- Scroll Indicator at Bottom -->
	<div class="flex flex-col items-center gap-2 pointer-events-none pb-2" aria-hidden="true">
		<span class="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#888888]">
			{PORTFOLIO_CONTENT.hero.scrollHint}
		</span>
		<div class="w-[1px] h-7 bg-[#E5E5E5] relative overflow-hidden">
			<div class="w-full h-2.5 bg-[#B76E79] animate-bounce" style="animation-duration: 2s;"></div>
		</div>
	</div>
</section>
