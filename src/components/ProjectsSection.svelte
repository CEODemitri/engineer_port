<script lang="ts">
	import { onMount } from 'svelte';

	// ── Types ─────────────────────────────────────────────────
	type Tab = 'overview' | 'stack' | 'changelog';

	interface Project {
		id:        string;
		color:     string;
		dim:       string;
		label:     string;
		title:     string;
		subtitle:  string;
		overview:  string;
		value:     string;
		valueIcon: string;
		images:    string[];
		stack:     { name: string; role: string }[];
		changelog: { date: string; message: string; type: 'feat' | 'refactor' | 'fix' }[];
		url:       string;
		lang:      string;
	}

	// ── Project Data (real repos) ─────────────────────────────
	const projects: Project[] = [
		{
			id:       'kaeps',
			color:    'var(--color-orange)',
			dim:      'var(--color-orange-dim)',
			label:    'Gaming Platform',
			title:    'Kaeps',
			subtitle: 'Cosmic Blackjack & Badge System',
			overview: 'A full-featured gaming platform built around Cosmic Blackjack — a space-themed card game with a live 5-tier badge progression system. Players earn Space → Bronze → Metallic → Legendary → Nova badges as they play and win.',
			value:    'Demonstrates full-stack TypeScript at scale — auth, real-time game logic, a PostgreSQL badge engine, and a polished UI all shipping together in one repo.',
			valueIcon: 'fa-solid fa-trophy',
			images:   ['/projects/kaeps-1.png', '/projects/kaeps-2.png'],
			stack: [
				{ name: 'TypeScript', role: 'Primary language' },
				{ name: 'JavaScript', role: 'Client utilities' },
				{ name: 'PLpgSQL',    role: 'Badge tier logic' },
				{ name: 'CSS',        role: 'Custom theming' }
			],
			changelog: [
				{ date: 'Jun 24, 2026', message: 'Launch Cosmic Blackjack and implement new badge tier system', type: 'feat' },
				{ date: 'Jun 24, 2026', message: 'Implement 5-tier badge system with unified images and styles', type: 'feat' },
				{ date: 'Jun 24, 2026', message: 'Merge main into v0 branch — resolved badge tier key conflicts', type: 'refactor' }
			],
			url:  'https://github.com/CEODemitri/kaeps',
			lang: 'TypeScript'
		},
		{
			id:       'mika',
			color:    'var(--color-blue)',
			dim:      'var(--color-blue-dim)',
			label:    'Space Explorer',
			title:    'Mika',
			subtitle: 'Kosmos Exploration App',
			overview: 'A space exploration companion app built for friends who want to understand the cosmos. Features an interactive moon map, unified lunar calendar and moon phases view, and live astronomical data.',
			value:    'Proves the ability to turn complex scientific data (moon phases, orbital cycles) into an interface anyone can actually enjoy — a skill that translates directly to dashboards and data products.',
			valueIcon: 'fa-solid fa-moon',
			images:   ['/projects/mika-1.png', '/projects/mika-2.png'],
			stack: [
				{ name: 'TypeScript', role: 'App logic' },
				{ name: 'JavaScript', role: 'Build config' },
				{ name: 'CSS',        role: 'Cosmic theming' }
			],
			changelog: [
				{ date: 'May 10, 2026', message: 'Add interactive moon map and consolidate lunar calendar pages', type: 'feat' },
				{ date: 'May 10, 2026', message: 'Merge moon phases and lunar calendar into single page', type: 'feat' },
				{ date: 'May 10, 2026', message: 'Add interactive moon map page and simplify MoonSection', type: 'feat' }
			],
			url:  'https://github.com/CEODemitri/mika',
			lang: 'TypeScript'
		},
		{
			id:       'streak-engine',
			color:    'var(--color-green)',
			dim:      'var(--color-green-dim)',
			label:    'Productivity Tool',
			title:    'Streak Engine',
			subtitle: 'Python Habit Tracker',
			overview: 'A Python-powered habit and streak tracking CLI engine. Reads and writes CSV-based records, lets users add new entries interactively, and computes current streaks and historical stats.',
			value:    'Clean example of Python scripting done right — data validation, file I/O, and user-facing CLI with no unnecessary dependencies. Lightweight and portable.',
			valueIcon: 'fa-solid fa-fire',
			images:   ['/projects/streak-1.png'],
			stack: [
				{ name: 'Python',     role: 'Core engine' },
				{ name: 'CSV / I/O',  role: 'Data persistence' },
				{ name: 'Shell',      role: 'Entry scripts' },
				{ name: 'PowerShell', role: 'Windows compat' }
			],
			changelog: [
				{ date: 'Apr 23, 2026', message: 'New script allows user to add new entry to tracker', type: 'feat' },
				{ date: 'Apr 23, 2026', message: 'Remove blank line from CSV causing parse error', type: 'fix' },
				{ date: 'Apr 23, 2026', message: 'Refactor CSV reader for blank-line edge case', type: 'refactor' }
			],
			url:  'https://github.com/CEODemitri/streak-engine',
			lang: 'Python'
		},
		{
			id:       'echora',
			color:    'var(--color-yellow)',
			dim:      'var(--color-yellow-dim)',
			label:    'EdTech App',
			title:    'Echora',
			subtitle: 'Typing & Language Practice',
			overview: 'A language learning web app focused on typing practice. Features multiple lesson types including a new "type words" mode, per-lesson progress tracking, and a visual progress page.',
			value:    'EdTech is a UX-hard domain. Building something learners actually use daily requires clean state management, responsive feedback loops, and accessibility — all demonstrated here.',
			valueIcon: 'fa-solid fa-keyboard',
			images:   ['/projects/echora-1.png', '/projects/echora-2.png'],
			stack: [
				{ name: 'TypeScript', role: 'App logic' },
				{ name: 'CSS',        role: 'Lesson theming' },
				{ name: 'PLpgSQL',    role: 'Progress persistence' },
				{ name: 'JavaScript', role: 'Build tooling' }
			],
			changelog: [
				{ date: 'Mar 19, 2026', message: 'Add new lesson type: type words', type: 'feat' },
				{ date: 'Mar 19, 2026', message: 'Update task list on README', type: 'refactor' },
				{ date: 'Mar 5,  2026', message: 'Change one logo on progress page', type: 'refactor' }
			],
			url:  'https://github.com/CEODemitri/echora',
			lang: 'TypeScript'
		}
	];

	// ── State ─────────────────────────────────────────────────
	let activeIdx      = $state(0);
	let activeTab      = $state<Tab>('overview');
	let imageIdx       = $state(0);
	let scrollEl       = $state<HTMLElement | null>(null);
	let showLeftArrow  = $state(false);
	let showRightArrow = $state(true);
	let imageLoaded    = $state(false);
	let cardChanging   = $state(false);

	$effect(() => {
		// Reset image + tab when active project changes
		activeIdx;
		imageIdx    = 0;
		activeTab   = 'overview';
		imageLoaded = false;
	});

	function selectProject(idx: number) {
		if (idx === activeIdx) return;
		cardChanging = true;
		setTimeout(() => {
			activeIdx    = idx;
			cardChanging = false;
		}, 180);
	}

	function nextImage() {
		const imgs = projects[activeIdx].images;
		imageIdx = (imageIdx + 1) % imgs.length;
		imageLoaded = false;
	}
	function prevImage() {
		const imgs = projects[activeIdx].images;
		imageIdx = (imageIdx - 1 + imgs.length) % imgs.length;
		imageLoaded = false;
	}

	function onScroll() {
		if (!scrollEl) return;
		showLeftArrow  = scrollEl.scrollLeft > 20;
		showRightArrow = scrollEl.scrollLeft < scrollEl.scrollWidth - scrollEl.clientWidth - 20;
	}

	function scrollCards(dir: 'left' | 'right') {
		if (!scrollEl) return;
		const amount = 300;
		scrollEl.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
	}

	// keyboard image nav
	function onKeyImage(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft')  prevImage();
	}

	const tabLabels: { key: Tab; label: string; icon: string }[] = [
		{ key: 'overview',  label: 'Overview',    icon: 'fa-solid fa-eye' },
		{ key: 'stack',     label: 'Tech Stack',  icon: 'fa-solid fa-layer-group' },
		{ key: 'changelog', label: 'Latest Changes', icon: 'fa-solid fa-code-commit' }
	];

	const changelogColors: Record<string, string> = {
		feat:     'var(--color-green)',
		refactor: 'var(--color-blue)',
		fix:      'var(--color-orange)'
	};

	let project = $derived(projects[activeIdx]);
