<script lang="ts">
	import { onMount } from 'svelte';
	import FiveBackground from '../components/FiveBackground.svelte';
	import Footer from '../components/Footer.svelte';
	import ProjectsSection from '../components/ProjectsSection.svelte';

	onMount(() => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add('in');
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.1 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});

	let email     = $state('');
	let message   = $state('');
	let submitted = $state(false);

	function handleSubmit() {
		submitted = true;
		email = '';
		message = '';
		setTimeout(() => (submitted = false), 4000);
	}

	// ── Data ─────────────────────────────────────────────────────────────
	const roles = ['Software Engineer', 'AI Systems Builder', 'Full-Stack Developer', 'Technical Strategist'];
	let roleIdx = $state(0);

	onMount(() => {
		const t = setInterval(() => { roleIdx = (roleIdx + 1) % roles.length; }, 2600);
		return () => clearInterval(t);
	});

	const ticker = [
		'AI-Driven Development',
		'Full-Stack Engineering',
		'Automation Systems',
		'LLM Architectures',
		'Cloud Solutions',
		'Data Analytics',
		'System Design',
		'Technical Strategy'
	];

	// What I do — four cards, each with a CNBC color
	const services = [
		{
			color: 'var(--color-orange)',
			dim:   'var(--color-orange-dim)',
			icon:  'fa-solid fa-brain',
			title: 'AI & Automation',
			blurb: 'I build AI systems that actually work in production — not just demos. LLM pipelines, intelligent agents, and automation workflows that cut real operational costs and replace repetitive manual work.',
			tags:  ['LLMs', 'AI Agents', 'RAG', 'Automation']
		},
		{
			color: 'var(--color-blue)',
			dim:   'var(--color-blue-dim)',
			icon:  'fa-solid fa-code',
			title: 'Full-Stack Apps',
			blurb: 'From database to UI, I deliver complete production-ready applications. You get one engineer who owns the whole stack — no handoff gaps, no finger-pointing between teams.',
			tags:  ['React', 'Node.js', 'C#', 'Python', 'TypeScript']
		},
		{
			color: 'var(--color-green)',
			dim:   'var(--color-green-dim)',
			icon:  'fa-solid fa-chart-line',
			title: 'Data & Analytics',
			blurb: 'Operations analytics is where I started. I turn raw event streams and database records into dashboards and KPIs your executives can actually act on — in real time.',
			tags:  ['Analytics', 'Dashboards', 'SQL', 'KPIs']
		},
		{
			color: 'var(--color-yellow)',
			dim:   'var(--color-yellow-dim)',
			icon:  'fa-solid fa-server',
			title: 'Cloud & DevOps',
			blurb: 'Cloud-native architecture, containerization, and CI/CD pipelines. I build systems that survive traffic spikes and 3am on-call alerts without needing an emergency rewrite.',
			tags:  ['Docker', 'Linux', 'APIs', 'CI/CD']
		}
	];



	const skills = [
		{ label: 'Languages',  items: ['JavaScript', 'TypeScript', 'Python', 'C#', 'Java', 'C++'] },
		{ label: 'Frontend',   items: ['React', 'Svelte', 'HTML/CSS', 'Tailwind'] },
		{ label: 'Backend',    items: ['Node.js', 'ASP.NET', 'Spring Boot', 'REST APIs'] },
		{ label: 'AI & Data',  items: ['LLMs', 'AI Agents', 'Data Analytics', 'Automation'] },
		{ label: 'Infra',      items: ['Git', 'Docker', 'Linux', 'CI/CD'] }
	];
</script>

<!-- ══════════════════════════════════════════════════════════
     HERO
══════════════════════════════════════════════════════════ -->
<section
	id="hero"
	class="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20"
