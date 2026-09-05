<script lang="ts">
	import { PORTFOLIO_CONTENT } from '$lib/constants';

	const navLinks = PORTFOLIO_CONTENT.navLinks;

	function handleScrollTo(e: MouseEvent, target: string) {
		if (typeof document !== 'undefined') {
			const el = document.querySelector(target);
			if (el) {
				e.preventDefault();
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				try {
					history.pushState(null, '', target);
				} catch {
					// Fallback for restricted frame contexts
				}
			}
		}
	}
</script>

<footer
	id="footer"
	class="snap-section relative min-h-screen w-full bg-[#000000] text-white py-20 px-6 lg:px-16 overflow-hidden select-none z-20 flex flex-col justify-center"
	aria-label="Portfolio Footer"
>
	<div class="max-w-6xl w-full mx-auto flex flex-col justify-between min-h-[500px]">
		<!-- Top Row: Logo & Brand (Open right space preserved) -->
		<div
			class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-[#222222]"
		>
			<!-- Left Column: Brand & Logo -->
			<div class="lg:col-span-7 flex flex-col sm:flex-row items-start gap-8">
				<!-- Large 80px Panda Astronaut Logo (Inverted / White Outline on Black) -->
				<div class="p-2 border border-[#333333] bg-[#0A0A0A] flex items-center justify-center">
					<img
						src="/assets/images/panda-astronaut.png"
						alt="Demitri logo — panda wearing astronaut helmet"
						width="80"
						height="80"
						class="w-20 h-20 object-contain invert hue-rotate-180 brightness-150"
					/>
				</div>

				<div class="flex flex-col">
					<h2
						class="font-heading text-[#FFFFFF] text-3xl sm:text-4xl uppercase tracking-tight leading-none"
					>
						DEMITRI
					</h2>
					<p class="font-body text-sm text-[#FFFFFF]/70 mt-3 max-w-sm leading-relaxed">
						{PORTFOLIO_CONTENT.tagline}
					</p>
					<p class="font-mono text-xs text-[#B76E79] mt-2 uppercase tracking-widest">
						SOLVING BUSINESS PROBLEMS WITH CODE
					</p>
				</div>
			</div>

			<!-- Right Column: Big open space preserved as requested -->
			<div class="hidden lg:block lg:col-span-5"></div>
		</div>

		<!-- Middle Navigation Links -->
		<div class="py-12 border-b border-[#222222] flex flex-wrap gap-8 sm:gap-12 items-center">
			{#each navLinks as item}
				<a
					href={item.target}
					onclick={(e) => handleScrollTo(e, item.target)}
					class="font-body font-medium text-xs uppercase tracking-[0.1em] text-white hover:text-[#4682B4] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4682B4]"
				>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- Bottom Row: Copyright and System Footnote -->
		<div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="font-body text-xs text-[#FFFFFF]/50">&copy; 2024 Demitri. All rights reserved.</p>
			<p class="font-mono text-xs text-[#FFFFFF]/40 tracking-wider uppercase">
				ENGINEERED WITH SVELTEKIT &amp; GSAP
			</p>
		</div>
	</div>
</footer>
