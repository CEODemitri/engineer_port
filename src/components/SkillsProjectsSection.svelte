<script lang="ts">
	import { PORTFOLIO_CONTENT } from '$lib/constants';
	import { ExternalLink, Github, X } from './icons';

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

	function getCardTransform(cardId: number, expandedId: number | null): string {
		if (expandedId === null || expandedId === cardId) return 'translate(0px, 0px)';
		if (expandedId === 1) return 'translateX(20px)';
		if (expandedId === 2) return 'translateY(20px)';
		if (expandedId === 3) return 'translateX(-20px)';
		if (expandedId === 4) return 'translateY(-20px)';
		return 'translate(0px, 0px)';
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
	class="snap-section relative min-h-screen w-full flex flex-col justify-center px-6 lg:px-16 py-24 lg:py-32 z-10 bg-transparent border-t border-[#E5E5E5]/60"
	aria-label="Skills and Featured Work"
>
	<div class="max-w-6xl w-full mx-auto">
		<!-- Section Header -->
		<div class="mb-14">
			<div class="flex items-center gap-2 mb-3">
				<span class="w-1.5 h-1.5 bg-[#B76E79]" aria-hidden="true"></span>
				<span class="font-mono text-xs text-[#B76E79] uppercase tracking-[0.15em]">
					03 // SKILLS & WORK
				</span>
			</div>
			<h2
				class="font-heading text-[#000000] tracking-[-0.01em] uppercase leading-tight"
				style="font-size: clamp(1.75rem, 4vw, 2.5rem);"
			>
				ENGINEERING DISCIPLINE & PRODUCTION WORK
			</h2>
			<p class="font-mono text-xs text-[#666666] tracking-wider uppercase mt-2">
				SELECT A PROJECT SQUARE TO EXPAND FULL ARCHITECTURE AND REPOSITORIES
			</p>
		</div>

		<!-- ─── Subsection 1: Floating Text Skills (Scattered organic arrangement) ─── -->
		<div class="mb-20">
			<h3 class="font-heading text-sm text-[#000000] uppercase tracking-wider mb-6">
				CORE STACK & CAPABILITIES
			</h3>
			<div class="flex flex-wrap gap-3 sm:gap-4 items-center" aria-label="Technical skills list">
				{#each skills as skill, idx}
					<span
						role="presentation"
						class="skill-badge inline-block bg-transparent border border-[#E5E5E5] hover:border-[#4682B4] hover:text-black hover:-translate-y-1 px-4 py-2 font-body font-medium text-sm text-[#333333] cursor-default select-none transition-all duration-200"
						style="border-radius: 0; transform: translateY({verticalOffsets[
							idx % verticalOffsets.length
						]}px);"
					>
						{skill}
					</span>
				{/each}
			</div>
		</div>

		<!-- ─── Subsection 2: Projects Grid (4 phone-app-sized squares with expansion push) ─── -->
		<div>
			<h3 class="font-heading text-sm text-[#000000] uppercase tracking-wider mb-8">
				PRODUCTION REPOSITORIES
			</h3>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
				{#each projects as project}
					{@const isExpanded = expandedProjectId === project.id}
					<div
						data-id={project.id}
						class="project-card-wrapper transition-transform duration-400 ease-out"
						style="transform: {getCardTransform(project.id, expandedProjectId)};"
					>
						<!-- Compact Square State (Phone App Sized: 120x120 thumbnail with header) -->
						<div
							class="spec-card bg-[#F5F5F5] border border-[#E5E5E5] p-5 cursor-pointer select-none transition-none group"
							onclick={() => toggleProject(project.id)}
							onkeydown={(e) => handleKeyDown(e, project.id)}
							tabindex="0"
							role="button"
							aria-expanded={isExpanded}
							aria-label="{project.name} - Click to {isExpanded ? 'collapse' : 'expand details'}"
							style="border-radius: 0;"
						>
							<div class="flex items-center gap-5">
								<!-- 120px x 120px Thumbnail (Phone app size) -->
								<div
									class="w-[120px] h-[120px] min-w-[120px] bg-white border border-[#E5E5E5] overflow-hidden flex items-center justify-center relative"
								>
									<img
										src={project.thumbnail}
										alt="{project.name} thumbnail"
										width="120"
										height="120"
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<span
										class="absolute top-1 right-1 font-mono text-[0.6rem] bg-black text-white px-1.5 py-0.5"
									>
										0{project.id}
									</span>
								</div>

								<!-- Basic Info and CTA to expand -->
								<div class="flex-1">
									<h4
										class="font-heading text-base md:text-lg text-[#000000] uppercase group-hover:text-[#4682B4]"
									>
										{project.name}
									</h4>
									<p class="font-body text-xs text-[#666666] line-clamp-2 mt-1 mb-3">
										{project.tagline}
									</p>
									<div class="flex items-center justify-between">
										<span class="font-mono text-[0.65rem] text-[#B76E79] uppercase">
											{isExpanded ? 'CLICK TO COLLAPSE [-]' : 'EXPAND ARCHITECTURE [+]'}
										</span>
									</div>
								</div>
							</div>

							<!-- Expanded View Details -->
							{#if isExpanded}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<div
									role="region"
									aria-label="Project details"
									class="mt-6 pt-6 border-t border-[#E5E5E5] flex flex-col gap-4 animate-in fade-in duration-300"
									onclick={(e) => e.stopPropagation()}
								>
									<p class="font-body text-sm text-[#333333] leading-relaxed">
										{project.description}
									</p>

									{#if project.metrics}
										<div class="p-3 bg-white border border-[#E5E5E5] flex items-center gap-2">
											<span class="w-1.5 h-1.5 bg-[#39FF14] inline-block" aria-hidden="true"></span>
											<span class="font-mono text-xs text-[#000000]">
												{project.metrics}
											</span>
										</div>
									{/if}

									<!-- Tech Stack Labels -->
									<div class="flex flex-wrap gap-2 pt-2">
										{#each project.tech as tech}
											<span
												class="font-mono text-[0.65rem] uppercase text-[#666666] bg-white border border-[#E5E5E5] px-2.5 py-1"
											>
												{tech}
											</span>
										{/each}
									</div>

									<!-- Action Links (Steel blue hover per spec) -->
									<div class="flex items-center gap-6 pt-4 border-t border-[#E5E5E5]">
										<a
											href={project.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											onclick={(e) => e.stopPropagation()}
											class="font-body font-medium text-xs text-[#4682B4] hover:underline flex items-center gap-1.5 uppercase pointer-events-auto"
										>
											<ExternalLink size={14} />
											<span>LIVE PROJECT</span>
										</a>
										<a
											href={project.codeLink}
											target="_blank"
											rel="noopener noreferrer"
											onclick={(e) => e.stopPropagation()}
											class="font-body font-medium text-xs text-[#4682B4] hover:underline flex items-center gap-1.5 uppercase pointer-events-auto"
										>
											<Github size={14} />
											<span>VIEW CODE</span>
										</a>
										<button
											type="button"
											onclick={(e) => {
												e.stopPropagation();
												toggleProject(project.id);
											}}
											class="ml-auto font-mono text-[0.65rem] text-[#666666] hover:text-black uppercase flex items-center gap-1 cursor-pointer pointer-events-auto"
										>
											<X size={14} />
											<span>CLOSE</span>
										</button>
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