>
	<!-- Particle canvas -->
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<FiveBackground />
	</div>

	<!-- Subtle vignette -->
	<div
		class="pointer-events-none absolute inset-0 -z-10"
		aria-hidden="true"
		style="background: radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(10,10,10,0.7) 100%);"
	></div>

	<div class="mx-auto w-full max-w-6xl px-6 md:px-10">

		<!-- Eyebrow -->
		<div class="mb-6 flex items-center gap-3">
			<span
				class="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-sm"
				style="background: var(--color-orange); color: #fff; font-family: var(--font-mono);"
			>Available for Work</span>
			<span
				class="h-px w-12 block"
				style="background: var(--color-border-2);"
				aria-hidden="true"
			></span>
			<span
				class="text-xs font-medium tracking-widest uppercase"
				style="color: var(--color-fg-3); font-family: var(--font-mono);"
			>Software Engineer</span>
		</div>

		<!-- Name — large editorial -->
		<h1
			class="mb-4 leading-none tracking-tight text-balance"
			style="
				font-family: var(--font-sans);
				font-size: clamp(3.5rem, 10vw, 8rem);
				font-weight: 700;
				color: var(--color-fg);
				letter-spacing: -0.03em;
			"
		>
			Demitri<br />
			<span style="color: var(--color-orange);">Echols.</span>
		</h1>

		<!-- One-liner — plain English, no jargon -->
		<p
			class="mb-10 max-w-2xl text-xl leading-relaxed md:text-2xl"
			style="color: var(--color-fg-2); font-family: var(--font-body);"
		>
			I build the software that makes your business run smarter —<br class="hidden md:block" />
			AI systems, full-stack apps, and automation that delivers results.
		</p>

		<!-- CTAs -->
		<div class="flex flex-wrap items-center gap-4">
			<a
				href="#contact"
				class="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-sm transition-opacity duration-200 hover:opacity-90"
				style="background: var(--color-orange); color: #fff; font-family: var(--font-sans);"
			>
				Let&apos;s Work Together
				<i class="fas fa-arrow-right text-xs"></i>
			</a>
			<a
				href="#projects"
				class="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-sm transition-all duration-200"
				style="
					background: transparent;
					color: var(--color-fg);
					border: 1px solid var(--color-border-2);
					font-family: var(--font-sans);
				"
			>
				See My Work
			</a>
		</div>

		<!-- Stats row -->
		<div class="mt-16 grid grid-cols-2 gap-px sm:grid-cols-4" style="border: 1px solid var(--color-border);">
			{#each [
				{ n: '360+',  l: 'Certifications',    c: 'var(--color-orange)' },
				{ n: '5+',    l: 'Years Learning',     c: 'var(--color-blue)'   },
				{ n: '4+',    l: 'Languages',          c: 'var(--color-green)'  },
				{ n: 'AI',    l: 'First Approach',     c: 'var(--color-yellow)' }
			] as s}
				<div
					class="flex flex-col items-center py-5 px-4"
					style="background: var(--color-bg-2);"
				>
					<span
						class="text-2xl font-bold md:text-3xl"
						style="font-family: var(--font-sans); color: {s.c};"
					>{s.n}</span>
					<span
						class="mt-1 text-xs tracking-wide"
						style="color: var(--color-fg-3); font-family: var(--font-mono);"
					>{s.l}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Scroll cue -->
	<div
		class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
		aria-hidden="true"
	>
		<div class="h-8 w-px" style="background: linear-gradient(to bottom, var(--color-orange), transparent);"></div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════════════
     TICKER
══════════════════════════════════════════════════════════ -->
<div
	class="overflow-hidden py-3"
	style="background: var(--color-bg-2); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);"
	aria-hidden="true"
