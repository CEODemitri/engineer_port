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
	const R = 28; // Radius of outer circumscribed circle
	const W = Math.sqrt(3) * R; // Width between adjacent column centers (~48.5px)
	const vertDist = 1.5 * R; // Vertical distance between adjacent rows (42px)

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

			if (!canvas || !ctx) return;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(dpr, dpr);

			// Compute columns and rows with 2-cell buffer on all edges to ensure seamless edge-to-edge coverage
			cols = Math.ceil(width / W) + 4;
			rows = Math.ceil(height / vertDist) + 4;

			cells = [];
			for (let r = -2; r < rows; r++) {
				const rowOffset = (r % 2) * (W / 2);
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

			// In rest state, canvas must be completely clear (no sign of honeycomb)
			ctx.clearRect(0, 0, width, height);
		}

		// Pointer tracking coordinates with segment interpolation for rapid sweeps
		let mouseX = -9999;
		let mouseY = -9999;
		let prevMouseX = -9999;
		let prevMouseY = -9999;
		let isPointerActive = false;
		let lastMoveTime = 0;

		function updatePointer(x: number, y: number) {
			prevMouseX = isPointerActive ? mouseX : x;
			prevMouseY = isPointerActive ? mouseY : y;
			mouseX = x;
			mouseY = y;
			isPointerActive = true;
			lastMoveTime = performance.now();
		}

		function handlePointerMove(e: PointerEvent | MouseEvent) {
			updatePointer(e.clientX, e.clientY);
		}

		function handleTouchMove(e: TouchEvent) {
			if (e.touches.length > 0) {
				updatePointer(e.touches[0].clientX, e.touches[0].clientY);
			}
		}

		function handlePointerLeave() {
			isPointerActive = false;
			mouseX = -9999;
			mouseY = -9999;
			prevMouseX = -9999;
			prevMouseY = -9999;
		}

		// Attach to both window and document to ensure 100% reliable tracking in all iframe containers
		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		window.addEventListener('mousemove', handlePointerMove, { passive: true });
		window.addEventListener('touchmove', handleTouchMove, { passive: true });
		window.addEventListener('touchstart', handleTouchMove, { passive: true });
		document.addEventListener('pointermove', handlePointerMove, { passive: true });
		document.addEventListener('mousemove', handlePointerMove, { passive: true });
		window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
		document.addEventListener('mouseleave', handlePointerLeave, { passive: true });
		window.addEventListener('resize', setupGrid);

		setupGrid();

		if (prefersReducedMotion) {
			return () => {
				window.removeEventListener('pointermove', handlePointerMove);
				window.removeEventListener('mousemove', handlePointerMove);
				window.removeEventListener('touchmove', handleTouchMove);
				window.removeEventListener('touchstart', handleTouchMove);
				document.removeEventListener('pointermove', handlePointerMove);
				document.removeEventListener('mousemove', handlePointerMove);
				window.removeEventListener('pointerleave', handlePointerLeave);
				document.removeEventListener('mouseleave', handlePointerLeave);
				window.removeEventListener('resize', setupGrid);
			};
		}

		let lastTime = performance.now();
		let isRunning = true;

		// Color transition:
		// Entering / Decompressing tail: Refined architectural slate-charcoal rgb(60, 68, 80)
		// Peak height: Warm luminous gold rgb(212, 175, 55)
		const BASE_R = 70,
			BASE_G = 80,
			BASE_B = 95;
		const GOLD_R = 212,
			GOLD_G = 175,
			GOLD_B = 55;

		const hoverRadius = width < 640 ? 165 : 230;

		function render(now: number) {
			if (!ctx || !isRunning) return;

			const dt = Math.min((now - lastTime) / 16.666, 2.5);
			lastTime = now;

			// If no pointer move in 2.5 seconds, deactivate pointer
			if (isPointerActive && now - lastMoveTime > 2500) {
				isPointerActive = false;
			}

			// 1. Update cell activation and decompression
			const activeCells: HexCell[] = [];

			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];

				if (isPointerActive && mouseX > -100 && mouseY > -100) {
					// Distance to current pointer
					const dx = cell.cx - mouseX;
					const dy = cell.cy - mouseY;
					const dist = Math.hypot(dx, dy);

					if (dist < hoverRadius) {
						const norm = Math.max(0, 1 - dist / hoverRadius);
						// High contrast activation curve
						const targetAct = Math.pow(norm, 1.25);
						if (targetAct > cell.activation) {
							cell.activation = targetAct;
						}
					}

					// Interpolate with previous mouse position for fast sweeps
					if (prevMouseX > -100 && (prevMouseX !== mouseX || prevMouseY !== mouseY)) {
						const midX = (mouseX + prevMouseX) / 2;
						const midY = (mouseY + prevMouseY) / 2;
						const dMid = Math.hypot(cell.cx - midX, cell.cy - midY);
						if (dMid < hoverRadius) {
							const normMid = Math.max(0, 1 - dMid / hoverRadius);
							const midTargetAct = Math.pow(normMid, 1.25);
							if (midTargetAct > cell.activation) {
								cell.activation = midTargetAct;
							}
						}
					}
				}

				// Smooth decompression transition: decay activation gracefully
				if (cell.activation > 0) {
					cell.activation -= 0.012 * dt;
					cell.activation *= Math.pow(0.965, dt);
					if (cell.activation < 0.005) {
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

				// Dynamic Color Interpolation:
				// Low act (entering / trailing decompression): slate charcoal with crisp visibility
				// Peak act (near hover center): radiant warm gold
				const r = Math.round(BASE_R + (GOLD_R - BASE_R) * act);
				const g = Math.round(BASE_G + (GOLD_G - BASE_G) * act);
				const b = Math.round(BASE_B + (GOLD_B - BASE_B) * act);

				// Stroke opacity scales from ~0.15 at edges to ~0.82 at peak
				const strokeAlpha = Math.min(0.85, Math.max(0, act * 0.88)).toFixed(3);
				const strokeWidth = 1 + act * 0.6;

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

				// Luminous gold wash fill at center of hover
				if (act > 0.08) {
					const fillAlpha = Math.min(0.22, (act - 0.08) * 0.2).toFixed(3);
					ctx.fillStyle = `rgba(212, 175, 55, ${fillAlpha})`;
					ctx.fill();
				}

				ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${strokeAlpha})`;
				ctx.lineWidth = strokeWidth;
				ctx.stroke();
			}

			animId = requestAnimationFrame(render);
		}

		animId = requestAnimationFrame(render);

		return () => {
			isRunning = false;
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('mousemove', handlePointerMove);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchstart', handleTouchMove);
			document.removeEventListener('pointermove', handlePointerMove);
			document.removeEventListener('mousemove', handlePointerMove);
			window.removeEventListener('pointerleave', handlePointerLeave);
			document.removeEventListener('mouseleave', handlePointerLeave);
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
