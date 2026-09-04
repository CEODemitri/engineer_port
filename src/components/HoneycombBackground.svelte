<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface HexCell {
		col: number;
		row: number;
		cx: number;
		cy: number;
		activation: number;
	}

	interface TapRipple {
		id: number;
		x: number;
		y: number;
		startTime: number;
		duration: number;
		maxRadius: number;
		strength: number;
	}

	let canvasEl: HTMLCanvasElement | null = $state(null);
	let animId: number = 0;
	let prefersReducedMotion = $state(false);

	// Hexagon dimensions — generous architectural scale
	const R_DESKTOP = 48; // Circumscribed radius (~83.1px wide hexagons)
	const R_MOBILE = 42; // Slightly more compact for mobile viewport density

	// Precomputed corner offsets for pointy-topped hexagon (6 vertices)
	function getHexOffsets(radius: number): [number, number][] {
		const offsets: [number, number][] = [];
		for (let k = 0; k < 6; k++) {
			const angle = (Math.PI / 3) * k - Math.PI / 2;
			offsets.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
		}
		return offsets;
	}

	onMount(() => {
		if (typeof window === 'undefined') return;

		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const canvas =
			canvasEl || (document.getElementById('honeycomb-canvas') as HTMLCanvasElement | null);
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

		// Pointer tracking coordinates with path interpolation
		let mouseX = -9999;
		let mouseY = -9999;
		let prevMouseX = -9999;
		let prevMouseY = -9999;
		let isPointerActive = false;
		let lastMoveTime = performance.now();

		// Tap Ripple shockwave collection
		let ripples: TapRipple[] = [];
		let nextRippleId = 1;
		let lastTapTime = 0;
		let lastTapX = -9999;
		let lastTapY = -9999;

		function updatePointer(x: number, y: number) {
			prevMouseX = isPointerActive ? mouseX : x;
			prevMouseY = isPointerActive ? mouseY : y;
			mouseX = x;
			mouseY = y;
			isPointerActive = true;
			lastMoveTime = performance.now();
		}

		function triggerTap(x: number, y: number, isStrong: boolean = false) {
			const now = performance.now();

			// Debounce duplicate identical-position events fired within 60ms (e.g. touchstart followed by click)
			if (now - lastTapTime < 60 && Math.hypot(x - lastTapX, y - lastTapY) < 20) {
				return;
			}
			lastTapTime = now;
			lastTapX = x;
			lastTapY = y;

			updatePointer(x, y);

			const isSmallScreen = width < 768;
			const maxRadius = isSmallScreen ? 340 : 440;
			const duration = isSmallScreen ? 1100 : 1300;
			const strength = isStrong ? 1.0 : 0.88;

			// Add tap shockwave ripple (keep max 6 active ripples)
			ripples.push({
				id: nextRippleId++,
				x,
				y,
				startTime: now,
				duration,
				maxRadius,
				strength
			});

			if (ripples.length > 6) {
				ripples.shift();
			}

			// Immediately boost direct hexagonal cells under the touch point for instantaneous tactile feedback
			const instantRadius = isSmallScreen ? 140 : 180;
			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];
				const dist = Math.hypot(cell.cx - x, cell.cy - y);
				if (dist < instantRadius) {
					const directImpact = (1 - dist / instantRadius) * 0.95;
					cell.activation = Math.max(cell.activation, directImpact);
				}
			}
		}

		function handlePointerMove(e: PointerEvent | MouseEvent) {
			// On desktop mouse or pointer move
			updatePointer(e.clientX, e.clientY);
		}

		function handlePointerDown(e: PointerEvent) {
			triggerTap(e.clientX, e.clientY, true);
		}

		function handleTouchStart(e: TouchEvent) {
			if (e.touches && e.touches.length > 0) {
				for (let i = 0; i < Math.min(e.touches.length, 2); i++) {
					const touch = e.touches[i];
					triggerTap(touch.clientX, touch.clientY, true);
				}
			}
		}

		function handleTouchMove(e: TouchEvent) {
			if (e.touches && e.touches.length > 0) {
				const touch = e.touches[0];
				updatePointer(touch.clientX, touch.clientY);
			}
		}

		function handleTouchEnd(e: TouchEvent) {
			if (e.changedTouches && e.changedTouches.length > 0) {
				const touch = e.changedTouches[0];
				triggerTap(touch.clientX, touch.clientY, false);
			}
		}

		function handleClick(e: MouseEvent) {
			triggerTap(e.clientX, e.clientY, false);
		}

		function handlePointerLeave() {
			isPointerActive = false;
			mouseX = -9999;
			mouseY = -9999;
		}

		// Use capture: true so tap events anywhere on the viewport (including over cards/buttons) trigger background ripples
		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		window.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true });
		window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
		window.addEventListener('touchmove', handleTouchMove, { passive: true, capture: true });
		window.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });
		window.addEventListener('click', handleClick, { passive: true, capture: true });
		window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
		document.addEventListener('mouseleave', handlePointerLeave, { passive: true });
		window.addEventListener('resize', setupGrid);

		setupGrid();

		if (prefersReducedMotion) {
			// Clean static blueprint grid for reduced motion preference
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
				ctx.closePath();
			}
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.085)';
			ctx.lineWidth = 1;
			ctx.stroke();

			return () => {
				window.removeEventListener('pointermove', handlePointerMove);
				window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
				window.removeEventListener('touchstart', handleTouchStart, { capture: true });
				window.removeEventListener('touchmove', handleTouchMove, { capture: true });
				window.removeEventListener('touchend', handleTouchEnd, { capture: true });
				window.removeEventListener('click', handleClick, { capture: true });
				window.removeEventListener('pointerleave', handlePointerLeave);
				document.removeEventListener('mouseleave', handlePointerLeave);
				window.removeEventListener('resize', setupGrid);
			};
		}

		let lastTime = performance.now();
		let isRunning = true;

		// Color palette for 3D elevation:
		// Slate Charcoal (rgb 50, 55, 65) -> Champagne Gold (rgb 212, 175, 55)
		const BASE_R = 50,
			BASE_G = 55,
			BASE_B = 65;
		const GOLD_R = 212,
			GOLD_G = 175,
			GOLD_B = 55;
		const maxLift = 22; // 3D elevation in pixels

		function render(now: number) {
			if (!ctx || !isRunning) return;

			const dt = Math.min((now - lastTime) / 16.666, 2.5);
			lastTime = now;

			const isSmallScreen = width < 768;
			const hoverRadius = isSmallScreen ? 220 : 340;

			// Idle pointer timeout
			if (isPointerActive && now - lastMoveTime > (isSmallScreen ? 2200 : 3500)) {
				isPointerActive = false;
			}

			// Clean expired ripples
			for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
				if (now - ripples[rIdx].startTime > ripples[rIdx].duration) {
					ripples.splice(rIdx, 1);
				}
			}

			// Check pointer sweep trajectory
			const mouseMoved =
				isPointerActive &&
				prevMouseX > -100 &&
				(Math.abs(mouseX - prevMouseX) > 2 || Math.abs(mouseY - prevMouseY) > 2);
			const sweepSteps = mouseMoved ? 3 : 1;

			const activeCells: HexCell[] = [];
			const restingCells: HexCell[] = [];

			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];

				// 1. Ambient gentle organic breathing pulse (diagonal propagation)
				// Ensures the background is NEVER static or invisible even before user touches/moves
				const ambientWave =
					Math.sin(now * 0.0009 + (cell.cx * 0.0035 + cell.cy * 0.0028)) * 0.5 + 0.5;
				const ambientAct = ambientWave * ambientWave * 0.16;

				// 2. Interactive hover/touch elevation
				let pointerAct = 0;
				if (isPointerActive && mouseX > -100 && mouseY > -100) {
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
						pointerAct = norm * norm * (3 - 2 * norm);
					}
				}

				// 3. Tap Shockwave Ripples
				let rippleAct = 0;
				for (let rIdx = 0; rIdx < ripples.length; rIdx++) {
					const ripple = ripples[rIdx];
					const elapsed = now - ripple.startTime;
					const progress = elapsed / ripple.duration;
					const currentWaveRadius = progress * ripple.maxRadius;
					const dist = Math.hypot(cell.cx - ripple.x, cell.cy - ripple.y);

					const waveBand = isSmallScreen ? 75 : 95;
					const distToWave = Math.abs(dist - currentWaveRadius);

					if (distToWave < waveBand) {
						const waveFactor = 1 - distToWave / waveBand;
						const envelope = (1 - progress) * (1 - progress);
						const impulse = waveFactor * waveFactor * envelope * ripple.strength;
						if (impulse > rippleAct) {
							rippleAct = impulse;
						}
					}
				}

				const targetAct = Math.max(pointerAct, ambientAct, rippleAct);

				if (targetAct > cell.activation) {
					cell.activation += (targetAct - cell.activation) * (0.22 * dt);
				} else {
					cell.activation += (targetAct - cell.activation) * (0.042 * dt);
				}

				if (cell.activation < 0.015) {
					cell.activation = 0;
					restingCells.push(cell);
				} else {
					activeCells.push(cell);
				}
			}

			// 4. Clear and Render Canvas
			ctx.clearRect(0, 0, width, height);

			// A. Crisp Architectural Resting Grid (Clean blueprint lines)
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
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.085)';
			ctx.lineWidth = 1;
			ctx.stroke();

			// B. Draw Elevated 3D Cells (sorted by Y for natural isometric depth stacking)
			activeCells.sort((a, b) => a.cy - b.cy);

			for (let j = 0; j < activeCells.length; j++) {
				const cell = activeCells[j];
				const act = cell.activation;

				const lift = act * maxLift;
				const scale = 1 + act * 0.05;

				// Dynamic color interpolation: Charcoal Slate -> Warm Champagne Gold
				const r = Math.round(BASE_R + (GOLD_R - BASE_R) * act);
				const g = Math.round(BASE_G + (GOLD_G - BASE_G) * act);
				const b = Math.round(BASE_B + (GOLD_B - BASE_B) * act);

				const strokeAlpha = Math.min(0.88, 0.16 + act * 0.72).toFixed(3);
				const sideAlpha = (act * 0.38).toFixed(3);

				// Compute top (elevated) and base vertices
				const topVerts: [number, number][] = [];
				const baseVerts: [number, number][] = [];

				for (let k = 0; k < 6; k++) {
					const ox = hexCornerOffsets[k][0] * scale;
					const oy = hexCornerOffsets[k][1] * scale;
					topVerts.push([cell.cx + ox, cell.cy - lift + oy]);
					baseVerts.push([cell.cx + hexCornerOffsets[k][0], cell.cy + hexCornerOffsets[k][1]]);
				}

				// 1. Base footprint shadow (ambient occlusion on ground plane)
				if (act > 0.04) {
					const shadowAlpha = ((act - 0.04) * 0.08).toFixed(3);
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

						// Side facet shading with depth
						const facetShade = e === 1 || e === 2 ? 0.05 : 0.03;
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
				if (act > 0.04) {
					const fillAlpha = Math.min(0.14, (act - 0.04) * 0.12).toFixed(3);
					ctx.fillStyle = `rgba(212, 175, 55, ${fillAlpha})`;
					ctx.fill();
				}

				ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${strokeAlpha})`;
				ctx.lineWidth = 1 + act * 0.75;
				ctx.stroke();
			}

			animId = requestAnimationFrame(render);
		}

		animId = requestAnimationFrame(render);

		return () => {
			isRunning = false;
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
			window.removeEventListener('touchstart', handleTouchStart, { capture: true });
			window.removeEventListener('touchmove', handleTouchMove, { capture: true });
			window.removeEventListener('touchend', handleTouchEnd, { capture: true });
			window.removeEventListener('click', handleClick, { capture: true });
			window.removeEventListener('pointerleave', handlePointerLeave);
			document.removeEventListener('mouseleave', handlePointerLeave);
			window.removeEventListener('resize', setupGrid);
			if (animId) {
				cancelAnimationFrame(animId);
			}
		};
	});

	onDestroy(() => {
		if (animId) {
			cancelAnimationFrame(animId);
		}
	});
</script>

<canvas
	bind:this={canvasEl}
	id="honeycomb-canvas"
	class="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full select-none"
	aria-hidden="true"
></canvas>
