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

	// Hexagon dimensions — generous architectural scale
	const R = 52; // Radius of outer circumscribed circle (~90px wide hexagons)
	const W = Math.sqrt(3) * R; // Horizontal distance between column centers (~90.06px)
	const vertDist = 1.5 * R; // Vertical distance between rows (78px)

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
		}

		// Pointer tracking coordinates with path interpolation
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
			// Static ambient grid for reduced motion users
			ctx.clearRect(0, 0, width, height);
			ctx.beginPath();
			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];
				for (let k = 0; k < 6; k++) {
					const px = cell.cx + hexCornerOffsets[k][0];
					const py = cell.cy + hexCornerOffsets[k][1];
					if (k === 0) ctx.moveTo(px, py);
					else ctx.lineTo(px, py);
				}
			}
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
			ctx.lineWidth = 1;
			ctx.stroke();

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

		// Styling parameters:
		// Slate Charcoal (rgb 50, 55, 65) -> Champagne Gold (rgb 212, 175, 55)
		const BASE_R = 50,
			BASE_G = 55,
			BASE_B = 65;
		const GOLD_R = 212,
			GOLD_G = 175,
			GOLD_B = 55;

		const maxLift = 20; // 3D vertical elevation in pixels

		function render(now: number) {
			if (!ctx || !isRunning) return;

			const dt = Math.min((now - lastTime) / 16.666, 2.5);
			lastTime = now;

			const hoverRadius = width < 640 ? 250 : 360;

			// Deactivate pointer after 3.5s of no movement
			if (isPointerActive && now - lastMoveTime > 3500) {
				isPointerActive = false;
			}

			// 1. Update cell elevation activation
			const activeCells: HexCell[] = [];
			const restingCells: HexCell[] = [];

			// Calculate mouse sweep trajectory interpolation
			const mouseMoved =
				isPointerActive &&
				prevMouseX > -100 &&
				(Math.abs(mouseX - prevMouseX) > 2 || Math.abs(mouseY - prevMouseY) > 2);
			const sweepSteps = mouseMoved ? 3 : 1;

			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];

				if (isPointerActive && mouseX > -100 && mouseY > -100) {
					// Check distance to current mouse position and along recent sweep path
					let minDist = Math.hypot(cell.cx - mouseX, cell.cy - mouseY);

					if (sweepSteps > 1) {
						for (let s = 1; s < sweepSteps; s++) {
							const t = s / sweepSteps;
							const sx = prevMouseX + (mouseX - prevMouseX) * t;
							const sy = prevMouseY + (mouseY - prevMouseY) * t;
							const d = Math.hypot(cell.cx - sx, cell.cy - sy);
							if (d < minDist) minDist = d;
						}
					}

					if (minDist < hoverRadius) {
						const norm = 1 - minDist / hoverRadius;
						// Smooth organic 3D dome profile: highest at center, smoothly tapering to zero
						const targetAct = norm * norm * (3 - 2 * norm);

						if (targetAct > cell.activation) {
							// Responsive, smooth rising ease-in
							cell.activation += (targetAct - cell.activation) * (0.22 * dt);
						} else {
							// Graceful, slower fall back as mouse moves away
							cell.activation += (targetAct - cell.activation) * (0.055 * dt);
						}
					} else {
						// Outside radius: silky, graceful relaxation back to resting plane
						cell.activation -= 0.003 * dt;
						cell.activation *= Math.pow(0.972, dt);
					}
				} else {
					// Pointer idle or left: gracefully sink down
					cell.activation -= 0.003 * dt;
					cell.activation *= Math.pow(0.972, dt);
				}

				if (cell.activation < 0.003) {
					cell.activation = 0;
					restingCells.push(cell);
				} else {
					activeCells.push(cell);
				}
			}

			// 2. Render Canvas
			ctx.clearRect(0, 0, width, height);

			// A. Draw Subtle Architectural Resting Grid (whisper-light baseline)
			ctx.beginPath();
			for (let i = 0; i < restingCells.length; i++) {
				const cell = restingCells[i];
				for (let k = 0; k < 6; k++) {
					const px = cell.cx + hexCornerOffsets[k][0];
					const py = cell.cy + hexCornerOffsets[k][1];
					if (k === 0) ctx.moveTo(px, py);
					else ctx.lineTo(px, py);
				}
			}
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
			ctx.lineWidth = 1;
			ctx.stroke();

			// B. Draw Elevated 3D Cells (sorted by Y for natural isometric depth stacking)
			activeCells.sort((a, b) => a.cy - b.cy);

			for (let j = 0; j < activeCells.length; j++) {
				const cell = activeCells[j];
				const act = cell.activation;

				// 3D Perspective Elevation: centerpoint raises upwards (-Y) and scales slightly
				const lift = act * maxLift;
				const scale = 1 + act * 0.05;

				// Dynamic color: Charcoal Slate -> Warm Champagne Gold
				const r = Math.round(BASE_R + (GOLD_R - BASE_R) * act);
				const g = Math.round(BASE_G + (GOLD_G - BASE_G) * act);
				const b = Math.round(BASE_B + (GOLD_B - BASE_B) * act);

				const strokeAlpha = Math.min(0.7, 0.12 + act * 0.58).toFixed(3);
				const sideAlpha = (act * 0.32).toFixed(3);

				// Compute top (elevated) and base vertices
				const topVerts: [number, number][] = [];
				const baseVerts: [number, number][] = [];

				for (let k = 0; k < 6; k++) {
					const ox = hexCornerOffsets[k][0] * scale;
					const oy = hexCornerOffsets[k][1] * scale;
					topVerts.push([cell.cx + ox, cell.cy - lift + oy]);
					baseVerts.push([cell.cx + hexCornerOffsets[k][0], cell.cy + hexCornerOffsets[k][1]]);
				}

				// 1. Base footprint shadow (ambient occlusion on the floor)
				if (act > 0.05) {
					const shadowAlpha = ((act - 0.05) * 0.07).toFixed(3);
					ctx.beginPath();
					for (let k = 0; k < 6; k++) {
						if (k === 0) ctx.moveTo(baseVerts[k][0], baseVerts[k][1]);
						else ctx.lineTo(baseVerts[k][0], baseVerts[k][1]);
					}
					ctx.closePath();
					ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
					ctx.fill();
				}

				// 2. Extruded 3D Side Walls (connect elevated face down to base plane)
				if (lift > 1.2) {
					// Visible perspective downward facets (indices 0->1, 1->2, 2->3, 3->4)
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
						const facetShade = e === 1 || e === 2 ? 0.04 : 0.025;
						ctx.fillStyle = `rgba(160, 168, 180, ${(act * facetShade).toFixed(3)})`;
						ctx.fill();
						ctx.strokeStyle = `rgba(70, 75, 85, ${sideAlpha})`;
						ctx.lineWidth = 0.8;
						ctx.stroke();
					}
				}

				// 3. Elevated Top Hexagon Cap
				ctx.beginPath();
				for (let k = 0; k < 6; k++) {
					if (k === 0) ctx.moveTo(topVerts[k][0], topVerts[k][1]);
					else ctx.lineTo(topVerts[k][0], topVerts[k][1]);
				}
				ctx.closePath();

				// Delicate champagne gold wash on elevated surface
				if (act > 0.05) {
					const fillAlpha = Math.min(0.09, (act - 0.05) * 0.08).toFixed(3);
					ctx.fillStyle = `rgba(212, 175, 55, ${fillAlpha})`;
					ctx.fill();
				}

				ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${strokeAlpha})`;
				ctx.lineWidth = 1 + act * 0.5;
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
