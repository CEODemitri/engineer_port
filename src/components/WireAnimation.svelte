<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let containerEl: HTMLDivElement | null = null;
	let p5Instance: any = null;

	interface Wire {
		points: { x: number; y: number }[];
		pulses: { progress: number; speed: number; color: string; size: number }[];
		color: string;
		weight: number;
	}

	onMount(async () => {
		if (typeof window === 'undefined' || !containerEl) return;

		try {
			const p5Module = await import('p5');
			const p5 = p5Module.default || p5Module;

			const sketch = (p: any) => {
				let wires: Wire[] = [];
				let width = 0;
				let height = 0;

				function initWires() {
					wires = [];
					const numWires = 14;
					const palette = ['#39FF14', '#4682B4', '#B76E79', '#000000', '#666666'];

					for (let i = 0; i < numWires; i++) {
						const startX = p.random(0, width * 0.3);
						const startY = p.random(10, height - 10);
						const points: { x: number; y: number }[] = [{ x: startX, y: startY }];

						let currX = startX;
						let currY = startY;
						const segments = p.floor(p.random(3, 6));

						for (let s = 0; s < segments; s++) {
							const dx = p.random(width * 0.15, width * 0.35);
							const dy = p.random(-height * 0.35, height * 0.35);
							currX = p.min(width - 5, currX + dx);
							currY = p.constrain(currY + dy, 8, height - 8);
							points.push({ x: currX, y: currY });
						}

						const pulses = [];
						const numPulses = p.floor(p.random(1, 3));
						for (let k = 0; k < numPulses; k++) {
							pulses.push({
								progress: p.random(0, 1),
								speed: p.random(0.003, 0.009),
								color: palette[p.floor(p.random(0, 3))],
								size: p.random(2.5, 4.5)
							});
						}

						wires.push({
							points,
							pulses,
							color: p.random() > 0.4 ? 'rgba(0, 0, 0, 0.22)' : 'rgba(70, 130, 180, 0.3)',
							weight: p.random(1, 1.8)
						});
					}
				}

				p.setup = () => {
					if (!containerEl) return;
					width = containerEl.clientWidth || 180;
					height = containerEl.clientHeight || 110;
					const canvas = p.createCanvas(width, height);
					canvas.parent(containerEl);
					p.pixelDensity(1);
					initWires();
				};

				p.draw = () => {
					p.background(250, 250, 250);

					// Draw subtle background grid
					p.stroke(230, 230, 230);
					p.strokeWeight(0.5);
					for (let x = 0; x < width; x += 16) {
						p.line(x, 0, x, height);
					}
					for (let y = 0; y < height; y += 16) {
						p.line(0, y, width, y);
					}

					// Draw wires and pulse nodes
					for (const wire of wires) {
						// Render wire path
						p.noFill();
						p.stroke(wire.color);
						p.strokeWeight(wire.weight);
						p.beginShape();
						for (let i = 0; i < wire.points.length; i++) {
							const pt = wire.points[i];
							// Slight dynamic undulation
							const offsetY = p.sin(p.frameCount * 0.03 + i * 1.2) * 1.2;
							p.vertex(pt.x, pt.y + offsetY);
						}
						p.endShape();

						// Draw intersection nodes
						for (let i = 0; i < wire.points.length; i++) {
							const pt = wire.points[i];
							const offsetY = p.sin(p.frameCount * 0.03 + i * 1.2) * 1.2;
							p.fill(0, 0, 0, 40);
							p.noStroke();
							p.circle(pt.x, pt.y + offsetY, 2.5);
						}

						// Render pulses travelling along wire
						for (const pulse of wire.pulses) {
							pulse.progress += pulse.speed;
							if (pulse.progress > 1) pulse.progress = 0;

							// Calculate position along multi-segment wire
							const totalSegments = wire.points.length - 1;
							const exactSeg = pulse.progress * totalSegments;
							const segIndex = p.floor(exactSeg);
							const t = exactSeg - segIndex;

							if (segIndex < totalSegments) {
								const p1 = wire.points[segIndex];
								const p2 = wire.points[segIndex + 1];
								const off1 = p.sin(p.frameCount * 0.03 + segIndex * 1.2) * 1.2;
								const off2 = p.sin(p.frameCount * 0.03 + (segIndex + 1) * 1.2) * 1.2;

								const px = p.lerp(p1.x, p2.x, t);
								const py = p.lerp(p1.y + off1, p2.y + off2, t);

								// Glow halo
								p.fill(pulse.color);
								p.noStroke();
								p.circle(px, py, pulse.size * 1.6);

								// Bright center core
								p.fill(255, 255, 255);
								p.circle(px, py, pulse.size * 0.8);
							}
						}
					}
				};

				p.windowResized = () => {
					if (!containerEl) return;
					width = containerEl.clientWidth || 180;
					height = containerEl.clientHeight || 110;
					p.resizeCanvas(width, height);
					initWires();
				};
			};

			p5Instance = new p5(sketch);
		} catch (err) {
			console.error('Error initializing p5 sketch:', err);
		}
	});

	onDestroy(() => {
		if (p5Instance && typeof p5Instance.remove === 'function') {
			p5Instance.remove();
		}
	});
</script>

<div class="relative w-full h-full min-h-[90px] overflow-hidden flex flex-col justify-between">
	<div bind:this={containerEl} class="absolute inset-0 w-full h-full"></div>

	<!-- Subtle technical caption overlay -->
	<div class="relative z-10 p-2 flex items-center justify-between pointer-events-none">
		<span
			class="font-mono text-[0.55rem] uppercase tracking-wider text-[#000000] font-semibold bg-white/80 px-1 py-0.5 border border-[#E5E5E5]"
		>
			P5 // WIRE MATRIX
		</span>
		<span class="inline-block w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse"></span>
	</div>

	<div class="relative z-10 p-2 text-right pointer-events-none">
		<span class="font-mono text-[0.55rem] text-[#666666] bg-white/70 px-1 py-0.5">
			DATA BUS PULSE
		</span>
	</div>
</div>
