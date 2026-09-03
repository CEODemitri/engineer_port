<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { onComplete }: { onComplete?: () => void } = $props();

	let isCompleted = $state(false);
	let isFadingOut = $state(false);
	let dIlluminated = $state(false);
	let shattered = $state(false);
	let timer1: ReturnType<typeof setTimeout> | null = null;
	let timer2: ReturnType<typeof setTimeout> | null = null;
	let timer3: ReturnType<typeof setTimeout> | null = null;
	let safetyTimer: ReturnType<typeof setTimeout> | null = null;

	interface HexCell {
		id: string;
		x: number;
		y: number;
		isDLetter: boolean;
		accentColor: string;
		delay: number;
		disperseX: number;
		disperseY: number;
		disperseRotate: number;
	}

	const hexRadius = 24;
	const w = Math.sqrt(3) * hexRadius;
	const h = 2 * hexRadius;
	const vertDist = h * 0.75;
	const cols = 13;
	const rows = 9;

	function checkDLetter(c: number, r: number): boolean {
		if (c === 4 && r >= 2 && r <= 6) return true;
		if (r === 2 && (c === 5 || c === 6 || c === 7)) return true;
		if (r === 6 && (c === 5 || c === 6 || c === 7)) return true;
		if ((r === 3 || r === 4 || r === 5) && c === 8) return true;
		return false;
	}

	const accentColors = ['#4682B4', '#39FF14', '#B76E79'];
	let accentIdx = 0;

	const cells: HexCell[] = [];
	for (let r = 0; r < rows; r++) {
		const rowOffset = (r % 2) * (w / 2);
		for (let c = 0; c < cols; c++) {
			const x = c * w + rowOffset;
			const y = r * vertDist;
			const isD = checkDLetter(c, r);
			const color = accentColors[accentIdx % accentColors.length];
			if (isD) accentIdx++;

			const distFromCenter = Math.sqrt(Math.pow(c - 6, 2) + Math.pow(r - 4, 2));
			const delay = distFromCenter * 0.04;

			const disperseX = (Math.random() - 0.5) * 400;
			const disperseY = (Math.random() - 0.5) * 400;
			const disperseRotate = (Math.random() - 0.5) * 180;

			cells.push({
				id: `hex-${c}-${r}`,
				x,
				y,
				isDLetter: isD,
				accentColor: color,
				delay,
				disperseX,
				disperseY,
				disperseRotate
			});
		}
	}

	const containerWidth = Math.round(cols * w + w / 2);
	const containerHeight = Math.round((rows - 1) * vertDist + h);

	function finishPreloader() {
		if (isCompleted) return;
		isCompleted = true;
		if (safetyTimer) clearTimeout(safetyTimer);
		if (timer1) clearTimeout(timer1);
		if (timer2) clearTimeout(timer2);
		if (timer3) clearTimeout(timer3);
		if (onComplete) {
			onComplete();
		}
	}

	function handleSkip() {
		finishPreloader();
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (mediaQuery.matches) {
			finishPreloader();
			return;
		}

		timer1 = setTimeout(() => {
			dIlluminated = true;
		}, 800);

		timer2 = setTimeout(() => {
			shattered = true;
		}, 1700);

		timer3 = setTimeout(() => {
			isFadingOut = true;
			setTimeout(() => {
				finishPreloader();
			}, 350);
		}, 2200);

		safetyTimer = setTimeout(() => {
			finishPreloader();
		}, 3000);
	});

	onDestroy(() => {
		if (safetyTimer) clearTimeout(safetyTimer);
		if (timer1) clearTimeout(timer1);
		if (timer2) clearTimeout(timer2);
		if (timer3) clearTimeout(timer3);
	});
</script>

{#if !isCompleted}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		onclick={handleSkip}
		class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black select-none pointer-events-auto transition-opacity duration-350 ease-out {isFadingOut
			? 'opacity-0'
			: 'opacity-100'}"
		role="status"
		aria-label="Loading portfolio experience. Click anywhere to skip."
	>
		<div class="relative flex flex-col items-center justify-center w-full max-w-2xl px-4">
			<!-- Honeycomb Grid Container with strict CSS hexagonal clipping -->
			<div
				class="relative overflow-visible"
				style="width: {containerWidth}px; height: {containerHeight}px; max-width: 90vw; max-height: 55vh;"
			>
				{#each cells as cell}
					<div
						id={cell.id}
						class="hex-cell absolute will-change-transform"
						style="
							left: {cell.x}px;
							top: {cell.y}px;
							width: {Math.round(w)}px;
							height: {Math.round(h)}px;
							clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
							background-color: {cell.isDLetter && dIlluminated
							? cell.accentColor
							: cell.isDLetter
								? '#1E2028'
								: '#111111'};
							transform: {shattered
							? `translate3d(${cell.disperseX}px, ${cell.disperseY}px, 0px) rotate(${cell.disperseRotate}deg) scale(0)`
							: cell.isDLetter && dIlluminated
								? 'scale(1.1)'
								: 'scale(1)'};
							opacity: {shattered ? 0 : cell.isDLetter && dIlluminated ? 1 : 0.35};
							transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, background-color 0.4s ease-out;
							transition-delay: {shattered ? '0ms' : `${cell.delay}s`};
						"
					></div>
				{/each}
			</div>

			<div
				class="preloader-brand mt-6 text-center transition-all duration-500 {shattered
					? 'opacity-0 scale-105'
					: 'opacity-100 scale-100'}"
			>
				<p class="font-heading text-xl md:text-2xl text-white tracking-widest uppercase">DEMITRI</p>
				<p class="font-mono text-[0.7rem] text-[#666666] tracking-[0.2em] mt-1 uppercase">
					CREATIVE DEVELOPER
				</p>
			</div>

			<button
				type="button"
				onclick={handleSkip}
				class="mt-6 text-[0.65rem] font-mono tracking-widest text-[#555555] hover:text-[#B76E79] uppercase cursor-pointer focus:outline-none"
			>
				[CLICK TO SKIP]
			</button>
		</div>
	</div>
{/if}
