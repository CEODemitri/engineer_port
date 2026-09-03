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

	// Hexagon dimensions — enlarged for architectural scale and elegance
	const R = 54; // Radius of outer circumscribed circle (creates ~93.5px wide hexagons)
	const W = Math.sqrt(3) * R; // Width between adjacent column centers (~93.53px)
	const vertDist = 1.5 * R; // Vertical distance between adjacent rows (81px)

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
		// Entering / Decompressing tail: Muted neutral warm grey rgb(205, 208, 214)
		// Peak height: Sophisticated champagne gold rgb(212, 175, 55)
		const BASE_R = 205,
			BASE_G = 208,
			BASE_B = 214;
		const GOLD_R = 212,
			GOLD_G = 175,
			GOLD_B = 55;

		const hoverRadius = width < 640 ? 220 : 320;
		const maxLift = 16; // Maximum vertical rise in pixels for the 3D center elevation

		function render(now: number) {
			if (!ctx || !isRunning) return;

			const dt = Math.min((now - lastTime) / 16.666, 2.5);
			lastTime = now;

			// If no pointer move in 3 seconds, deactivate pointer
			if (isPointerActive && now - lastMoveTime > 3000) {
				isPointerActive = false;
			}

			// 1. Update cell activation and smooth rise/fall elevation
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
						// Smooth organic falloff curve (raised dome profile)
						const targetAct = norm * norm * (3 - 2 * norm);
						// Graceful rising ease-in
						cell.activation += (targetAct - cell.activation) * (0.09 * dt);
					} else {
						// Graceful falling ease-out
						cell.activation -= 0.0035 * dt;
						cell.activation *= Math.pow(0.978, dt);
					}

					// Interpolate with previous mouse position for continuous wave trail
					if (prevMouseX > -100 && (prevMouseX !== mouseX || prevMouseY !== mouseY)) {
						const midX = (mouseX + prevMouseX) / 2;
						const midY = (mouseY + prevMouseY) / 2;
						const dMid = Math.hypot(cell.cx - midX, cell.cy - midY);
						if (dMid < hoverRadius) {
							const normMid = Math.max(0, 1 - dMid / hoverRadius);
							const midTargetAct = normMid * normMid * (3 - 2 * normMid);
							cell.activation += (midTargetAct - cell.activation) * (0.075 * dt);
						}
					}
				} else {
					// Gracefully sink back to base when pointer is idle
					cell.activation -= 0.0035 * dt;
					cell.activation *= Math.pow(0.978, dt);
				}

				if (cell.activation < 0.002) {
					cell.activation = 0;
				} else {
					activeCells.push(cell);
				}
			}

			// 2. Render Honeycomb Layer:
			// In rest state (no active cells), canvas is completely cleared with NO sign of the grid
			ctx.clearRect(0, 0, width, height);

			// Draw active cells sorted by Y so lower 3D prisms overlap naturally
			activeCells.sort((a, b) => a.cy - b.cy);

			for (let j = 0; j < activeCells.length; j++) {
				const cell = activeCells[j];
				const act = cell.activation;

				// 3D vertical displacement (raising up towards viewer & slight Y lift)
				const lift = act * maxLift;
				const scale = 1 + act * 0.04;

				// Color interpolation:
				const r = Math.round(BASE_R + (GOLD_R - BASE_R) * act);
				const g = Math.round(BASE_G + (GOLD_G - BASE_G) * act);
				const b = Math.round(BASE_B + (GOLD_B - BASE_B) * act);

				const strokeAlpha = (act * 0.38).toFixed(3);
				const sideAlpha = (act * 0.22).toFixed(3);

				// Precalculate top (elevated) and base vertices
				const topVerts: [number, number][] = [];
				const baseVerts: [number, number][] = [];

				for (let k = 0; k < 6; k++) {
					const ox = hexCornerOffsets[k][0] * scale;
					const oy = hexCornerOffsets[k][1] * scale;
					topVerts.push([cell.cx + ox, cell.cy - lift + oy]);
					baseVerts.push([cell.cx + hexCornerOffsets[k][0], cell.cy + hexCornerOffsets[k][1]]);
				}

				// A. Base shadow / ground footprint when raised
				if (act > 0.08) {
					const shadowAlpha = ((act - 0.08) * 0.06).toFixed(3);
					ctx.beginPath();
					for (let k = 0; k < 6; k++) {
						if (k === 0) ctx.moveTo(baseVerts[k][0], baseVerts[k][1]);
						else ctx.lineTo(baseVerts[k][0], baseVerts[k][1]);
					}
					ctx.closePath();
					ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
					ctx.fill();
				}

				// B. 3D Extruded Side Walls (connecting elevated top face to ground base)
				if (lift > 1.2) {
					// Draw side bevel facets for visible downward-facing sides (indices 0->1, 1->2, 2->3, 3->4)
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

						// Subtle side facet shading with depth
						const facetShade = e === 1 || e === 2 ? 0.035 : 0.02;
						ctx.fillStyle = `rgba(180, 185, 195, ${(act * facetShade).toFixed(3)})`;
						ctx.fill();
						ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${sideAlpha})`;
						ctx.lineWidth = 0.75;
						ctx.stroke();
					}
				}

				// C. Elevated Top Hexagon Face
				ctx.beginPath();
				for (let k = 0; k < 6; k++) {
					if (k === 0) ctx.moveTo(topVerts[k][0], topVerts[k][1]);
					else ctx.lineTo(topVerts[k][0], topVerts[k][1]);
				}
				ctx.closePath();

				// Soft champagne fill wash on the elevated cap
				if (act > 0.08) {
					const fillAlpha = Math.min(0.08, (act - 0.08) * 0.07).toFixed(3);
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
