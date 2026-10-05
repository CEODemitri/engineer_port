<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { PORTFOLIO_CONTENT } from '$lib/constants';
	import { Github } from './icons';

	let loading = $state(true);
	let isLive = $state(false);

	const fallback = PORTFOLIO_CONTENT.whyMe.fallbackStats;
	let totalRepos = $state(fallback.repositories);
	let techEnvironments = $state(fallback.languagesCount || 12);
	let yearsActive = $state(fallback.yearsActive || 4);

	const whyMe = PORTFOLIO_CONTENT.whyMe;

	let wireframeCanvas = $state<HTMLCanvasElement | null>(null);
	let cleanupWireframe: (() => void) | null = null;

	async function fetchStats() {
		loading = true;
		try {
			const res = await fetch('/api/github-stats');
			if (res.ok) {
				const data = await res.json();
				if (typeof data.totalRepositories === 'number') totalRepos = data.totalRepositories;
				if (typeof data.languagesCount === 'number') techEnvironments = data.languagesCount;
				if (typeof data.yearsActive === 'number') yearsActive = data.yearsActive;
				isLive = true;
			}
		} catch (err) {
			console.warn('Could not sync live stats, using verified telemetry cache:', err);
		} finally {
			loading = false;
		}
	}

	function initWireframeAnimation() {
		if (!wireframeCanvas) return;
		const canvas = wireframeCanvas;
		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		let w = 0;
		let h = 0;
		let animId = 0;
		let isRunning = true;

		let resizeObserver: ResizeObserver | null = null;
		const resize = () => {
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
			w = canvas.width = Math.round((rect.width || 160) * dpr);
			h = canvas.height = Math.round((rect.height || 140) * dpr);
		};
		resize();

		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => {
				resize();
			});
			resizeObserver.observe(canvas);
		}
		window.addEventListener('resize', resize);

		const phi = (1 + Math.sqrt(5)) / 2;
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

		const octVerts: [number, number, number][] = [
			[1.2, 0, 0],
			[-1.2, 0, 0],
			[0, 1.2, 0],
			[0, -1.2, 0],
			[0, 0, 1.2],
			[0, 0, -1.2]
		];
		const octEdges: [number, number][] = [
			[0, 2],
			[0, 3],
			[0, 4],
			[0, 5],
			[1, 2],
			[1, 3],
			[1, 4],
			[1, 5],
			[2, 4],
			[4, 3],
			[3, 5],
			[5, 2]
		];

		let rotX = 0.2;
		let rotY = 0.4;
		let rotZ = 0.1;
		let lastTime = performance.now();

		function render(now: number) {
			if (!ctx || !isRunning || !canvas) return;
			const dt = Math.min((now - lastTime) / 16.666, 2.5);
			lastTime = now;

			rotX += 0.006 * dt;
			rotY += 0.009 * dt;
			rotZ += 0.004 * dt;

			ctx.clearRect(0, 0, w, h);

			const cx = w / 2;
			const cy = h / 2;
			const minDim = Math.min(w, h);
			const scale = minDim * 0.44;
			const fov = 380;

			const cosX = Math.cos(rotX);
			const sinX = Math.sin(rotX);
			const cosY = Math.cos(rotY);
			const sinY = Math.sin(rotY);
			const cosZ = Math.cos(rotZ);
			const sinZ = Math.sin(rotZ);

			function projectAndDraw(
				verts: [number, number, number][],
				edges: [number, number][],
				strokeColor: string,
				alpha: number,
				lineWidth: number
			) {
				if (!ctx) return;
				const projected: [number, number][] = [];
				for (let i = 0; i < verts.length; i++) {
					const [vx, vy, vz] = verts[i];
					const sx = vx * scale;
					const sy = vy * scale;
					const sz = vz * scale;

					const y1 = sy * cosX - sz * sinX;
					const z1 = sy * sinX + sz * cosX;
					const x2 = sx * cosY + z1 * sinY;
					const z2 = -sx * sinY + z1 * cosY;
					const x3 = x2 * cosZ - y1 * sinZ;
					const y3 = x2 * sinZ + y1 * cosZ;

					const distance = fov + z2;
					const factor = distance > 0 ? fov / distance : 1;
					projected.push([cx + x3 * factor, cy + y3 * factor]);
				}

				ctx.save();
				ctx.strokeStyle = strokeColor;
				ctx.globalAlpha = alpha;
				ctx.lineWidth = lineWidth;
				ctx.beginPath();
				for (let e = 0; e < edges.length; e++) {
					const [i1, i2] = edges[e];
					const p1 = projected[i1];
					const p2 = projected[i2];
					if (p1 && p2) {
						ctx.moveTo(p1[0], p1[1]);
						ctx.lineTo(p2[0], p2[1]);
					}
				}
				ctx.stroke();
				ctx.restore();
			}

			// Shadowy light-grey rotating 3D wireframe polyhedra
			projectAndDraw(icoVerts, icoEdges, '#444444', 0.32, 1.2);
			projectAndDraw(octVerts, octEdges, '#777777', 0.22, 1.0);

			animId = requestAnimationFrame(render);
		}

		animId = requestAnimationFrame(render);

		return () => {
			isRunning = false;
			if (resizeObserver) resizeObserver.disconnect();
			window.removeEventListener('resize', resize);
			if (animId) cancelAnimationFrame(animId);
		};
	}

	onMount(() => {
		fetchStats();
		cleanupWireframe = initWireframeAnimation() || null;
	});

	onDestroy(() => {
		if (cleanupWireframe) {
			cleanupWireframe();
		}
	});
</script>

<section
	id="why-me"
	data-section="02"
	class="snap-section relative z-10 flex min-h-screen min-h-dvh w-full items-center justify-center border-t border-[#E5E5E5]/60 bg-transparent px-6 py-16 sm:py-20 lg:px-16 lg:py-28"
	aria-label="Why Choose Demitri"
