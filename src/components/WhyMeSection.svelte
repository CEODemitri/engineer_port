<script lang="ts">
	import { onMount } from 'svelte';
	import { PORTFOLIO_CONTENT } from '$lib/constants';
	import { Github } from './icons';

	let loading = $state(true);
	let hasError = $state(false);

	let stars = $state(PORTFOLIO_CONTENT.whyMe.fallbackStats.stars);
	let commits = $state(PORTFOLIO_CONTENT.whyMe.fallbackStats.commits);
	let repositories = $state(PORTFOLIO_CONTENT.whyMe.fallbackStats.repositories);
	let followers = $state(PORTFOLIO_CONTENT.whyMe.fallbackStats.followers);

	const whyMe = PORTFOLIO_CONTENT.whyMe;

	onMount(async () => {
		try {
			const username = whyMe.githubUsername;
			const userRes = await fetch(`https://api.github.com/users/${username}`);
			if (userRes.ok) {
				const userData = await userRes.json();
				if (typeof userData.public_repos === 'number') {
					repositories = userData.public_repos;
				}
				if (typeof userData.followers === 'number') {
					followers = userData.followers;
				}

				const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
				if (repoRes.ok) {
					const repoData = await repoRes.json();
					if (Array.isArray(repoData)) {
						const totalStars = repoData.reduce(
							(acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count || 0),
							0
						);
						if (totalStars > 0) {
							stars = totalStars;
						}
					}
				}
			} else {
				hasError = true;
			}
		} catch {
			hasError = true;
		} finally {
			loading = false;
		}
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
							<span class="font-mono text-[0.65rem] text-[#666666] uppercase">SYNCING</span>
						{:else if hasError}
							<span class="w-2 h-2 rounded-full bg-[#666666]"></span>
							<span class="font-mono text-[0.65rem] text-[#666666] uppercase">FALLBACK</span>
						{:else}
							<span class="w-2 h-2 rounded-full bg-[#39FF14]"></span>
							<span class="font-mono text-[0.65rem] text-[#000000] uppercase">VERIFIED</span>
						{/if}
					</div>
				</div>

				<!-- Stats Grid: 2x2 Clean Minimalist Block Display -->
				{#if loading}
					<div
						class="grid grid-cols-2 gap-6 animate-pulse"
						role="status"
						aria-label="Loading GitHub data"
					>
						<div class="p-4 bg-white border border-[#E5E5E5] h-24"></div>
						<div class="p-4 bg-white border border-[#E5E5E5] h-24"></div>
						<div class="p-4 bg-white border border-[#E5E5E5] h-24"></div>
						<div class="p-4 bg-white border border-[#E5E5E5] h-24"></div>
					</div>
				{:else}
					<div class="grid grid-cols-2 gap-6">
						<!-- Metric 1: Public Repos -->
						<div class="p-4 bg-white border border-[#E5E5E5]">
							<span class="font-heading text-3xl text-[#000000] tracking-tight block">
								{repositories}
							</span>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#666666] mt-2 block"
							>
								REPOSITORIES
							</span>
						</div>

						<!-- Metric 2: Estimated Commits -->
						<div class="p-4 bg-white border border-[#E5E5E5]">
							<span class="font-heading text-3xl text-[#000000] tracking-tight block">
								{commits}+
							</span>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#666666] mt-2 block"
							>
								EST. COMMITS
							</span>
						</div>

						<!-- Metric 3: Stars Earned -->
						<div class="p-4 bg-white border border-[#E5E5E5]">
							<span class="font-heading text-3xl text-[#000000] tracking-tight block">
								{stars}
							</span>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#666666] mt-2 block"
							>
								STARS EARNED
							</span>
						</div>

						<!-- Metric 4: Followers / Network -->
						<div class="p-4 bg-white border border-[#E5E5E5]">
							<span class="font-heading text-3xl text-[#000000] tracking-tight block">
								{followers}
							</span>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#666666] mt-2 block"
							>
								NETWORK
							</span>
						</div>
					</div>
				{/if}

				<!-- Footer note with real GitHub link -->
				<div class="mt-6 pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
					<span class="font-mono text-[0.65rem] text-[#999999] uppercase">
						USER: @{whyMe.githubUsername}
					</span>
					<a
						href="https://github.com/{whyMe.githubUsername}"
						target="_blank"
						rel="noopener noreferrer"
						class="font-mono text-[0.65rem] text-[#4682B4] hover:underline uppercase flex items-center gap-1"
					>
						<span>PROFILE</span>
						<span>↗</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