</script>

<!-- ═══════════════════════════════════════════════════
     PROJECTS SECTION
═══════════════════════════════════════════════════ -->
<section id="projects" class="py-28" style="overflow: hidden;">
	<div class="mx-auto max-w-6xl px-6 md:px-10">
		<hr class="section-rule mb-12" />

		<div class="reveal mb-10">
			<p
				class="mb-3 text-xs font-semibold tracking-widest uppercase"
				style="color: var(--color-green); font-family: var(--font-mono);"
			>03 — Projects</p>
			<div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<h2
					class="text-4xl font-bold tracking-tight text-balance md:text-5xl"
					style="font-family: var(--font-sans); color: var(--color-fg);"
				>Real code.<br />Real repos.</h2>
				<p class="max-w-xs text-sm" style="color: var(--color-fg-3);">
					4 latest projects pulled live from GitHub — click any card to explore.
				</p>
			</div>
		</div>
	</div>

	<!-- ── Horizontal scroll rail ───────────────────────────── -->
	<div class="relative">
		<!-- Left fade + arrow -->
		{#if showLeftArrow}
			<div
				class="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
				style="background: linear-gradient(to right, var(--color-bg), transparent);"
				aria-hidden="true"
			></div>
			<button
				class="scroll-arrow left-3"
				onclick={() => scrollCards('left')}
				aria-label="Scroll cards left"
			>
				<i class="fas fa-chevron-left"></i>
			</button>
		{/if}

		<!-- Right fade + arrow -->
		{#if showRightArrow}
			<div
				class="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
				style="background: linear-gradient(to left, var(--color-bg), transparent);"
				aria-hidden="true"
			></div>
			<button
				class="scroll-arrow right-3"
				onclick={() => scrollCards('right')}
				aria-label="Scroll cards right"
			>
				<i class="fas fa-chevron-right"></i>
			</button>
		{/if}

		<!-- Scroll container -->
		<div
			bind:this={scrollEl}
			onscroll={onScroll}
			class="scroll-rail px-6 md:px-10"
			role="listbox"
			aria-label="Project selector"
		>
			{#each projects as p, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					role="option"
					aria-selected={i === activeIdx}
					tabindex="0"
					class="project-pill"
					class:active={i === activeIdx}
					style="--pill-color: {p.color}; --pill-dim: {p.dim};"
					onclick={() => selectProject(i)}
					onkeydown={(e) => e.key === 'Enter' && selectProject(i)}
				>
					<!-- Accent line at top -->
					<div class="pill-accent" aria-hidden="true"></div>

					<div class="flex items-start justify-between gap-3 mb-3">
						<span class="pill-label">{p.label}</span>
						<span class="pill-lang">{p.lang}</span>
					</div>
					<p class="pill-title">{p.title}</p>
					<p class="pill-sub">{p.subtitle}</p>

					<!-- Active indicator dot -->
					{#if i === activeIdx}
						<div class="pill-dot" aria-hidden="true"></div>
					{/if}
				</div>
			{/each}

			<!-- Spacer so last card isn't flush right -->
			<div class="flex-shrink-0 w-6"></div>
		</div>

		<!-- Scroll hint dots -->
		<div class="flex justify-center gap-2 mt-4" aria-hidden="true">
			{#each projects as _, i}
				<div
					class="scroll-dot"
					class:active-dot={i === activeIdx}
				></div>
			{/each}
		</div>
	</div>

	<!-- ── Expanded project detail ──────────────────────────── -->
	<div class="mx-auto max-w-6xl px-6 md:px-10 mt-10">
		<div
			class="detail-card glass-2"
			class:changing={cardChanging}
			style="--card-color: {project.color}; --card-dim: {project.dim};"
		>
			<div class="grid grid-cols-1 gap-0 lg:grid-cols-2">

				<!-- Left: image carousel ──────────────────── -->
				<div class="carousel-panel">
					<div
						class="carousel-frame"
						role="img"
						aria-label="{project.title} screenshot {imageIdx + 1} of {project.images.length}"
						tabindex="0"
						onkeydown={onKeyImage}
					>
						<!-- Image -->
						<img
							src={project.images[imageIdx]}
							alt="{project.title} — screenshot {imageIdx + 1}"
							class="carousel-img"
							class:loaded={imageLoaded}
							onload={() => (imageLoaded = true)}
						/>

						<!-- Skeleton shimmer while loading -->
						{#if !imageLoaded}
							<div class="carousel-skeleton" aria-hidden="true"></div>
						{/if}

						<!-- Nav overlays — only show if >1 image -->
						{#if project.images.length > 1}
							<button
								class="carousel-nav left"
								onclick={prevImage}
								aria-label="Previous screenshot"
							>
								<i class="fas fa-chevron-left text-xs"></i>
							</button>
							<button
								class="carousel-nav right"
								onclick={nextImage}
								aria-label="Next screenshot"
							>
								<i class="fas fa-chevron-right text-xs"></i>
							</button>

							<!-- Dot indicators -->
							<div class="carousel-dots" aria-hidden="true">
								{#each project.images as _, di}
									<div
										class="c-dot"
										class:c-dot-active={di === imageIdx}
									></div>
								{/each}
							</div>
						{/if}

						<!-- Corner badge -->
						<div class="carousel-badge">
							<i class="{project.valueIcon} text-xs mr-1.5"></i>{project.label}
						</div>
					</div>

					<!-- Below image: repo link + live pulse -->
					<div class="flex items-center justify-between px-5 py-3.5" style="border-top: 1px solid var(--color-border);">
						<div class="flex items-center gap-2">
							<span class="live-dot" aria-hidden="true"></span>
							<span class="text-xs font-mono" style="color: var(--color-fg-3);">CEODemitri/{project.id}</span>
						</div>
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
							style="color: {project.color}; font-family: var(--font-mono);"
							aria-label="View {project.title} on GitHub"
						>
							<i class="fab fa-github"></i>
							View on GitHub
							<i class="fas fa-arrow-up-right-from-square text-[0.6rem]"></i>
						</a>
					</div>
				</div>

				<!-- Right: tabbed info ─────────────────────── -->
				<div class="info-panel">
					<!-- Header -->
					<div class="info-header" style="border-bottom: 1px solid var(--color-border);">
						<p class="info-label">{project.label}</p>
						<h3 class="info-title">{project.title}</h3>
						<p class="info-sub">{project.subtitle}</p>
					</div>

					<!-- Tab switcher -->
					<div class="tab-bar" role="tablist" aria-label="Project details">
						{#each tabLabels as t}
							<button
								role="tab"
								aria-selected={activeTab === t.key}
								class="tab-btn"
								class:tab-active={activeTab === t.key}
								style={activeTab === t.key ? `color: ${project.color}; border-bottom-color: ${project.color};` : ''}
								onclick={() => (activeTab = t.key)}
							>
								<i class="{t.icon} text-xs"></i>
								{t.label}
							</button>
						{/each}
					</div>

					<!-- Tab content -->
					<div class="tab-content">

						{#if activeTab === 'overview'}
							<div class="tab-pane">
								<p class="tab-body">{project.overview}</p>
								<!-- Business value highlight -->
								<div class="value-box" style="border-left: 3px solid {project.color}; background: {project.dim};">
									<p class="value-label">
										<i class="{project.valueIcon} mr-1.5"></i>Business Value
									</p>
									<p class="value-text">{project.value}</p>
								</div>
							</div>

						{:else if activeTab === 'stack'}
							<div class="tab-pane">
								<p class="tab-section-label">Technologies used</p>
								<div class="stack-grid">
									{#each project.stack as tech}
										<div class="stack-item" style="border: 1px solid {project.color}28;">
											<span class="stack-name" style="color: {project.color};">{tech.name}</span>
											<span class="stack-role">{tech.role}</span>
										</div>
									{/each}
								</div>
							</div>

						{:else if activeTab === 'changelog'}
							<div class="tab-pane">
								<p class="tab-section-label">Latest commits</p>
								<div class="changelog-list">
									{#each project.changelog as entry}
										<div class="changelog-entry">
											<div class="cl-type" style="background: {changelogColors[entry.type]}1a; color: {changelogColors[entry.type]};">
												{entry.type}
											</div>
											<div class="cl-body">
												<p class="cl-msg">{entry.message}</p>
												<p class="cl-date">{entry.date}</p>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}

					</div>
				</div>

			</div>
		</div>

		<!-- All repos link -->
		<div class="reveal mt-8 flex justify-end">
			<a
				href="https://github.com/CEODemitri"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
				style="color: var(--color-fg-3); font-family: var(--font-sans);"
			>
				<i class="fab fa-github"></i>
				All repositories on GitHub
				<i class="fas fa-arrow-right text-xs"></i>
			</a>
		</div>
	</div>
</section>

<style>
	/* ── Scroll rail ─────────────────────────────────────── */
	.scroll-rail {
		display: flex;
		gap: 0.75rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		padding-bottom: 0.5rem;
	}
	.scroll-rail::-webkit-scrollbar { display: none; }

	/* ── Scroll arrows ───────────────────────────────────── */
	.scroll-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 20;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		cursor: pointer;
		transition: opacity 0.2s;
		background: var(--color-bg-2);
		border: 1px solid var(--color-border-2);
		color: var(--color-fg-2);
	}
	.scroll-arrow:hover { opacity: 0.7; }

	/* ── Project pill (scroll card) ──────────────────────── */
	.project-pill {
		position: relative;
		flex-shrink: 0;
		width: 220px;
		scroll-snap-align: start;
		padding: 1.25rem;
		border-radius: 2px;
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s;
		background: var(--color-bg-2);
		border: 1px solid var(--color-border);
		overflow: hidden;
	}
	.project-pill:hover {
		transform: translateY(-3px);
		border-color: var(--pill-color);
		box-shadow: 0 8px 32px var(--pill-color, transparent)20;
	}
	.project-pill.active {
		background: var(--pill-dim);
		border-color: var(--pill-color);
		box-shadow: 0 0 0 1px var(--pill-color)40;
	}
	.pill-accent {
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 2px;
		background: var(--pill-color);
	}
	.pill-label {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-family: var(--font-mono);
		color: var(--pill-color);
	}
	.pill-lang {
		font-size: 0.6rem;
		font-family: var(--font-mono);
		padding: 0.1rem 0.5rem;
		border-radius: 2px;
		background: var(--color-bg-3);
		color: var(--color-fg-3);
		border: 1px solid var(--color-border);
	}
	.pill-title {
		font-size: 1.05rem;
		font-weight: 700;
		font-family: var(--font-sans);
		color: var(--color-fg);
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}
	.pill-sub {
		font-size: 0.7rem;
		color: var(--color-fg-3);
		font-family: var(--font-body);
		line-height: 1.4;
	}
	.pill-dot {
		position: absolute;
		bottom: 0.75rem;
		right: 0.75rem;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--pill-color);
		animation: pulse-dot 2s infinite;
	}
	@keyframes pulse-dot {
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.5; transform: scale(1.4); }
	}

	/* ── Scroll dots ─────────────────────────────────────── */
	.scroll-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-border-2);
		transition: all 0.3s;
	}
	.active-dot {
		width: 18px;
		border-radius: 3px;
		background: var(--color-orange);
	}

	/* ── Detail card ─────────────────────────────────────── */
	.detail-card {
		border-radius: 4px;
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-top: 2px solid var(--card-color);
		transition: opacity 0.18s ease, transform 0.18s ease;
	}
	.detail-card.changing {
		opacity: 0;
		transform: translateY(6px);
	}

	/* ── Carousel panel ──────────────────────────────────── */
	.carousel-panel {
		border-right: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
	}
	.carousel-frame {
		position: relative;
		overflow: hidden;
		aspect-ratio: 16 / 10;
		background: var(--color-bg-3);
		cursor: pointer;
		outline: none;
	}
	.carousel-frame:focus-visible {
		outline: 2px solid var(--card-color);
		outline-offset: -2px;
	}
	.carousel-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.carousel-img.loaded { opacity: 1; }

	.carousel-skeleton {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			var(--color-bg-3) 0%,
			var(--color-bg-2) 50%,
			var(--color-bg-3) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.4s infinite;
	}
	@keyframes shimmer {
		0%   { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	.carousel-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: opacity 0.2s;
		background: rgba(0,0,0,0.6);
		border: 1px solid rgba(255,255,255,0.15);
		color: #fff;
		backdrop-filter: blur(4px);
	}
	.carousel-nav.left  { left: 0.75rem; }
	.carousel-nav.right { right: 0.75rem; }
	.carousel-nav:hover { opacity: 0.7; }

	.carousel-dots {
		position: absolute;
		bottom: 0.75rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 0.35rem;
	}
	.c-dot {
		width: 5px; height: 5px;
		border-radius: 50%;
		background: rgba(255,255,255,0.4);
		transition: all 0.2s;
	}
	.c-dot-active {
		width: 14px;
		border-radius: 3px;
		background: var(--card-color);
	}

	.carousel-badge {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.25rem 0.6rem;
		border-radius: 2px;
		font-family: var(--font-mono);
		background: rgba(0,0,0,0.7);
		color: var(--card-color);
		border: 1px solid var(--card-color)40;
		backdrop-filter: blur(4px);
	}

	.live-dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-green);
		animation: pulse-dot 2.2s infinite;
	}

	/* ── Info panel ──────────────────────────────────────── */
	.info-panel {
		display: flex;
		flex-direction: column;
	}
	.info-header {
		padding: 1.5rem 1.75rem 1.25rem;
	}
	.info-label {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-family: var(--font-mono);
		color: var(--card-color);
		margin-bottom: 0.4rem;
	}
	.info-title {
		font-size: 1.5rem;
		font-weight: 700;
		font-family: var(--font-sans);
		color: var(--color-fg);
		line-height: 1.2;
		margin-bottom: 0.25rem;
	}
	.info-sub {
		font-size: 0.8rem;
		color: var(--color-fg-3);
		font-family: var(--font-body);
	}

	/* ── Tab bar ─────────────────────────────────────────── */
	.tab-bar {
		display: flex;
		border-bottom: 1px solid var(--color-border);
		padding: 0 1.75rem;
		gap: 0;
	}
	.tab-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.7rem 0.9rem;
		font-size: 0.72rem;
		font-weight: 600;
		font-family: var(--font-mono);
		cursor: pointer;
		border-bottom: 2px solid transparent;
		color: var(--color-fg-3);
		transition: color 0.2s;
		white-space: nowrap;
		background: none;
		border-top: none;
		border-left: none;
		border-right: none;
		margin-bottom: -1px;
	}
	.tab-btn:hover { color: var(--color-fg); }
	.tab-active { color: var(--card-color) !important; }

	/* ── Tab content ─────────────────────────────────────── */
	.tab-content {
		flex: 1;
		overflow-y: auto;
		max-height: 280px;
	}
	.tab-pane {
		padding: 1.5rem 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.tab-body {
		font-size: 0.875rem;
		line-height: 1.7;
		color: var(--color-fg-2);
		font-family: var(--font-body);
	}
	.tab-section-label {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-family: var(--font-mono);
		color: var(--color-fg-3);
		margin-bottom: 0.25rem;
	}

	/* ── Value box ───────────────────────────────────────── */
	.value-box {
		padding: 1rem 1.25rem;
		border-radius: 2px;
	}
	.value-label {
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-family: var(--font-mono);
		color: var(--card-color);
		margin-bottom: 0.5rem;
	}
	.value-text {
		font-size: 0.825rem;
		line-height: 1.6;
		color: var(--color-fg-2);
		font-family: var(--font-body);
	}

	/* ── Stack grid ──────────────────────────────────────── */
	.stack-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}
	.stack-item {
		padding: 0.75rem 1rem;
		border-radius: 2px;
		background: var(--color-bg-3);
	}
	.stack-name {
		display: block;
		font-size: 0.8rem;
		font-weight: 700;
		font-family: var(--font-mono);
		margin-bottom: 0.15rem;
	}
	.stack-role {
		font-size: 0.68rem;
		color: var(--color-fg-3);
		font-family: var(--font-body);
	}

	/* ── Changelog ───────────────────────────────────────── */
	.changelog-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.changelog-entry {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.75rem;
		border-radius: 2px;
		background: var(--color-bg-3);
	}
	.cl-type {
		flex-shrink: 0;
		padding: 0.2rem 0.55rem;
		border-radius: 2px;
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-family: var(--font-mono);
		margin-top: 0.1rem;
	}
	.cl-body { flex: 1; }
	.cl-msg {
		font-size: 0.78rem;
		color: var(--color-fg);
		font-family: var(--font-body);
		line-height: 1.4;
		margin-bottom: 0.2rem;
	}
	.cl-date {
		font-size: 0.65rem;
		color: var(--color-fg-3);
		font-family: var(--font-mono);
	}

	/* ── Responsive ──────────────────────────────────────── */
	@media (max-width: 1023px) {
		.carousel-panel {
			border-right: none;
			border-bottom: 1px solid var(--color-border);
		}
		.tab-content {
			max-height: 240px;
		}
	}
</style>