>
	<div
		class="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
	>
		<!-- Left Column: Story & Philosophy -->
		<div class="flex flex-col items-start lg:col-span-7">
			<!-- Section Header Badge -->
			<div class="mb-3 flex items-center gap-2">
				<span class="h-1.5 w-1.5 bg-[#B76E79]" aria-hidden="true"></span>
				<span class="font-mono text-xs uppercase tracking-[0.15em] text-[#B76E79]">
					{whyMe.sectionNumber} // {whyMe.sectionTitle}
				</span>
			</div>

			<!-- Heading -->
			<h2
				class="font-heading uppercase leading-tight tracking-[-0.01em] text-[#000000]"
				style="font-size: clamp(1.75rem, 4vw, 2.5rem);"
			>
				{whyMe.heading}
			</h2>

			<!-- Paragraphs -->
			<div class="mt-8 space-y-6">
				{#each whyMe.paragraphs as paragraph}
					<p class="font-body text-base leading-relaxed text-[#666666]">
						{paragraph}
					</p>
				{/each}
			</div>
		</div>

		<!-- Right Column: GitHub Verified Specs Metric Box -->
		<div class="w-full lg:col-span-5">
			<div
				class="spec-card relative border border-[#E5E5E5] bg-[#F5F5F5] p-8"
				style="box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-radius: 0;"
				aria-live="polite"
			>
				<!-- Top Header of the Spec Card -->
				<div class="mb-6 flex items-center justify-between border-b border-[#E5E5E5] pb-6">
					<div class="flex items-center gap-2">
						<Github size={18} class="text-[#000000]" />
						<span class="font-heading text-xs uppercase tracking-wider text-[#000000]">
							GITHUB
						</span>
					</div>

					<div class="flex items-center gap-2">
						{#if loading}
							<span class="h-2 w-2 animate-pulse rounded-full bg-[#B76E79]"></span>
							<span class="font-mono text-[0.65rem] uppercase text-[#666666]">SYNCING LIVE</span>
						{:else if isLive}
							<span class="h-2 w-2 rounded-full bg-[#39FF14]"></span>
							<span class="font-mono text-[0.65rem] uppercase text-[#000000]">LIVE SYNCED</span>
						{:else}
							<span class="h-2 w-2 rounded-full bg-[#39FF14]"></span>
							<span class="font-mono text-[0.65rem] uppercase text-[#000000]">VERIFIED</span>
						{/if}
					</div>
				</div>

				<!-- Stats Grid: 2x2 Clean Minimalist Block Display -->
				<div class="grid grid-cols-2 gap-6 auto-rows-fr">
					<!-- Metric 1: Total Repositories -->
					<div
						class="flex flex-col justify-between border border-[#E5E5E5] p-4 h-full"
						style="background-color: #b8b8b8;"
					>
						<div>
							<span
								id="metric-repositories-count"
								class="font-heading block text-3xl tracking-tight text-[#000000]"
							>
								{totalRepos}
							</span>
							<span
								class="font-mono mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#000000]"
							>
								REPOSITORIES
							</span>
						</div>
						<span
							class="font-mono mt-2 block border-t border-[#F0F0F0] pt-1 text-[0.6rem]"
							style="color: #ffffff;"
						>
							2500+ commits
						</span>
					</div>

					<!-- Metric 2: 3D Wireframe Animation (No pill, no label, shadowy light grey wireframe filling entire space) -->
					<div
						class="relative flex h-full w-full items-center justify-center overflow-hidden border border-[#E5E5E5] bg-white p-0"
					>
						<canvas
							bind:this={wireframeCanvas}
							class="absolute inset-0 block h-full w-full"
							aria-hidden="true"
						></canvas>
					</div>

					<!-- Metric 3: Active Tech Stacks / Environments -->
					<div class="flex flex-col justify-between border border-[#E5E5E5] bg-white p-4 h-full">
						<div>
							<span
								id="metric-tech-stacks-count"
								class="font-heading block text-3xl tracking-tight text-[#000000]"
							>
								{techEnvironments}
							</span>
							<span
								class="font-mono mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#000000]"
							>
								TECH STACKS
							</span>
						</div>
						<span
							class="font-mono mt-2 block border-t border-[#F0F0F0] pt-1 text-[0.6rem] text-[#888888]"
						>
							SVELTE • TS • JAVA • PYTHON
						</span>
					</div>

					<!-- Metric 4: Years Active Shipping Software -->
					<div class="flex flex-col justify-between border border-[#E5E5E5] bg-white p-4 h-full">
						<div>
							<span
								id="metric-years-active-count"
								class="font-heading block text-3xl tracking-tight text-[#000000]"
							>
								{yearsActive}+
							</span>
							<span
								class="font-mono mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#000000]"
							>
								YEARS SHIPPING
							</span>
						</div>
						<span
							class="font-mono mt-2 block border-t border-[#F0F0F0] pt-1 text-[0.6rem] text-[#888888]"
						>
							ACTIVE SINCE FEB 2023
						</span>
					</div>
				</div>

				<!-- Footer note with real GitHub link -->
				<div class="mt-6 flex items-center justify-between border-t border-[#E5E5E5] pt-4">
					<span class="font-mono text-[0.65rem] uppercase text-[#666666]">
						ACCOUNT: @{whyMe.githubUsername}
					</span>
					<a
						href="https://github.com/{whyMe.githubUsername}"
						target="_blank"
						rel="noopener noreferrer"
						class="font-mono flex items-center gap-1 text-[0.65rem] font-semibold uppercase text-[#4682B4] hover:underline"
					>
						<span>VIEW GITHUB</span>
						<span>↗</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
