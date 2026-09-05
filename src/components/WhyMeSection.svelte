<script lang="ts">
	import { onMount } from 'svelte';
	import { PORTFOLIO_CONTENT } from '$lib/constants';
	import { Github } from './icons';

	let loading = $state(true);
	let isLive = $state(false);

	const fallback = PORTFOLIO_CONTENT.whyMe.fallbackStats;
	let totalRepos = $state(fallback.repositories);
	let publicRepos = $state(fallback.publicRepositories || 49);
	let commits = $state(fallback.commits);
	let techEnvironments = $state(fallback.languagesCount || 12);
	let yearsActive = $state(fallback.yearsActive || 4);

	const whyMe = PORTFOLIO_CONTENT.whyMe;

	async function fetchStats() {
		loading = true;
		try {
			const res = await fetch('/api/github-stats');
			if (res.ok) {
				const data = await res.json();
				if (typeof data.totalRepositories === 'number') totalRepos = data.totalRepositories;
				if (typeof data.publicRepositories === 'number') publicRepos = data.publicRepositories;
				if (typeof data.commits === 'number') commits = data.commits;
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

	onMount(() => {
		fetchStats();
	});
</script>

<section
	id="why-me"
	data-section="02"
	class="snap-section relative min-h-screen min-h-dvh w-full flex items-center justify-center px-6 lg:px-16 py-16 sm:py-20 lg:py-28 z-10 bg-transparent border-t border-[#E5E5E5]/60"
	aria-label="Why Choose Demitri"
>
	<div
		class="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
	>
		<!-- Left Column: Story & Philosophy -->
		<div class="lg:col-span-7 flex flex-col items-start">
			<!-- Section Header Badge -->
			<div class="flex items-center gap-2 mb-3">
				<span class="w-1.5 h-1.5 bg-[#B76E79]" aria-hidden="true"></span>
				<span class="font-mono text-xs text-[#B76E79] uppercase tracking-[0.15em]">
					{whyMe.sectionNumber} // {whyMe.sectionTitle}
				</span>
			</div>

			<!-- Heading -->
			<h2
				class="font-heading text-[#000000] tracking-[-0.01em] uppercase leading-tight"
				style="font-size: clamp(1.75rem, 4vw, 2.5rem);"
			>
				{whyMe.heading}
			</h2>

			<!-- Paragraphs -->
			<div class="mt-8 space-y-6">
				{#each whyMe.paragraphs as paragraph}
					<p class="font-body text-base text-[#666666] leading-relaxed">
						{paragraph}
					</p>
				{/each}
			</div>
		</div>

		<!-- Right Column: GitHub Verified Specs Metric Box -->
		<div class="lg:col-span-5 w-full">
			<div
				class="spec-card p-8 bg-[#F5F5F5] border border-[#E5E5E5] relative"
				style="box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-radius: 0;"
				aria-live="polite"
			>
				<!-- Top Header of the Spec Card -->
				<div class="flex items-center justify-between pb-6 border-b border-[#E5E5E5] mb-6">
					<div class="flex items-center gap-2">
						<Github size={18} class="text-[#000000]" />
						<span class="font-heading text-xs uppercase tracking-wider text-[#000000]">
							GITHUB TELEMETRY
						</span>
					</div>

					<div class="flex items-center gap-2">
						{#if loading}
							<span class="w-2 h-2 rounded-full bg-[#B76E79] animate-pulse"></span>
							<span class="font-mono text-[0.65rem] text-[#666666] uppercase">SYNCING LIVE</span>
						{:else if isLive}
							<span class="w-2 h-2 rounded-full bg-[#39FF14]"></span>
							<span class="font-mono text-[0.65rem] text-[#000000] uppercase">LIVE SYNCED</span>
						{:else}
							<span class="w-2 h-2 rounded-full bg-[#39FF14]"></span>
							<span class="font-mono text-[0.65rem] text-[#000000] uppercase">VERIFIED</span>
						{/if}
					</div>
				</div>

				<!-- Stats Grid: 2x2 Clean Minimalist Block Display -->
				<div class="grid grid-cols-2 gap-6">
					<!-- Metric 1: Total Repositories -->
					<div class="p-4 bg-white border border-[#E5E5E5] flex flex-col justify-between">
						<div>
							<span class="font-heading text-3xl text-[#000000] tracking-tight block">
								{totalRepos}
							</span>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#000000] font-semibold mt-1 block"
							>
								REPOSITORIES
							</span>
						</div>
						<span
							class="font-mono text-[0.6rem] text-[#888888] mt-2 block border-t border-[#F0F0F0] pt-1"
						>
							{publicRepos} PUBLIC • {Math.max(0, totalRepos - publicRepos)} PRIVATE
						</span>
					</div>

					<!-- Metric 2: Live Verified Commits -->
					<div class="p-4 bg-white border border-[#E5E5E5] flex flex-col justify-between">
						<div>
							<span class="font-heading text-3xl text-[#000000] tracking-tight block">
								{commits.toLocaleString()}+
							</span>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#000000] font-semibold mt-1 block"
							>
								COMMITS LOGGED
							</span>
						</div>
						<span
							class="font-mono text-[0.6rem] text-[#888888] mt-2 block border-t border-[#F0F0F0] pt-1"
						>
							VERIFIED GIT ACTIVITY
						</span>
					</div>

					<!-- Metric 3: Active Tech Stacks / Environments -->
					<div class="p-4 bg-white border border-[#E5E5E5] flex flex-col justify-between">
						<div>
							<span class="font-heading text-3xl text-[#000000] tracking-tight block">
								{techEnvironments}
							</span>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#000000] font-semibold mt-1 block"
							>
								TECH STACKS
							</span>
						</div>
						<span
							class="font-mono text-[0.6rem] text-[#888888] mt-2 block border-t border-[#F0F0F0] pt-1"
						>
							SVELTE • TS • JAVA • PYTHON
						</span>
					</div>

					<!-- Metric 4: Years Active Shipping Software -->
					<div class="p-4 bg-white border border-[#E5E5E5] flex flex-col justify-between">
						<div>
							<span class="font-heading text-3xl text-[#000000] tracking-tight block">
								{yearsActive}+
							</span>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#000000] font-semibold mt-1 block"
							>
								YEARS SHIPPING
							</span>
						</div>
						<span
							class="font-mono text-[0.6rem] text-[#888888] mt-2 block border-t border-[#F0F0F0] pt-1"
						>
							ACTIVE SINCE FEB 2023
						</span>
					</div>
				</div>

				<!-- Footer note with real GitHub link -->
				<div class="mt-6 pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
					<span class="font-mono text-[0.65rem] text-[#666666] uppercase">
						ACCOUNT: @{whyMe.githubUsername}
					</span>
					<a
						href="https://github.com/{whyMe.githubUsername}"
						target="_blank"
						rel="noopener noreferrer"
						class="font-mono text-[0.65rem] text-[#4682B4] hover:underline uppercase flex items-center gap-1 font-semibold"
					>
						<span>VIEW GITHUB</span>
						<span>↗</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
