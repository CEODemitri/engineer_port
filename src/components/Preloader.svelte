<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { onComplete }: { onComplete?: () => void } = $props();

	let isCompleted = $state(false);
	let isFadingOut = $state(false);
	let canvasEl: HTMLCanvasElement | null = $state(null);
	let animId: number = 0;
	let safetyTimer: ReturnType<typeof setTimeout> | null = null;
	let waveProgress = $state(0);

	interface HexCell {
		col: number;
		row: number;
		cx: number;
		cy: number;
		activation: number;
	}

	// Exact matching geometry with main HoneycombBackground
	const R_DESKTOP = 48; // Circumscribed radius (~83.1px wide hexagons)
	const R_MOBILE = 42; // Compact for mobile screens

	function getHexOffsets(radius: number): [number, number][] {
		const offsets: [number, number][] = [];
		for (let k = 0; k < 6; k++) {
			const angle = (Math.PI / 3) * k - Math.PI / 2;
			offsets.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
		}
		return offsets;
	}

	function finishPreloader() {
		if (isCompleted) return;
		isCompleted = true;
		if (safetyTimer) clearTimeout(safetyTimer);
		if (animId) cancelAnimationFrame(animId);
		if (onComplete) {
			onComplete();
		}
	}

	function handleSkip() {
		isFadingOut = true;
		setTimeout(() => {
			finishPreloader();
		}, 200);
	}

	onMount(() => {
		if (typeof window === 'undefined') return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			finishPreloader();
			return;
		}

		const canvas = canvasEl;
		if (!canvas) return;

		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		let dpr = Math.min(window.devicePixelRatio || 1, 2);
		let width = window.innerWidth;
		let height = window.innerHeight;

		let currentR = width < 640 ? R_MOBILE : R_DESKTOP;
		let W = Math.sqrt(3) * currentR;
		let vertDist = 1.5 * currentR;
		let hexCornerOffsets = getHexOffsets(currentR);

		let cells: HexCell[] = [];
		let cols = 0;
		let rows = 0;

		function setupGrid() {
			if (!canvas || !ctx) return;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;

			currentR = width < 640 ? R_MOBILE : R_DESKTOP;
			W = Math.sqrt(3) * currentR;
			vertDist = 1.5 * currentR;
			hexCornerOffsets = getHexOffsets(currentR);

			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(dpr, dpr);

			cols = Math.ceil(width / W) + 3;
			rows = Math.ceil(height / vertDist) + 3;

			cells = [];
			for (let r = -2; r < rows; r++) {
				const rowOffset = Math.abs(r) % 2 === 1 ? W / 2 : 0;
				for (let c = -2; c < cols; c++) {
					const cx = c * W + rowOffset;
					const cy = r * vertDist;
					cells.push({
						col: c,
						row: r,
						cx,
						cy,
						activation: 0
					});
				}
			}
		}

		window.addEventListener('resize', setupGrid);
		setupGrid();

		// Wave parameters — one continuous wave sweeping left to right
		const waveStartTime = performance.now() + 150; // brief 150ms settle
		const waveDuration = width < 768 ? 1400 : 1600; // ms to sweep completely from left edge to right edge
		const maxLift = 26; // 3D elevation in pixels

		const BASE_R = 40,
			BASE_G = 45,
			BASE_B = 55;
		const GOLD_R = 212,
			GOLD_G = 175,
			GOLD_B = 55;

		let hasTriggeredFade = false;

		function render(now: number) {
			if (!ctx || isCompleted) return;

			const elapsed = Math.max(0, now - waveStartTime);
			const progress = Math.min(1.0, elapsed / waveDuration);
			waveProgress = progress;

			// Wave position travels across screen from left (x < 0) to right (x > width)
			const waveBand = width < 768 ? 180 : 260;
			const startX = -waveBand;
			const endX = width + waveBand + 100;
			const currentWaveX = startX + progress * (endX - startX);

			const activeCells: HexCell[] = [];
			const restingCells: HexCell[] = [];

			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];

				// Calculate distance of cell from wave front
				const distFromWave = Math.abs(cell.cx - currentWaveX);

				let targetAct = 0;
				if (distFromWave < waveBand && elapsed > 0) {
					const norm = 1 - distFromWave / waveBand;
					// Smooth organic 3D wave dome: rises and falls symmetrically
					targetAct = norm * norm * (3 - 2 * norm);
				}

				// Fast attack, smooth decay
				if (targetAct > cell.activation) {
					cell.activation += (targetAct - cell.activation) * 0.35;
				} else {
					cell.activation += (targetAct - cell.activation) * 0.06;
				}

				if (cell.activation < 0.01) {
					cell.activation = 0;
					restingCells.push(cell);
				} else {
					activeCells.push(cell);
				}
			}

			// Clear canvas
			ctx.clearRect(0, 0, width, height);

			// 1. Dark Blueprint Grid on Black Background (crisp resting lines across entire screen)
			ctx.beginPath();
			for (let i = 0; i < restingCells.length; i++) {
				const cell = restingCells[i];
				for (let k = 0; k < 6; k++) {
					const px = cell.cx + hexCornerOffsets[k][0];
					const py = cell.cy + hexCornerOffsets[k][1];
					if (k === 0) ctx.moveTo(px, py);
					else ctx.lineTo(px, py);
				}
				ctx.closePath();
			}
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.075)';
			ctx.lineWidth = 1;
			ctx.stroke();

			// 2. Render 3D Elevated Hexagonal Prisms along the wave crest
			activeCells.sort((a, b) => a.cy - b.cy);

			for (let j = 0; j < activeCells.length; j++) {
				const cell = activeCells[j];
				const act = cell.activation;

				const lift = act * maxLift;
				const scale = 1 + act * 0.05;

				// Dynamic color: Slate Blue -> Warm Champagne Gold -> White Crest
				const r = Math.round(BASE_R + (GOLD_R - BASE_R) * act);
				const g = Math.round(BASE_G + (GOLD_G - BASE_G) * act);
				const b = Math.round(BASE_B + (GOLD_B - BASE_B) * act);

				const strokeAlpha = Math.min(0.95, 0.2 + act * 0.75).toFixed(3);
				const sideAlpha = (act * 0.45).toFixed(3);

				const topVerts: [number, number][] = [];
				const baseVerts: [number, number][] = [];

				for (let k = 0; k < 6; k++) {
					const ox = hexCornerOffsets[k][0] * scale;
					const oy = hexCornerOffsets[k][1] * scale;
					topVerts.push([cell.cx + ox, cell.cy - lift + oy]);
					baseVerts.push([cell.cx + hexCornerOffsets[k][0], cell.cy + hexCornerOffsets[k][1]]);
				}

				// Soft contact shadow
				if (act > 0.05) {
					ctx.beginPath();
					for (let k = 0; k < 6; k++) {
						if (k === 0) ctx.moveTo(baseVerts[k][0], baseVerts[k][1]);
						else ctx.lineTo(baseVerts[k][0], baseVerts[k][1]);
					}
					ctx.closePath();
					ctx.fillStyle = `rgba(0, 0, 0, 0.35)`;
					ctx.fill();
				}

				// Extruded 3D Side Walls
				if (lift > 1.0) {
					const sideEdges = [
						[0, 1],
						[1, 2],
						[2, 3],
						[3, 4]
					];
					for (let e = 0; e < sideEdges.length; e++) {
						const [v1, v2] = sideEdges[e];
						ctx.beginPath();
						ctx.moveTo(topVerts[v1][0], topVerts[v1][1]);
						ctx.lineTo(topVerts[v2][0], topVerts[v2][1]);
						ctx.lineTo(baseVerts[v2][0], baseVerts[v2][1]);
						ctx.lineTo(baseVerts[v1][0], baseVerts[v1][1]);
						ctx.closePath();

						ctx.fillStyle = `rgba(180, 190, 210, ${(act * 0.08).toFixed(3)})`;
						ctx.fill();
						ctx.strokeStyle = `rgba(140, 150, 170, ${sideAlpha})`;
						ctx.lineWidth = 0.8;
						ctx.stroke();
					}
				}

				// Top Hexagon Cap with subtle gold luminous wash
				ctx.beginPath();
				for (let k = 0; k < 6; k++) {
					if (k === 0) ctx.moveTo(topVerts[k][0], topVerts[k][1]);
					else ctx.lineTo(topVerts[k][0], topVerts[k][1]);
				}
				ctx.closePath();

				if (act > 0.05) {
					const fillAlpha = Math.min(0.25, (act - 0.05) * 0.28).toFixed(3);
					ctx.fillStyle = `rgba(212, 175, 55, ${fillAlpha})`;
					ctx.fill();
				}

				ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${strokeAlpha})`;
				ctx.lineWidth = 1 + act * 0.85;
				ctx.stroke();
			}

			// When wave has swept across to the right, trigger smooth fadeout
			if (progress >= 1.0 && !hasTriggeredFade) {
				hasTriggeredFade = true;
				setTimeout(() => {
					isFadingOut = true;
					setTimeout(() => {
						finishPreloader();
					}, 380);
				}, 220);
			}

			if (!isCompleted) {
				animId = requestAnimationFrame(render);
			}
		}

		animId = requestAnimationFrame(render);

		// Safety timeout
		safetyTimer = setTimeout(() => {
			if (!isCompleted) {
				finishPreloader();
			}
		}, 3000);

		return () => {
			window.removeEventListener('resize', setupGrid);
			if (animId) cancelAnimationFrame(animId);
			if (safetyTimer) clearTimeout(safetyTimer);
		};
	});

	onDestroy(() => {
		if (animId) cancelAnimationFrame(animId);
		if (safetyTimer) clearTimeout(safetyTimer);
	});
</script>

{#if !isCompleted}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		onclick={handleSkip}
		class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black select-none pointer-events-auto transition-opacity duration-400 ease-out {isFadingOut
			? 'opacity-0'
			: 'opacity-100'}"
		role="status"
		aria-label="Loading portfolio experience. Click anywhere to skip."
	>
		<!-- Full-screen Canvas Honeycomb spanning entire width and height -->
		<canvas
			bind:this={canvasEl}
			id="preloader-honeycomb-canvas"
			class="absolute inset-0 w-full h-full pointer-events-none z-0"
			aria-hidden="true"
		></canvas>

		<!-- Center Minimalist Typography Branding -->
		<div class="relative z-10 flex flex-col items-center justify-center px-6 text-center">
			<div class="mb-3 flex items-center gap-2">
				<span class="w-1.5 h-1.5 bg-[#B76E79] animate-pulse" aria-hidden="true"></span>
				<span class="font-mono text-[0.65rem] sm:text-xs text-[#B76E79] uppercase tracking-[0.2em]"
					>SYS.INIT // WAVE RIPPLE</span
				>
			</div>

			<h1
				class="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-widest uppercase transition-transform duration-300"
			>
				DEMITRI
			</h1>

			<p
				class="font-mono text-[0.7rem] sm:text-xs text-[#888888] tracking-[0.25em] mt-2 uppercase max-w-xs"
			>
				CREATIVE DEVELOPER
			</p>

			<!-- Progress Bar Indicator -->
			<div class="w-36 sm:w-48 h-[2px] bg-white/10 mt-6 overflow-hidden rounded-none">
				<div
					class="h-full bg-gradient-to-r from-[#B76E79] via-[#4682B4] to-[#39FF14] transition-all duration-75 ease-out"
					style="width: {Math.round(waveProgress * 100)}%"
				></div>
			</div>

			<button
				type="button"
				onclick={handleSkip}
				class="mt-6 text-[0.65rem] font-mono tracking-widest text-[#555555] hover:text-[#B76E79] uppercase cursor-pointer focus:outline-none transition-colors"
			>
				[CLICK TO SKIP]
			</button>
		</div>
	</div>
{/if}
