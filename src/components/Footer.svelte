<script lang="ts">
	import { PORTFOLIO_CONTENT } from '$lib/constants';

	let needleAngle = $state(0);
	const navLinks = PORTFOLIO_CONTENT.navLinks;

	function handleScrollTo(target: string) {
		if (typeof document !== 'undefined') {
			const el = document.querySelector(target);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}

	function handleMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement | null;
		if (!target) return;
		const rect = target.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
		needleAngle = (rad * 180) / Math.PI;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<footer
	onmousemove={handleMouseMove}
	class="relative w-full bg-[#000000] text-white pt-24 pb-16 px-6 lg:px-16 overflow-hidden select-none z-20"
	aria-label="Portfolio Footer"
>
	<div class="max-w-6xl w-full mx-auto flex flex-col justify-between min-h-[500px]">
		<!-- Top Row: Logo, Brand & Unexpected Kinetic Telemetry Radar -->
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

			<!-- Right Column: Surprise Decorative Element (Kinetic Orbital Telemetry Instrument) -->
			<div class="lg:col-span-5 flex flex-col items-start lg:items-end">
				<div class="p-4 border border-[#222222] bg-[#0A0A0A] flex flex-col items-center">
					<div
						class="flex items-center justify-between w-full mb-3 text-[0.6rem] font-mono text-[#666666] tracking-widest"
					>
						<span>SYS.RADAR // COORD</span>
						<span class="text-[#39FF14]">37.7749° N</span>
					</div>

					<svg viewBox="0 0 160 160" width="140" height="140" class="overflow-visible">
						<!-- Concentric radar circles (flat lines, no gradients) -->
						<circle cx="80" cy="80" r="70" stroke="#222222" stroke-width="1" fill="none" />
						<circle cx="80" cy="80" r="50" stroke="#222222" stroke-width="1" fill="none" />
						<circle cx="80" cy="80" r="30" stroke="#222222" stroke-width="1" fill="none" />
						<circle cx="80" cy="80" r="10" stroke="#333333" stroke-width="1" fill="none" />

						<!-- Axis grid lines -->
						<line
							x1="80"
							y1="10"
							x2="80"
							y2="150"
							stroke="#222222"
							stroke-width="1"
							stroke-dasharray="2 2"
						/>
						<line
							x1="10"
							y1="80"
							x2="150"
							y2="80"
							stroke="#222222"
							stroke-width="1"
							stroke-dasharray="2 2"
						/>

						<!-- Animated pulse wave -->
						<circle
							cx="80"
							cy="80"
							r="10"
							stroke="#4682B4"
							stroke-width="1.5"
							fill="none"
							class="animate-ping"
							style="transform-origin: 80px 80px; animation-duration: 2.2s;"
						/>

						<!-- Needle pointing towards cursor -->
						<g
							style="transform: rotate({needleAngle}deg); transform-origin: 80px 80px; transition: transform 0.2s cubic-bezier(0, 0, 0.2, 1);"
						>
							<line x1="80" y1="80" x2="80" y2="20" stroke="#B76E79" stroke-width="2" />
						</g>

						<!-- Center pivot point -->
						<circle cx="80" cy="80" r="3" fill="#FFFFFF" />
					</svg>

					<p
						class="font-mono text-[0.6rem] text-[#666666] tracking-widest uppercase mt-3 text-center"
					>
						CONTINUOUS MONITORING & STABILITY
					</p>
				</div>
			</div>
		</div>

		<!-- Middle Navigation Links -->
		<div class="py-12 border-b border-[#222222] flex flex-wrap gap-8 sm:gap-12 items-center">
			{#each navLinks as item}
				<button
					type="button"
					onclick={() => handleScrollTo(item.target)}
					class="font-body font-medium text-xs uppercase tracking-[0.1em] text-white hover:text-[#4682B4] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4682B4]"
				>
					{item.label}
				</button>
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
