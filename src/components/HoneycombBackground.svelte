<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface HexCell {
		col: number;
		row: number;
		cx: number;
		cy: number;
		activation: number;
		centerLift: number;
	}

	interface TouchPoint {
		id: number | string;
		x: number;
		y: number;
		isActive: boolean;
		startTime: number;
		releaseTime: number;
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

	// Hexagon dimensions — matching preloader scale
	const R_DESKTOP = 48; // Circumscribed radius (~83.1px wide hexagons)
	const R_MOBILE = 42; // Mobile viewport density

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
		if (prefersReducedMotion) return;

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
						activation: 0,
						centerLift: 0
					});
				}
			}
		}

		// Active touch / pointer tracking
		const activeTouches: Record<string, TouchPoint> = {};
		const ripples: TapRipple[] = [];
		let nextRippleId = 1;
		let lastTapTime = 0;
		let lastTapX = -9999;
		let lastTapY = -9999;

		function spawnRipple(x: number, y: number, isStrong: boolean = true) {
			const now = performance.now();
			const isSmallScreen = width < 768;
			const maxRadius = isSmallScreen ? 300 : 400;
			const duration = isSmallScreen ? 900 : 1050;
			const strength = isStrong ? 1.0 : 0.85;

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
		}

		function handleTouchDown(id: number | string, x: number, y: number) {
			const key = String(id);
			const now = performance.now();

			// Debounce duplicate events at identical positions
			if (now - lastTapTime < 50 && Math.hypot(x - lastTapX, y - lastTapY) < 25) {
				return;
			}
			lastTapTime = now;
			lastTapX = x;
			lastTapY = y;

			activeTouches[key] = {
				id: key,
				x,
				y,
				isActive: true,
				startTime: now,
				releaseTime: 0
			};

			// Spawn expanding ripple
			spawnRipple(x, y, true);
		}

		function handleTouchMovePos(id: number | string, x: number, y: number) {
			const key = String(id);
			const touch = activeTouches[key];
			if (touch) {
				const movedDist = Math.hypot(x - touch.x, y - touch.y);
				touch.x = x;
				touch.y = y;
				if (movedDist > 40) {
					spawnRipple(x, y, false);
				}
			} else {
				activeTouches[key] = {
					id: key,
					x,
					y,
					isActive: true,
					startTime: performance.now(),
					releaseTime: 0
				};
				spawnRipple(x, y, false);
			}
		}

		function handleTouchUp(id: number | string, x?: number, y?: number) {
			const key = String(id);
			const touch = activeTouches[key];
			if (touch) {
				touch.isActive = false;
				touch.releaseTime = performance.now();
				if (x !== undefined && y !== undefined) {
					touch.x = x;
					touch.y = y;
				}
			}
		}

		// Touch Event Listeners
		function onTouchStart(e: TouchEvent) {
			for (let i = 0; i < e.changedTouches.length; i++) {
				const t = e.changedTouches[i];
				handleTouchDown(t.identifier, t.clientX, t.clientY);
			}
		}

		function onTouchMove(e: TouchEvent) {
			for (let i = 0; i < e.changedTouches.length; i++) {
				const t = e.changedTouches[i];
				handleTouchMovePos(t.identifier, t.clientX, t.clientY);
			}
		}

		function onTouchEnd(e: TouchEvent) {
			for (let i = 0; i < e.changedTouches.length; i++) {
				const t = e.changedTouches[i];
				handleTouchUp(t.identifier, t.clientX, t.clientY);
			}
		}

		// Pointer & Mouse Listeners
		function onPointerDown(e: PointerEvent) {
			if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
				handleTouchDown(`pointer-${e.pointerId}`, e.clientX, e.clientY);
			}
		}

		function onPointerMove(e: PointerEvent) {
			if (e.pointerType === 'mouse' && e.buttons > 0) {
				handleTouchMovePos(`pointer-${e.pointerId}`, e.clientX, e.clientY);
			}
		}

		function onPointerUp(e: PointerEvent) {
			if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
				handleTouchUp(`pointer-${e.pointerId}`, e.clientX, e.clientY);
			}
		}

		function onClick(e: MouseEvent) {
			handleTouchDown(`click-${Date.now()}`, e.clientX, e.clientY);
			setTimeout(() => {
				handleTouchUp(`click-${Date.now()}`);
			}, 120);
		}

		// Window event listeners with capture phase
		window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
		window.addEventListener('touchmove', onTouchMove, { passive: true, capture: true });
		window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
		window.addEventListener('touchcancel', onTouchEnd, { passive: true, capture: true });

		window.addEventListener('pointerdown', onPointerDown, { passive: true, capture: true });
		window.addEventListener('pointermove', onPointerMove, { passive: true, capture: true });
		window.addEventListener('pointerup', onPointerUp, { passive: true, capture: true });
		window.addEventListener('pointercancel', onPointerUp, { passive: true, capture: true });
		window.addEventListener('click', onClick, { passive: true, capture: true });

		window.addEventListener('resize', setupGrid);
		setupGrid();

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
		const maxLift = 24; // 3D elevation in pixels

		function render(now: number) {
			if (!ctx || !isRunning) return;

			const dt = Math.min((now - lastTime) / 16.666, 2.5);
			lastTime = now;

			const isSmallScreen = width < 768;
			const touchRadius = isSmallScreen ? 130 : 170;

			// Clean expired touches (released over 800ms ago)
			for (const [id, touch] of Object.entries(activeTouches)) {
				if (!touch.isActive && now - touch.releaseTime > 800) {
					delete activeTouches[id];
				}
			}

			// Clean expired ripples
			for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
				if (now - ripples[rIdx].startTime > ripples[rIdx].duration) {
					ripples.splice(rIdx, 1);
				}
			}

			const activeCells: HexCell[] = [];
			const touchesList = Object.values(activeTouches);

			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];

				// 1. Center Point Rising & Deflating Physics
				// While finger/pointer is held: center point rises quickly.
				// Once finger/pointer is released or after tap impact: center point deflates smoothly back down.
				let maxCenterTarget = 0;
				for (let tIdx = 0; tIdx < touchesList.length; tIdx++) {
					const touch = touchesList[tIdx];
					const dist = Math.hypot(cell.cx - touch.x, cell.cy - touch.y);
					if (dist < touchRadius) {
						const norm = 1 - dist / touchRadius;
						const profile = norm * norm * (3 - 2 * norm); // Smooth bell dome

						if (touch.isActive) {
							// Active touch held down: rises towards peak
							const heldDuration = now - touch.startTime;
							// Peak rise within 200ms, then subtle deflation settle
							const riseFactor = Math.min(1.0, heldDuration / 180);
							const deflationSettle =
								heldDuration > 300 ? Math.max(0.45, 1.0 - (heldDuration - 300) * 0.0012) : 1.0;
							const lift = profile * riseFactor * deflationSettle;
							if (lift > maxCenterTarget) maxCenterTarget = lift;
						} else {
							// Released touch: deflates smoothly to zero
							const timeSinceRelease = now - touch.releaseTime;
							const releaseFade = Math.max(0, 1 - timeSinceRelease / 450);
							const lift = profile * releaseFade * releaseFade;
							if (lift > maxCenterTarget) maxCenterTarget = lift;
						}
					}
				}

				// Center lift physics
				if (maxCenterTarget > cell.centerLift) {
					cell.centerLift += (maxCenterTarget - cell.centerLift) * (0.42 * dt);
				} else {
					cell.centerLift += (maxCenterTarget - cell.centerLift) * (0.16 * dt);
				}
				if (cell.centerLift < 0.01) cell.centerLift = 0;

				// 2. Propagating Ripple Waves Outward from Center
				let rippleAct = 0;
				for (let rIdx = 0; rIdx < ripples.length; rIdx++) {
					const ripple = ripples[rIdx];
					const elapsed = now - ripple.startTime;
					const progress = Math.min(1.0, elapsed / ripple.duration);
					const currentWaveRadius = progress * ripple.maxRadius;
					const dist = Math.hypot(cell.cx - ripple.x, cell.cy - ripple.y);

					const waveBand = isSmallScreen ? 70 : 90;
					const distToWave = Math.abs(dist - currentWaveRadius);

					if (distToWave < waveBand && progress < 1.0) {
						const waveFactor = 1 - distToWave / waveBand;
						// Quadratic fadeout as ripple travels outward, reaching zero at end of animation
						const envelope = Math.pow(1 - progress, 2.2);
						const impulse = waveFactor * waveFactor * envelope * ripple.strength;
						if (impulse > rippleAct) {
							rippleAct = impulse;
						}
					}
				}

				// Target activation combines center rise/deflate and propagating ripple
				const targetAct = Math.max(cell.centerLift, rippleAct);

				if (targetAct > cell.activation) {
					cell.activation += (targetAct - cell.activation) * (0.45 * dt);
				} else {
					// Graceful and complete fade-away decay
					cell.activation += (targetAct - cell.activation) * (0.12 * dt);
				}

				if (cell.activation < 0.02) {
					cell.activation = 0;
				} else {
					activeCells.push(cell);
				}
			}

			// Clear entire canvas (100% transparent when idle / no active cells)
			ctx.clearRect(0, 0, width, height);

			// Render ONLY active/elevated hexagons — completely fades away to transparent
			if (activeCells.length > 0) {
				// Sort by Y for isometric depth stacking
				activeCells.sort((a, b) => a.cy - b.cy);

				for (let j = 0; j < activeCells.length; j++) {
					const cell = activeCells[j];
					const act = cell.activation;
					const fadeFactor = Math.min(1.0, Math.max(0, (act - 0.02) / 0.98));

					const lift = fadeFactor * maxLift;
					const scale = 1 + fadeFactor * 0.05;

					// Dynamic color: Slate Charcoal -> Warm Champagne Gold
					const r = Math.round(BASE_R + (GOLD_R - BASE_R) * fadeFactor);
					const g = Math.round(BASE_G + (GOLD_G - BASE_G) * fadeFactor);
					const b = Math.round(BASE_B + (GOLD_B - BASE_B) * fadeFactor);

					const strokeAlpha = (Math.pow(fadeFactor, 1.25) * 0.9).toFixed(3);
					const sideAlpha = (Math.pow(fadeFactor, 1.45) * 0.42).toFixed(3);

					const topVerts: [number, number][] = [];
					const baseVerts: [number, number][] = [];

					for (let k = 0; k < 6; k++) {
						const ox = hexCornerOffsets[k][0] * scale;
						const oy = hexCornerOffsets[k][1] * scale;
						topVerts.push([cell.cx + ox, cell.cy - lift + oy]);
						baseVerts.push([cell.cx + hexCornerOffsets[k][0], cell.cy + hexCornerOffsets[k][1]]);
					}

					// 1. Base footprint shadow (ambient occlusion on ground plane)
					if (fadeFactor > 0.08) {
						const shadowAlpha = ((fadeFactor - 0.08) * 0.09).toFixed(3);
						ctx.beginPath();
						for (let k = 0; k < 6; k++) {
							if (k === 0) ctx.moveTo(baseVerts[k][0], baseVerts[k][1]);
							else ctx.lineTo(baseVerts[k][0], baseVerts[k][1]);
						}
						ctx.closePath();
						ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
						ctx.fill();
					}

					// 2. Extruded 3D Side Walls
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

							const facetShade = e === 1 || e === 2 ? 0.06 : 0.035;
							ctx.fillStyle = `rgba(160, 168, 180, ${(fadeFactor * facetShade).toFixed(3)})`;
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

					// Warm champagne gold wash on elevated surface
					if (fadeFactor > 0.06) {
						const fillAlpha = Math.min(0.16, (fadeFactor - 0.06) * 0.16).toFixed(3);
						ctx.fillStyle = `rgba(212, 175, 55, ${fillAlpha})`;
						ctx.fill();
					}

					ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${strokeAlpha})`;
					ctx.lineWidth = 1 + fadeFactor * 0.75;
					ctx.stroke();
				}
			}

			animId = requestAnimationFrame(render);
		}

		animId = requestAnimationFrame(render);

		return () => {
			isRunning = false;
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
			window.removeEventListener('touchcancel', onTouchEnd);
			window.removeEventListener('pointerdown', onPointerDown);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerup', onPointerUp);
			window.removeEventListener('pointercancel', onPointerUp);
			window.removeEventListener('click', onClick);
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
