<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let container: HTMLDivElement | null = null;
	let sketch: any = null;

	onMount(async () => {
		const p5 = (await import('p5')).default;

		sketch = new p5((p) => {
			let rocketY: number;
			let stars: { x: number; y: number; r: number }[] = [];

			p.setup = () => {
				const h = window.innerHeight * 0.4;
				p.createCanvas(window.innerWidth, h).parent(container!);
				rocketY = p.height * 0.7;

				for (let i = 0; i < 120; i++) {
					stars.push({
						x: p.random(p.width),
						y: p.random(p.height),
						r: p.random(1, 2.5)
					});
				}
			};

			p.windowResized = () => {
				p.resizeCanvas(window.innerWidth, window.innerHeight * 0.4);
			};

			p.draw = () => {
				p.background(0);

				// stars
				p.fill(255);
				p.noStroke();
				stars.forEach((s) => p.circle(s.x, s.y, s.r));

				// planet
				p.noFill();
				p.stroke(255);
				p.strokeWeight(2);
				p.circle(p.width * 0.8, p.height * 0.3, 90);

				// rocket
				rocketY -= 0.3;
				if (rocketY < p.height * 0.3) rocketY = p.height * 0.7;

				p.push();
				p.translate(p.width * 0.3, rocketY);

				p.fill(255);
				p.noStroke();
				p.rect(-10, -30, 20, 60, 5);
				p.triangle(-10, -30, 10, -30, 0, -50);
				p.triangle(-10, 20, -25, 35, -10, 35);
				p.triangle(10, 20, 25, 35, 10, 35);

				const flame = p.random(10, 18);
				p.triangle(-8, 30, 8, 30, 0, 30 + flame);

				p.pop();
			};
		});
	});

	onDestroy(() => {
		sketch?.remove();
	});
</script>

<div bind:this={container} class="scene"></div>

<style>
	.scene {
		width: 100vw;
		height: 40vh;
		background: black;
		overflow: hidden;
	}
</style>
