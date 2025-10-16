<script lang="ts">
	import P5 from 'p5-svelte';
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	let canvasWidth = 0;
	let canvasHeight = 0;

	const setCanvasSize = () => {
		if (container) {
			canvasWidth = container.clientWidth;
			canvasHeight = container.clientHeight;
		}
	};

	onMount(() => {
		setCanvasSize();
		window.addEventListener('resize', setCanvasSize);
		return () => window.removeEventListener('resize', setCanvasSize);
	});

	import type p5 from 'p5';

	const sketch = (p: p5) => {
		let x = 0;
		let y = 0;
		let baseSize = 80;

		p.setup = () => {
			p.createCanvas(canvasWidth, canvasHeight);
		};

		p.windowResized = () => {
			p.resizeCanvas(container.clientWidth, container.clientHeight);
		};

		p.draw = () => {
			// Background color based on position – purple to blue
			const hue = p.map(x, 0, p.width, 250, 280); // blue to purple
			const sat = p.map(y, 0, p.height, 60, 100);
			p.colorMode(p.HSL, 360, 100, 100);
			p.background(hue, sat, 40);

			// Ease the circle toward the mouse/finger
			let targetX = p.mouseX || x;
			let targetY = p.mouseY || y;
			x += (targetX - x) * 0.1;
			y += (targetY - y) * 0.1;

			// Draw the ball
			p.fill(300, 80, 80); // soft pinkish-purple
			p.noStroke();
			p.ellipse(x, y, baseSize, baseSize);
		};

		p.touchMoved = () => {
			x = p.mouseX;
			y = p.mouseY;
			return false;
		};
	};
</script>

<div class="p5-container" bind:this={container}>
	{#if canvasWidth && canvasHeight}
		<P5 {sketch} />
	{/if}
</div>

<style>
	.p5-container {
		width: 100%;
		height: 100vh;
		touch-action: none;
		overflow: hidden;
		border-radius: 20px; /* Rounded corners */
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	}
</style>
