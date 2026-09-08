<script lang="ts">
	import { PORTFOLIO_CONTENT } from '$lib/constants';
	import { ExternalLink, Github } from './icons';

	let expandedProjectId = $state<number | null>(null);

	const skills = PORTFOLIO_CONTENT.skills;
	const projects = PORTFOLIO_CONTENT.projects;

	// Organic vertical offset offsets for scattered look
	const verticalOffsets = [0, 8, -6, 12, -10, 4, -4, 14, -8, 6, -12, 10, -6, 8, -4, 12, 0, -8];

	function toggleProject(id: number) {
		if (expandedProjectId === id) {
			expandedProjectId = null;
		} else {
			expandedProjectId = id;
		}
	}

	function handleKeyDown(event: KeyboardEvent, id: number) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleProject(id);
		}
	}
</script>

<section
	id="skills-projects"
	data-section="03"
	class="snap-section relative min-h-screen min-h-dvh w-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-20 z-10 bg-transparent border-t border-[#E5E5E5]/60"
	aria-label="Skills and Featured Work"
>
	<div class="max-w-5xl w-full mx-auto">
		<!-- Section Header -->
		<div class="mb-8 sm:mb-10">
			<div class="flex items-center gap-2 mb-2">
				<span class="w-1.5 h-1.5 bg-[#B76E79]" aria-hidden="true"></span>
				<span class="font-mono text-xs text-[#B76E79] uppercase tracking-[0.15em]">
					03 // SKILLS & WORK
				</span>
			</div>
			<h2
				class="font-heading text-[#000000] tracking-[-0.01em] uppercase leading-tight"
				style="font-size: clamp(1.5rem, 3.5vw, 2.25rem);"
			>
				ENGINEERING DISCIPLINE & PRODUCTION WORK
			</h2>
			<p class="font-mono text-[0.7rem] sm:text-xs text-[#666666] tracking-wider uppercase mt-1.5">
				SELECT A PROJECT CARD TO EXPAND SPECIFICATION AND REPOSITORIES
			</p>
		</div>

		<!-- ─── Subsection 1: Floating Text Skills (Scattered organic arrangement) ─── -->
		<div class="mb-10 sm:mb-12">
			<h3 class="font-heading text-xs sm:text-sm text-[#000000] uppercase tracking-wider mb-4">
				CORE STACK & CAPABILITIES
			</h3>
			<div class="flex flex-wrap gap-2 sm:gap-3 items-center" aria-label="Technical skills list">
				{#each skills as skill, idx}
					<span
						role="presentation"
						class="skill-badge inline-block bg-transparent border border-[#E5E5E5] hover:border-[#4682B4] hover:text-black hover:-translate-y-0.5 px-3 py-1.5 font-body font-medium text-xs sm:text-sm text-[#333333] cursor-default select-none transition-all duration-200"
						style="border-radius: 0; transform: translateY({verticalOffsets[
							idx % verticalOffsets.length
						]}px);"
					>
						{skill}
					</span>
				{/each}
			</div>
		</div>

		<!-- ─── Subsection 2: Projects Grid (Japanese Magazine Editorial Cover Cards) ─── -->
		<div>
			<div class="flex items-center justify-between mb-5 sm:mb-6">
				<h3 class="font-heading text-xs sm:text-sm text-[#000000] uppercase tracking-wider">
					FEATURED ARCHITECTURE & PRODUCTION REPOSITORIES
				</h3>
				<span
					class="font-mono text-[0.62rem] text-[#666666] tracking-wider uppercase hidden sm:inline-block"
				>
					EDITORIAL VOL. 01 — 04 // 4 JAPANESE ELEMENTS
				</span>
			</div>

			<!-- Compact Grid: 1-col on mobile (sized to fit screen), 2-col on tablet/web with bounded width -->
			<div
				class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-3xl lg:max-w-4xl mx-auto items-start"
			>
				{#each projects as project}
					{@const isExpanded = expandedProjectId === project.id}
					<div
						data-id={project.id}
						class="project-card-wrapper w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px] mx-auto flex flex-col"
					>
						<!-- Editorial Book / Magazine Cover Card -->
						<article
							id="project-card-{project.id}"
							class="spec-card magazine-card bg-white border border-[#E5E5E5] flex flex-col w-full relative select-none transition-all duration-300 hover:border-[#B76E79] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(183,110,121,0.12)] group"
							style="border-radius: 0;"
						>
							<!-- ── Top Header Strip: LIVELEARNLOVE + Japanese Element ── -->
							<header
								class="px-4 py-3 sm:px-5 sm:py-3.5 bg-white flex items-start justify-between border-b border-[#F0F0F0] relative z-10"
							>
								<div>
									<h4
										class="font-heading text-sm sm:text-base text-[#2B181E] tracking-[0.04em] uppercase leading-none"
									>
										LIVELEARNLOVE
									</h4>
									<!-- Subtitle below in Japanese: Earth, Fire, Water, Air (tinted with element color) -->
									<div class="flex items-center gap-1.5 mt-1">
										<span
											class="font-mincho text-[0.72rem] font-semibold tracking-widest leading-none"
											style="color: {project.element.color};"
											title="Element: {project.element.english}"
										>
											{project.element.kanji}
										</span>
									</div>
								</div>

								<!-- Dynamic Volume Number: 1, 2, 3, 4 (Remains permanent for each card) -->
								<div class="text-right flex flex-col items-end leading-none">
									<div class="flex items-baseline gap-0.5">
										<span
											class="font-mincho italic text-[0.68rem] sm:text-xs text-[#7A3E4E] font-medium tracking-tight"
										>
											vol.
										</span>
										<span
											class="font-mincho text-2xl sm:text-3xl font-bold text-[#7A3E4E] leading-none tracking-tighter"
										>
											{project.vol}
										</span>
									</div>
									<span class="font-mono text-[0.58rem] text-[#888888] tracking-wider mt-0.5 block">
										{project.editionDate}
									</span>
								</div>
							</header>

							<!-- ── Middle Visual Area: Project's Video / Image (10% Taller: 16/11 aspect) ── -->
							<div
								class="relative w-full aspect-[16/11] bg-[#1E293B] overflow-hidden group/media cursor-pointer"
								onclick={() => toggleProject(project.id)}
								onkeydown={(e) => handleKeyDown(e, project.id)}
								role="button"
								tabindex="0"
								aria-label="Toggle details for {project.name}"
							>
								{#if project.video}
									<video
										src={project.video}
										autoplay
										loop
										muted
										playsinline
										class="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-700"
									></video>
								{:else}
									<img
										src={project.image}
										alt="{project.name} preview"
										class="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-700"
										loading="lazy"
										onerror={(e) => {
											const img = e.currentTarget as HTMLImageElement;
											if (img && img.src !== project.thumbnail) img.src = project.thumbnail;
										}}
									/>
								{/if}

								<!-- ── Element-Tinted Frosted Glass Pane (Dissolves smoothly on hover) ── -->
								<div
									class="element-glass-overlay absolute inset-0 z-10 pointer-events-none"
									style="background: linear-gradient(135deg, {project.element
										.glassRgba} 0%, rgba(15, 23, 42, 0.32) 100%);
									       box-shadow: inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.25);"
								>
									<!-- Delicate diagonal gloss reflection -->
									<div
										class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none"
									></div>
								</div>

								<!-- Poetic Vertical Japanese Script (z-20 so it remains legible above the glass) -->
								<div
									class="absolute top-2.5 right-2.5 z-20 writing-vertical-rl font-mincho text-white text-xs sm:text-sm tracking-[0.2em] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] select-none pointer-events-none opacity-95"
								>
									{project.element.verticalPhrase}
								</div>

								<!-- Lower Banner Strip (matching "はじめよう！旅ログ。" from reference photo) -->
								<div
									class="absolute bottom-0 inset-x-0 z-20 bg-[#1E1B22]/90 backdrop-blur-xs text-white px-3 py-1.5 flex items-center justify-between border-t border-white/10"
									onclick={(e) => e.stopPropagation()}
									onkeydown={(e) => e.stopPropagation()}
									role="region"
									aria-label="Project actions"
								>
									<div class="pr-2 truncate">
										<p
											class="font-heading text-[0.72rem] sm:text-xs uppercase tracking-wider text-white truncate"
										>
											{project.name}
										</p>
										<p class="font-body text-[0.62rem] text-[#CCCCCC] truncate">
											{project.tagline}
										</p>
									</div>
									<div class="flex items-center gap-1.5 shrink-0">
										{#if project.liveLink}
											<a
												href={project.liveLink}
												target="_blank"
												rel="noopener noreferrer"
												aria-label="Open live demo of {project.name}"
												class="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-[#4682B4] text-white transition-colors duration-200 cursor-pointer"
												title="Live Project Demo"
											>
												<ExternalLink size={11} />
											</a>
										{/if}
										{#if project.codeLink}
											<a
												href={project.codeLink}
												target="_blank"
												rel="noopener noreferrer"
												aria-label="Open source code of {project.name}"
												class="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-[#4682B4] text-white transition-colors duration-200 cursor-pointer"
												title="View Repository"
											>
												<Github size={11} />
											</a>
										{/if}
									</div>
								</div>
							</div>

							<!-- ── Bottom Editorial Section: Larger Japanese Category Kanji + 3 English Rows ── -->
							<div
								class="p-4 sm:p-4.5 bg-white flex flex-col justify-between flex-1 border-t border-[#F0F0F0]"
							>
								<!-- The larger Japanese font: "ui, design, web, software" categories (Kanji only on card) -->
								<div class="mb-2">
									<h5
										class="font-mincho text-xl sm:text-2xl font-bold text-[#2B181E] tracking-tight leading-none select-none"
										title="{project.category.english} Category"
									>
										{project.category.kanji}
									</h5>
								</div>

								<!-- Final rows on the card in English (separated by commas):
								     Row 1: Tech stack
								     Row 2: Commits
								     Row 3: Days alive / last touched -->
								<div
									class="space-y-1.5 border-t border-[#EAEAEA] pt-2 font-body text-[0.7rem] sm:text-[0.75rem] text-[#333333] leading-snug"
								>
									<!-- Row 1: Tech Stack -->
									<div class="flex items-baseline gap-1.5">
										<span
											class="font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider text-[#888888] min-w-[50px] shrink-0 font-medium"
										>
											STACK:
										</span>
										<span class="text-[#222222] font-medium leading-snug">
											{project.techRow}
										</span>
									</div>

									<!-- Row 2: Commits -->
									<div class="flex items-baseline gap-1.5">
										<span
											class="font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider text-[#888888] min-w-[50px] shrink-0 font-medium"
										>
											COMMITS:
										</span>
										<span class="text-[#444444] leading-snug">
											{project.commitsRow}
										</span>
									</div>

									<!-- Row 3: Days Alive / Last Touched -->
									<div class="flex items-baseline gap-1.5">
										<span
											class="font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider text-[#888888] min-w-[50px] shrink-0 font-medium"
										>
											TIMELINE:
										</span>
										<span class="text-[#444444] leading-snug">
											{project.activityRow}
										</span>
									</div>
								</div>

								<!-- Expand / Collapse Technical Details Toggle -->
								<div class="mt-3 pt-2 border-t border-[#F0F0F0] flex items-center justify-between">
									<button
										type="button"
										onclick={() => toggleProject(project.id)}
										class="font-mono text-[0.62rem] sm:text-[0.65rem] text-[#B76E79] hover:text-[#7A3E4E] uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
										aria-expanded={isExpanded}
									>
										<span>{isExpanded ? '[- COLLAPSE SPEC]' : '[+ SPEC & METRICS]'}</span>
									</button>

									<div class="flex items-center gap-2.5">
										<a
											href={project.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											class="font-mono text-[0.62rem] text-[#4682B4] hover:underline uppercase flex items-center gap-0.5"
										>
											<span>DEMO</span>
											<ExternalLink size={9} />
										</a>
										<a
											href={project.codeLink}
											target="_blank"
											rel="noopener noreferrer"
											class="font-mono text-[0.62rem] text-[#4682B4] hover:underline uppercase flex items-center gap-0.5"
										>
											<span>REPO</span>
											<Github size={9} />
										</a>
									</div>
								</div>

								<!-- Detailed Technical Specs Tray (Expanded) -->
								{#if isExpanded}
									<div
										class="mt-3 pt-3 border-t border-[#E5E5E5] space-y-2 animate-in fade-in duration-200"
										role="region"
										aria-label="{project.name} technical details"
									>
										<p class="font-body text-[0.72rem] text-[#444444] leading-relaxed">
											{project.description}
										</p>
										{#if project.metrics}
											<div class="p-2 bg-[#F9F9F9] border border-[#E5E5E5] flex items-center gap-2">
												<span
													class="w-1.5 h-1.5 bg-[#39FF14] inline-block shrink-0"
													aria-hidden="true"
												></span>
												<span class="font-mono text-[0.68rem] text-[#111111]">
													{project.metrics}
												</span>
											</div>
										{/if}
									</div>
								{/if}
							</div>
						</article>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
