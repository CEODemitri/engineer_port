<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let animId: number = 0;
	let prefersReducedMotion = $state(false);

	// Golden ratio for polyhedra vertices
	const phi = (1 + Math.sqrt(5)) / 2;
	const invPhi = 1 / phi;

	interface Geometry3D {
		vertices: [number, number, number][];
		edges: [number, number][];
		color: string;
		opacity: number;
		scale: number;
		pos: { x: number; y: number; z: number };
		rot: { x: number; y: number; z: number };
		rotSpeed: { x: number; y: number; z: number };
		drift: { speedX: number; speedY: number; phase: number };
	}

	// 1. Icosahedron (12 vertices, 30 edges) - Subtle Charcoal / Black
	const icoVerts: [number, number, number][] = [
		[-1, phi, 0],
		[1, phi, 0],
		[-1, -phi, 0],
		[1, -phi, 0],
		[0, -1, phi],
		[0, 1, phi],
		[0, -1, -phi],
		[0, 1, -phi],
		[phi, 0, -1],
		[phi, 0, 1],
		[-phi, 0, -1],
		[-phi, 0, 1]
	];
	const icoEdges: [number, number][] = [];
	for (let i = 0; i < icoVerts.length; i++) {
		for (let j = i + 1; j < icoVerts.length; j++) {
			const d = Math.hypot(
				icoVerts[i][0] - icoVerts[j][0],
				icoVerts[i][1] - icoVerts[j][1],
				icoVerts[i][2] - icoVerts[j][2]
			);
			if (Math.abs(d - 2) < 0.15) {
				icoEdges.push([i, j]);
			}
		}
	}

	// 2. Torus Ring (16 segments x 6 radial points) - Steel Blue #4682B4
	const torusVerts: [number, number, number][] = [];
	const torusEdges: [number, number][] = [];
	const majorR = 1.6;
	const minorR = 0.65;
	const uSteps = 12;
	const vSteps = 6;
	for (let u = 0; u < uSteps; u++) {
		const theta = (u / uSteps) * Math.PI * 2;
		for (let v = 0; v < vSteps; v++) {
			const phiAngle = (v / vSteps) * Math.PI * 2;
			const x = (majorR + minorR * Math.cos(phiAngle)) * Math.cos(theta);
			const y = (majorR + minorR * Math.cos(phiAngle)) * Math.sin(theta);
			const z = minorR * Math.sin(phiAngle);
			torusVerts.push([x, y, z]);

			const curr = u * vSteps + v;
			const nextV = u * vSteps + ((v + 1) % vSteps);
			const nextU = ((u + 1) % uSteps) * vSteps + v;
			torusEdges.push([curr, nextV]);
			torusEdges.push([curr, nextU]);
		}
	}

	// 3. Octahedron (6 vertices, 12 edges) - Electric Green #39FF14
	const octVerts: [number, number, number][] = [
		[1.6, 0, 0],
		[-1.6, 0, 0],
		[0, 1.6, 0],
		[0, -1.6, 0],
		[0, 0, 1.6],
		[0, 0, -1.6]
	];
	const octEdges: [number, number][] = [];
	for (let i = 0; i < octVerts.length; i++) {
		for (let j = i + 1; j < octVerts.length; j++) {
			const d = Math.hypot(
				octVerts[i][0] - octVerts[j][0],
				octVerts[i][1] - octVerts[j][1],
				octVerts[i][2] - octVerts[j][2]
			);
			if (d > 0.1 && d < 2.5) {
				octEdges.push([i, j]);
			}
		}
	}

	// 4. Dodecahedron (20 vertices, 30 edges) - Rose Gold #B76E79
	const dodVerts: [number, number, number][] = [];
	for (const x of [-1, 1]) {
		for (const y of [-1, 1]) {
			for (const z of [-1, 1]) {
				dodVerts.push([x, y, z]);
			}
		}
	}
	for (const y of [-invPhi, invPhi]) {
		for (const z of [-phi, phi]) {
			dodVerts.push([0, y, z]);
		}
	}
	for (const x of [-invPhi, invPhi]) {
		for (const y of [-phi, phi]) {
			dodVerts.push([x, y, 0]);
		}
	}
	for (const x of [-phi, phi]) {
		for (const z of [-invPhi, invPhi]) {
			dodVerts.push([x, 0, z]);
		}
	}
	const dodEdges: [number, number][] = [];
	const edgeLen = 2 * invPhi;
	for (let i = 0; i < dodVerts.length; i++) {
		for (let j = i + 1; j < dodVerts.length; j++) {
			const d = Math.hypot(
				dodVerts[i][0] - dodVerts[j][0],
				dodVerts[i][1] - dodVerts[j][1],
				dodVerts[i][2] - dodVerts[j][2]
			);
			if (Math.abs(d - edgeLen) < 0.15) {
				dodEdges.push([i, j]);
			}
		}
	}

	onMount(() => {
		if (typeof window === 'undefined') return;

		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const canvas = document.getElementById('three-canvas') as HTMLCanvasElement | null;
		if (!canvas) return;

		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		let scrollY = window.scrollY;
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		const handleResize = () => {
			if (!canvas) return;
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};
		window.addEventListener('resize', handleResize);

		const isMobile = width < 640;

		const objects: Geometry3D[] = [
			{
				vertices: icoVerts,
				edges: icoEdges,
				color: '#000000',
				opacity: isMobile ? 0.05 : 0.09,
				scale: isMobile ? 38 : 64,
				pos: { x: -0.32, y: -0.28, z: 0 },
				rot: { x: 0.3, y: 0.2, z: 0 },
				rotSpeed: { x: 0.003, y: 0.004, z: 0.001 },
				drift: { speedX: 0.0008, speedY: 0.0006, phase: 0 }
			},
			{
				vertices: torusVerts,
				edges: torusEdges,
				color: '#4682B4',
				opacity: isMobile ? 0.05 : 0.09,
				scale: isMobile ? 34 : 58,
				pos: { x: 0.34, y: -0.22, z: 0 },
				rot: { x: 0.5, y: -0.3, z: 0.2 },
				rotSpeed: { x: -0.0025, y: 0.0035, z: 0.002 },
				drift: { speedX: 0.0006, speedY: 0.0009, phase: 1.5 }
			},
			{
				vertices: octVerts,
				edges: octEdges,
				color: '#39FF14',
				opacity: isMobile ? 0.04 : 0.08,
				scale: isMobile ? 32 : 55,
				pos: { x: -0.26, y: 0.3, z: 0 },
				rot: { x: -0.4, y: 0.5, z: 0.1 },
				rotSpeed: { x: 0.004, y: -0.003, z: 0.0015 },
				drift: { speedX: 0.0009, speedY: 0.0007, phase: 3.0 }
			},
			{
				vertices: dodVerts,
				edges: dodEdges,
				color: '#B76E79',
				opacity: isMobile ? 0.05 : 0.09,
				scale: isMobile ? 36 : 60,
				pos: { x: 0.3, y: 0.28, z: 0 },
				rot: { x: 0.2, y: -0.4, z: -0.2 },
				rotSpeed: { x: -0.003, y: 0.0025, z: -0.002 },
				drift: { speedX: 0.0007, speedY: 0.0008, phase: 4.5 }
			}
		];

		let lastTime = performance.now();
		let isRunning = true;

		function render(now: number) {
			if (!ctx || !isRunning) return;
			const dt = Math.min((now - lastTime) / 16.666, 2.5);
			lastTime = now;

			ctx.clearRect(0, 0, width, height);

			const totalScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
			const scrollProgress = scrollY / totalScroll;
			const scrollRotation = scrollProgress * Math.PI * 0.8;

			const cx = width / 2;
			const cy = height / 2;
			const fov = 400;

			for (let i = 0; i < objects.length; i++) {
				const obj = objects[i];

				// Update continuous rotation + scroll influence
				obj.rot.x += obj.rotSpeed.x * dt;
				obj.rot.y += obj.rotSpeed.y * dt;
				obj.rot.z += obj.rotSpeed.z * dt;

				const rx = obj.rot.x;
				const ry = obj.rot.y + (i % 2 === 0 ? scrollRotation : -scrollRotation);
				const rz = obj.rot.z;

				const cosX = Math.cos(rx);
				const sinX = Math.sin(rx);
				const cosY = Math.cos(ry);
				const sinY = Math.sin(ry);
				const cosZ = Math.cos(rz);
				const sinZ = Math.sin(rz);

				// Subtle floating orbital drift
				const driftX = Math.sin(now * 0.0006 * obj.drift.speedX + obj.drift.phase) * 20;
				const driftY = Math.cos(now * 0.0006 * obj.drift.speedY + obj.drift.phase) * 20;

				const centerX = cx + obj.pos.x * width + driftX;
				const centerY = cy + obj.pos.y * height + driftY;

				// Transform and project all vertices
				const projected: [number, number][] = [];
				for (let v = 0; v < obj.vertices.length; v++) {
					const [vx, vy, vz] = obj.vertices[v];
					const sx = vx * obj.scale;
					const sy = vy * obj.scale;
					const sz = vz * obj.scale;

					// 3D Matrix Rotation (Euler XYZ)
					const y1 = sy * cosX - sz * sinX;
					const z1 = sy * sinX + sz * cosX;

					const x2 = sx * cosY + z1 * sinY;
					const z2 = -sx * sinY + z1 * cosY;

					const x3 = x2 * cosZ - y1 * sinZ;
					const y3 = x2 * sinZ + y1 * cosZ;
					const z3 = z2;

					// Perspective projection
					const distance = fov + z3;
					const scaleFactor = distance > 0 ? fov / distance : 1;

					const px = centerX + x3 * scaleFactor;
					const py = centerY + y3 * scaleFactor;

					projected.push([px, py]);
				}

				// Draw wireframe edges
				ctx.save();
				ctx.strokeStyle = obj.color;
				ctx.globalAlpha = obj.opacity;
				ctx.lineWidth = 1;
				ctx.beginPath();

				for (let e = 0; e < obj.edges.length; e++) {
					const [p1Idx, p2Idx] = obj.edges[e];
					const p1 = projected[p1Idx];
					const p2 = projected[p2Idx];
					if (p1 && p2) {
						ctx.moveTo(p1[0], p1[1]);
						ctx.lineTo(p2[0], p2[1]);
					}
				}

				ctx.stroke();
				ctx.restore();
			}

			animId = requestAnimationFrame(render);
		}

		animId = requestAnimationFrame(render);

		return () => {
			isRunning = false;
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
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

{#if !prefersReducedMotion}
	<canvas
		id="three-canvas"
		class="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
		aria-hidden="true"
	></canvas>
{/if}
