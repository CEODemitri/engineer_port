<script lang="ts">
	import { onMount } from 'svelte';

	interface HexCell {
		col: number;
		row: number;
		cx: number;
		cy: number;
		activation: number;
	}

	let animId: number = 0;
	let prefersReducedMotion = $state(false);

	// Hexagon dimensions
	const R = 26; // Radius of outer circumscribed circle
	const W = Math.sqrt(3) * R; // Width between adjacent column centers (~45.03px)
	const vertDist = 1.5 * R; // Vertical distance between adjacent rows (39px)

	// Precomputed corner offsets for pointy-topped hexagon (6 vertices)
	const hexCornerOffsets: [number, number][] = [];
	for (let k = 0; k < 6; k++) {
		const angle = (Math.PI / 3) * k - Math.PI / 2;
		hexCornerOffsets.push([R * Math.cos(angle), R * Math.sin(angle)]);
	}

	onMount(() => {
		if (typeof window === 'undefined') return;

		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const canvas = document.getElementById('honeycomb-canvas') as HTMLCanvasElement | null;
		if (!canvas) return;

		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		let dpr = Math.min(window.devicePixelRatio || 1, 2);
		let width = window.innerWidth;
		let height = window.innerHeight;

		let cells: HexCell[] = [];
		let cols = 0;
		let rows = 0;

		function setupGrid() {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;

			if (!canvas) return;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(dpr, dpr);

			// Compute columns and rows with 2-cell buffer on all edges to ensure seamless edge-to-edge coverage
			cols = Math.ceil(width / W) + 3;
			rows = Math.ceil(height / vertDist) + 3;

			cells = [];
			for (let r = -1; r < rows; r++) {
				const rowOffset = (r % 2) * (W / 2);
				for (let c = -1; c < cols; c++) {
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

			// In rest state, canvas must be completely clear (no sign of honeycomb)
			ctx.clearRect(0, 0, width, height);
		}

		// Mouse / Touch interaction coordinates
		let mouseX = -9999;
		let mouseY = -9999;
		let isPointerActive = false;

		function handlePointerMove(e: PointerEvent | MouseEvent) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			isPointerActive = true;
		}

		function handlePointerLeave() {
			isPointerActive = false;
			mouseX = -9999;
			mouseY = -9999;
		}

		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
		window.addEventListener('resize', setupGrid);

		setupGrid();

		if (prefersReducedMotion) {
			return () => {
				window.removeEventListener('pointermove', handlePointerMove);
				window.removeEventListener('pointerleave', handlePointerLeave);
				window.removeEventListener('resize', setupGrid);
			};
		}

		let lastTime = performance.now();
		let isRunning = true;

		// Color transition constants:
		// Entering / Decompressing tail: Light grey rgb(195, 198, 206)
		// Peak height: Low opacity gold rgb(212, 175, 55)
		const BASE_R = 195,
			BASE_G = 198,
			BASE_B = 206;
		const GOLD_R = 212,
			GOLD_G = 175,
			GOLD_B = 55;

		const hoverRadius = width < 640 ? 145 : 185;

		function render(now: number) {
			if (!ctx || !isRunning) return;

			const dt = Math.min((now - lastTime) / 16.666, 2.5);
			lastTime = now;

			// 1. Update cell activation and decompression
			const activeCells: HexCell[] = [];

			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];

				if (isPointerActive) {
					const dx = cell.cx - mouseX;
					const dy = cell.cy - mouseY;
					const dist = Math.hypot(dx, dy);

					if (dist < hoverRadius) {
						const norm = 1 - dist / hoverRadius;
						// Ease in activation towards mouse center
						const targetAct = Math.pow(norm, 1.35);
						if (targetAct > cell.activation) {
							cell.activation = targetAct;
						}
					}
				}

				// Decompression transition: smoothly decay back from gold to light grey, then fade out
				if (cell.activation > 0) {
					cell.activation -= 0.016 * dt;
					cell.activation *= Math.pow(0.955, dt);
					if (cell.activation < 0.003) {
						cell.activation = 0;
					} else {
						activeCells.push(cell);
					}
				}
			}

			// 2. Render Honeycomb Layer:
			// In rest state (no active cells), canvas is completely cleared with NO sign of the grid
			ctx.clearRect(0, 0, width, height);

			// Draw ONLY active / decompressing cells around the hovered portion
			for (let j = 0; j < activeCells.length; j++) {
				const cell = activeCells[j];
				const act = cell.activation;

				// Smooth color transition:
				// At low act (entering / trailing decompression): closer to light grey with lower opacity
				// At peak act (near hover center): transitions to low opacity gold (max ~0.45 opacity)
				const r = Math.round(BASE_R + (GOLD_R - BASE_R) * act);
				const g = Math.round(BASE_G + (GOLD_G - BASE_G) * act);
				const b = Math.round(BASE_B + (GOLD_B - BASE_B) * act);

				// Stroke opacity fades gracefully to 0 at low activation, peaks at ~0.44 at height
				const strokeAlpha = Math.min(0.44, Math.max(0, act * 0.48)).toFixed(3);

				ctx.beginPath();
				for (let k = 0; k < 6; k++) {
					const px = cell.cx + hexCornerOffsets[k][0];
					const py = cell.cy + hexCornerOffsets[k][1];
					if (k === 0) {
						ctx.moveTo(px, py);
					} else {
						ctx.lineTo(px, py);
					}
				}
				ctx.closePath();

				// Subtle gold wash fill at its peak height (soft glow inside the hexagon)
				if (act > 0.15) {
					const fillAlpha = ((act - 0.15) * 0.08).toFixed(3);
					ctx.fillStyle = `rgba(212, 175, 55, ${fillAlpha})`;
					ctx.fill();
				}

				ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${strokeAlpha})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			animId = requestAnimationFrame(render);
		}

		animId = requestAnimationFrame(render);

		return () => {
			isRunning = false;
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerleave', handlePointerLeave);
			window.removeEventListener('resize', setupGrid);
			if (animId) {
				cancelAnimationFrame(animId);
			}
		};
	});
</script>

<canvas
	id="honeycomb-canvas"
	class="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full select-none"
	aria-hidden="true"
></canvas>
