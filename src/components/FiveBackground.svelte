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
			const PARTICLE_COUNT = 80;
			const CONNECTION_DIST = 140;

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
				if (rand < 0.6) {
					color = [0, 212, 255]; // cyan
				} else if (rand < 0.8) {
					color = [200, 210, 240]; // platinum
				} else {
					color = [201, 168, 76]; // gold
				}
				return {
					x: p.random(p.width),
					y: p.random(p.height),
					vx: p.random(-0.3, 0.3),
					vy: p.random(-0.3, 0.3),
					size: p.random(1, 3),
					alpha: p.random(20, 120),
					alphaSpeed: p.random(0.3, 0.8) * (Math.random() > 0.5 ? 1 : -1),
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
