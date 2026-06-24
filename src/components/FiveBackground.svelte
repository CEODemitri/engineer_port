<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let container: HTMLDivElement | null = null;
	let sketch: any = null;

	onMount(async () => {
		const p5 = (await import('p5')).default;

		sketch = new p5((p: any) => {
			interface Particle {
				x: number;
				y: number;
				vx: number;
				vy: number;
				size: number;
				alpha: number;
				alphaSpeed: number;
				color: [number, number, number];
			}

			const particles: Particle[] = [];
			const PARTICLE_COUNT = 50;
			const CONNECTION_DIST = 90;

			p.setup = () => {
				const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
				canvas.parent(container!);
				canvas.style('position', 'absolute');
				canvas.style('top', '0');
				canvas.style('left', '0');

				for (let i = 0; i < PARTICLE_COUNT; i++) {
					particles.push(createParticle(p));
				}
			};

			function createParticle(p: any): Particle {
				const rand = Math.random();
				let color: [number, number, number];
				if (rand < 0.30) {
					color = [255, 107, 0];   // orange
				} else if (rand < 0.55) {
					color = [255, 208, 0];   // yellow
				} else if (rand < 0.78) {
					color = [0, 102, 255];   // blue
				} else {
					color = [0, 200, 81];    // green
				}
				return {
					x: p.random(p.width),
					y: p.random(p.height),
					vx: p.random(-0.25, 0.25),
					vy: p.random(-0.25, 0.25),
					size: p.random(0.8, 2),
					alpha: p.random(15, 80),
					alphaSpeed: p.random(0.2, 0.5) * (Math.random() > 0.5 ? 1 : -1),
					color
				};
			}

			p.windowResized = () => {
				p.resizeCanvas(window.innerWidth, window.innerHeight);
			};

			p.draw = () => {
				p.clear();

				// Update & draw particles
				for (let i = 0; i < particles.length; i++) {
					const pt = particles[i];

					// Move
					pt.x += pt.vx;
					pt.y += pt.vy;

					// Pulse alpha
					pt.alpha += pt.alphaSpeed;
					if (pt.alpha > 140 || pt.alpha < 10) pt.alphaSpeed *= -1;

					// Wrap edges
					if (pt.x < 0) pt.x = p.width;
					if (pt.x > p.width) pt.x = 0;
					if (pt.y < 0) pt.y = p.height;
					if (pt.y > p.height) pt.y = 0;

					// Draw dot
					const [r, g, b] = pt.color;
					p.noStroke();
					p.fill(r, g, b, pt.alpha);
					p.circle(pt.x, pt.y, pt.size * 2);

					// Draw connections
					for (let j = i + 1; j < particles.length; j++) {
						const other = particles[j];
						const d = p.dist(pt.x, pt.y, other.x, other.y);
						if (d < CONNECTION_DIST) {
							const lineAlpha = p.map(d, 0, CONNECTION_DIST, 50, 0);
							p.stroke(r, g, b, lineAlpha);
							p.strokeWeight(0.4);
							p.line(pt.x, pt.y, other.x, other.y);
						}
					}
				}
			};
		});
	});

	onDestroy(() => {
		sketch?.remove();
	});
</script>

<div bind:this={container} class="particle-scene" aria-hidden="true"></div>

<style>
	.particle-scene {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