>
	<div class="ticker flex whitespace-nowrap">
		{#each [...ticker, ...ticker] as item}
			<span
				class="mx-8 text-xs tracking-widest uppercase"
				style="color: var(--color-fg-3); font-family: var(--font-mono);"
			>{item} <span style="color: var(--color-orange); margin: 0 1rem;">·</span></span>
		{/each}
	</div>
</div>

<!-- ══════════════════════════════════════════════════════════
     ABOUT
══════════════════════════════════════════════════════════ -->
<section id="about" class="py-28 px-6 md:px-10">
	<div class="mx-auto max-w-6xl">
		<hr class="section-rule mb-12" />

		<div class="grid grid-cols-1 gap-16 md:grid-cols-2 items-start">
			<!-- Left: big editorial text -->
			<div class="reveal">
				<p
					class="mb-3 text-xs font-semibold tracking-widest uppercase"
					style="color: var(--color-orange); font-family: var(--font-mono);"
				>01 — About</p>
				<h2
					class="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl"
					style="font-family: var(--font-sans); color: var(--color-fg);"
				>
					Engineer who builds<br />things that work.
				</h2>
				<p
					class="mb-5 text-base leading-relaxed"
					style="color: var(--color-fg-2);"
				>
					I&apos;m Demitri — a software engineer based in the United States. Before starting my
					Bachelor&apos;s in Software Engineering, I earned over 360 technical certifications from
					Google, IBM, and LinkedIn Learning. I didn&apos;t wait for a degree to start learning — I
					started building.
				</p>
				<p
					class="mb-5 text-base leading-relaxed"
					style="color: var(--color-fg-2);"
				>
					My background in operations analytics means I approach every project from the angle that
					matters most to you: <strong style="color: var(--color-fg);">measurable results.</strong>
					I don&apos;t just write code — I solve the business problem behind it.
				</p>
				<p
					class="mb-8 text-base leading-relaxed"
					style="color: var(--color-fg-2);"
				>
					Whether you&apos;re a startup that needs a full product built fast, or an established team
					that needs AI integrated into existing systems, I&apos;m the person who ships it — and
					stays to make sure it works.
				</p>
				<a
					href="#contact"
					class="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
					style="color: var(--color-orange); font-family: var(--font-sans);"
				>
					Start a conversation
					<i class="fas fa-arrow-right text-xs"></i>
				</a>
			</div>

			<!-- Right: skill pills by category -->
			<div class="reveal grid gap-4">
				{#each skills as group}
					<div
						class="glass rounded-sm p-5"
					>
						<p
							class="mb-3 text-xs font-semibold tracking-widest uppercase"
							style="color: var(--color-fg-3); font-family: var(--font-mono);"
						>{group.label}</p>
						<div class="flex flex-wrap gap-2">
							{#each group.items as item}
								<span
									class="px-3 py-1 text-xs font-medium rounded-sm"
									style="
										background: var(--color-bg-3);
										color: var(--color-fg-2);
										border: 1px solid var(--color-border);
										font-family: var(--font-body);
									"
								>{item}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════════════
     WHAT I DO
══════════════════════════════════════════════════════════ -->
<section id="work" class="py-28 px-6 md:px-10" style="background: var(--color-bg-2);">
	<div class="mx-auto max-w-6xl">
		<hr class="section-rule mb-12" />

		<div class="reveal mb-12">
			<p
				class="mb-3 text-xs font-semibold tracking-widest uppercase"
				style="color: var(--color-blue); font-family: var(--font-mono);"
			>02 — What I Do</p>
			<div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
				<h2
					class="text-4xl font-bold tracking-tight text-balance md:text-5xl"
					style="font-family: var(--font-sans); color: var(--color-fg);"
				>Four things I do<br />exceptionally well.</h2>
				<p
					class="max-w-sm text-sm leading-relaxed"
					style="color: var(--color-fg-3);"
				>Every engagement is focused on shipping results — not activity. These are the four areas where I have the deepest expertise and the most real-world impact.</p>
			</div>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services as s, i}
				<div
					class="reveal glass-2 rounded-sm p-6 flex flex-col gap-4 group transition-all duration-300"
					style="
						border-top: 2px solid {s.color};
						animation-delay: {i * 0.08}s;
					"
				>
					<div
						class="h-10 w-10 rounded-sm flex items-center justify-center"
						style="background: {s.dim};"
					>
						<i class="{s.icon} text-sm" style="color: {s.color};"></i>
					</div>

					<h3
						class="text-lg font-bold"
						style="font-family: var(--font-sans); color: var(--color-fg);"
					>{s.title}</h3>

					<p
						class="text-sm leading-relaxed flex-1"
						style="color: var(--color-fg-2);"
					>{s.blurb}</p>

					<div class="flex flex-wrap gap-1.5 mt-auto">
						{#each s.tags as tag}
							<span
								class="text-xs px-2 py-0.5 rounded-sm"
								style="
									background: {s.dim};
									color: {s.color};
									font-family: var(--font-mono);
								"
							>{tag}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════════════
     PROJECTS
══════════════════════════════════════════════════════════ -->
<ProjectsSection />

<!-- ══════════════════════════════════════════════════════════
     WHY HIRE ME — plain prose, no buzzwords
══════════════════════════════════════════════════════════ -->
<section class="py-28 px-6 md:px-10" style="background: var(--color-bg-2);">
	<div class="mx-auto max-w-6xl">
		<hr class="section-rule mb-12" />

		<div class="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
			<div class="reveal">
				<p
					class="mb-3 text-xs font-semibold tracking-widest uppercase"
					style="color: var(--color-yellow); font-family: var(--font-mono);"
				>04 — Why Me</p>
				<h2
					class="mb-8 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl"
					style="font-family: var(--font-sans); color: var(--color-fg);"
				>
					I&apos;m the engineer who<br />speaks your language.
				</h2>
				<p class="text-base leading-relaxed mb-5" style="color: var(--color-fg-2);">
					Most engineers can write code. Fewer can explain what that code does for your
					bottom line. I&apos;ve worked in operations analytics — so I understand revenue,
					efficiency, and what "better" actually means in a business context. I measure
					impact, not just ship features.
				</p>
				<p class="text-base leading-relaxed mb-5" style="color: var(--color-fg-2);">
					360+ certifications from Google and IBM aren&apos;t trophies. They&apos;re evidence
					that I learn fast, go deep, and show up prepared. I didn&apos;t collect them
					for a resume — I used every one to build something real.
				</p>
				<p class="text-base leading-relaxed mb-8" style="color: var(--color-fg-2);">
					Every project gets my full attention — from the first conversation to the
					final deploy. I write the docs. I test the edge cases. I&apos;m reachable
					when something breaks at 2am. That&apos;s the standard I hold myself to.
				</p>
				<a
					href="#contact"
					class="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90"
					style="background: var(--color-yellow); color: #111; font-family: var(--font-sans);"
				>
					Let&apos;s Talk
					<i class="fas fa-arrow-right text-xs"></i>
				</a>
			</div>

			<!-- Right: four honest differentiators -->
			<div class="reveal grid gap-4">
				{#each [
					{ color: 'var(--color-orange)', icon: 'fa-solid fa-bolt', title: 'Fast to ramp', body: 'No hand-holding, no lengthy onboarding process. I read the docs, ask the right questions on day one, and start making commits that matter within the first week.' },
					{ color: 'var(--color-blue)',   icon: 'fa-solid fa-link', title: 'Speaks plain English', body: 'I write technical documentation your whole team — engineers and non-engineers alike — can read and act on. You always know exactly what was built and why it matters.' },
					{ color: 'var(--color-green)',  icon: 'fa-solid fa-chart-line', title: 'Measurable output', body: 'Every system I ship comes with metrics baked in. You can see the before and after clearly — in dollars saved, hours reclaimed, or errors eliminated.' },
					{ color: 'var(--color-yellow)', icon: 'fa-solid fa-shield-halved', title: 'Reliable partner', body: "I don't disappear after deploy. I test edge cases, write proper documentation, and stay available. When something breaks at 3am, I'm the engineer who already wrote the runbook." }
				] as item}
					<div
						class="glass rounded-sm px-5 py-4 flex items-start gap-4"
					>
						<div
							class="mt-0.5 h-8 w-8 flex-shrink-0 rounded-sm flex items-center justify-center"
							style="background: {item.color}18;"
						>
							<i class="{item.icon} text-xs" style="color: {item.color};"></i>
						</div>
						<div>
							<p
								class="text-sm font-bold mb-1"
								style="font-family: var(--font-sans); color: var(--color-fg);"
							>{item.title}</p>
							<p class="text-sm leading-relaxed" style="color: var(--color-fg-2);">{item.body}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════════════
     CONTACT
══════════════════════════════════════════════════════════ -->
<section id="contact" class="py-28 px-6 md:px-10">
	<div class="mx-auto max-w-5xl">
		<hr class="section-rule mb-12" />

		<div class="reveal mb-12">
			<p
				class="mb-3 text-xs font-semibold tracking-widest uppercase"
				style="color: var(--color-orange); font-family: var(--font-mono);"
			>05 — Contact</p>
			<h2
				class="text-4xl font-bold tracking-tight text-balance md:text-6xl"
				style="font-family: var(--font-sans); color: var(--color-fg);"
			>
				Have a project in mind?<br />
				<span style="color: var(--color-orange);">Let&apos;s build it.</span>
			</h2>
			<p
				class="mt-5 max-w-lg text-base"
				style="color: var(--color-fg-2);"
			>Send me a message — whether it&apos;s a quick question or a full project brief, I read every one and respond within 24 hours.</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-5">
			<!-- Form -->
			<div class="reveal md:col-span-3">
				<div class="glass-2 rounded-sm p-8">
					{#if submitted}
						<div class="flex flex-col items-center justify-center gap-4 py-14 text-center">
							<div
								class="h-14 w-14 rounded-full flex items-center justify-center"
								style="background: var(--color-green-dim); border: 1px solid var(--color-green)44;"
							>
								<i class="fas fa-check text-lg" style="color: var(--color-green);"></i>
							</div>
							<p
								class="text-lg font-bold"
								style="font-family: var(--font-sans); color: var(--color-fg);"
							>Message sent.</p>
							<p class="text-sm" style="color: var(--color-fg-2);">I&apos;ll reply within 24 hours.</p>
						</div>
					{:else}
						<form
							onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
							class="flex flex-col gap-5"
						>
							<div>
								<label
									for="email"
									class="block mb-2 text-xs font-semibold tracking-widest uppercase"
									style="color: var(--color-fg-3); font-family: var(--font-mono);"
								>Email</label>
								<input
									id="email"
									type="email"
									bind:value={email}
									required
									placeholder="you@company.com"
									class="w-full rounded-sm px-4 py-3 text-sm transition-all duration-200 outline-none"
									style="
										background: var(--color-bg-3);
										border: 1px solid var(--color-border-2);
										color: var(--color-fg);
										font-family: var(--font-body);
									"
								/>
							</div>
							<div>
								<label
									for="message"
									class="block mb-2 text-xs font-semibold tracking-widest uppercase"
									style="color: var(--color-fg-3); font-family: var(--font-mono);"
								>Message</label>
								<textarea
									id="message"
									bind:value={message}
									rows={5}
									required
									placeholder="Tell me about your project or challenge…"
									class="w-full resize-none rounded-sm px-4 py-3 text-sm transition-all duration-200 outline-none"
									style="
										background: var(--color-bg-3);
										border: 1px solid var(--color-border-2);
										color: var(--color-fg);
										font-family: var(--font-body);
									"
								></textarea>
							</div>
							<button
								type="submit"
								class="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90"
								style="background: var(--color-orange); color: #fff; font-family: var(--font-sans);"
							>
								Send Message
								<i class="fas fa-paper-plane text-xs"></i>
							</button>
						</form>
					{/if}
				</div>
			</div>

			<!-- Sidebar info -->
			<div class="reveal flex flex-col gap-4 md:col-span-2">
				<div class="glass rounded-sm p-5">
					<p
						class="mb-3 text-xs font-semibold tracking-widest uppercase"
						style="color: var(--color-fg-3); font-family: var(--font-mono);"
					>Email</p>
					<a
						href="mailto:iprogramidesign@gmail.com"
						class="text-sm font-medium break-all transition-opacity hover:opacity-70"
						style="color: var(--color-fg);"
					>iprogramidesign@gmail.com</a>
				</div>

				<div class="glass rounded-sm p-5">
					<p
						class="mb-4 text-xs font-semibold tracking-widest uppercase"
						style="color: var(--color-fg-3); font-family: var(--font-mono);"
					>Find Me</p>
					<div class="flex flex-col gap-3">
						{#each [
							{ href: 'https://github.com/ceodemitri',                        icon: 'fab fa-github',     label: 'GitHub' },
							{ href: 'https://www.linkedin.com/in/demitri-echols-391225282/', icon: 'fab fa-linkedin',   label: 'LinkedIn' },
							{ href: 'https://x.com/iprogramidesign',                        icon: 'fab fa-x-twitter',  label: 'X / Twitter' },
							{ href: 'https://codepen.io/CEODemitri',                        icon: 'fab fa-codepen',    label: 'CodePen' }
						] as link}
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-3 text-sm transition-opacity hover:opacity-70"
								style="color: var(--color-fg-2);"
							>
								<i class="{link.icon} w-4 text-center" style="color: var(--color-fg-3);"></i>
								{link.label}
							</a>
						{/each}
					</div>
				</div>

				<div class="glass rounded-sm p-5 flex items-center gap-3">
					<span
						class="h-2 w-2 rounded-full flex-shrink-0 pulse-dot"
						style="background: var(--color-green);"
					></span>
					<div>
						<p
							class="text-xs font-semibold"
							style="color: var(--color-green); font-family: var(--font-mono);"
						>Available Now</p>
						<p class="text-xs mt-0.5" style="color: var(--color-fg-3);">Open to freelance & full-time</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<Footer />

<style>
	input:focus, textarea:focus {
		border-color: var(--color-orange) !important;
	}
</style>
