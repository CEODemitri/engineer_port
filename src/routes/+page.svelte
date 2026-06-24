<script lang="ts">
	import { onMount } from 'svelte';
	import FiveBackground from '../components/FiveBackground.svelte';
	import Footer from '../components/Footer.svelte';

	// --- Intersection Observer for scroll reveals ---
	onMount(() => {
		const els = document.querySelectorAll('.scroll-reveal');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('revealed');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 }
		);
		els.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	let email = $state('');
	let message = $state('');
	let submitted = $state(false);

	function handleSubmit() {
		submitted = true;
		email = '';
		message = '';
		setTimeout(() => (submitted = false), 3000);
	}

	// --- Data ---
	const stats = [
		{ value: '360+', label: 'Certifications' },
		{ value: '5+', label: 'Years Learning' },
		{ value: '∞', label: 'Systems Thinking' },
		{ value: 'AI', label: 'First Approach' }
	];

	const bentoItems = [
		{
			size: 'large',
			icon: 'fa-solid fa-brain',
			category: 'AI & Automation',
			title: 'Intelligent Systems',
			body: 'LLM workflows, AI agent architectures, prompt engineering, and automation pipelines that eliminate operational bottlenecks and unlock new capabilities.',
			tags: ['LLMs', 'Agents', 'Automation', 'RAG']
		},
		{
			size: 'small',
			icon: 'fa-solid fa-code',
			category: 'Engineering',
			title: 'Full-Stack Development',
			body: 'Production-grade applications built with JavaScript, Python, C#, and modern frameworks — scalable, secure, maintainable.',
			tags: ['React', 'Node', 'C#', 'Python']
		},
		{
			size: 'small',
			icon: 'fa-solid fa-chart-line',
			category: 'Business Impact',
			title: 'Data-Driven Results',
			body: 'Analytics background means every system I build is optimized for measurable outcomes — revenue, efficiency, and scale.',
			tags: ['Analytics', 'Metrics', 'ROI']
		},
		{
			size: 'medium',
			icon: 'fa-solid fa-server',
			category: 'Cloud & Systems',
			title: 'Architecture & DevOps',
			body: 'Cloud-native design, containerization, and CI/CD pipelines that let teams ship faster with fewer errors.',
			tags: ['Docker', 'Linux', 'Git', 'APIs']
		},
		{
			size: 'medium',
			icon: 'fa-solid fa-shield-halved',
			category: 'Technical Leadership',
			title: 'System Design',
			body: 'From architecture reviews to implementation — translating complex business problems into elegant, scalable technical solutions.',
			tags: ['Architecture', 'Design Patterns', 'OOP']
		}
	];

	const projects = [
		{
			title: 'Neural Commerce Platform',
			category: 'AI Application',
			description:
				'An AI-powered e-commerce intelligence layer that predicts inventory needs, personalizes storefronts, and automates customer interactions using LLM agents.',
			stack: ['Python', 'React', 'OpenAI', 'PostgreSQL'],
			metrics: [
				{ label: 'Efficiency Gain', value: '40%' },
				{ label: 'Automation', value: '80%' }
			],
			accent: '#00d4ff'
		},
		{
			title: 'DataSync Automation Suite',
			category: 'SaaS Platform',
			description:
				'Full-stack SaaS platform that synchronizes enterprise data across 30+ integrations with real-time webhooks, error recovery, and analytics dashboards.',
			stack: ['Node.js', 'C#', 'Docker', 'REST APIs'],
			metrics: [
				{ label: 'Integrations', value: '30+' },
				{ label: 'Uptime', value: '99.9%' }
			],
			accent: '#c9a84c'
		},
		{
			title: 'Intelligent Dev Toolkit',
			category: 'Developer Tools',
			description:
				'A suite of developer productivity tools: AI code review, automated documentation generation, and smart refactoring suggestions powered by LLMs.',
			stack: ['TypeScript', 'Python', 'LLMs', 'CLI'],
			metrics: [
				{ label: 'Time Saved', value: '5h/wk' },
				{ label: 'Code Quality', value: '+35%' }
			],
			accent: '#e8ecf4'
		},
		{
			title: 'Operations Analytics Engine',
			category: 'Enterprise Solution',
			description:
				'Real-time operations analytics platform transforming raw event streams into actionable KPIs with predictive alerting and executive dashboards.',
			stack: ['Java', 'Spring', 'SQL', 'Dashboards'],
			metrics: [
				{ label: 'Data Points/s', value: '10K+' },
				{ label: 'Alert Latency', value: '<2s' }
			],
			accent: '#00d4ff'
		}
	];

	const valueProps = [
		{
			icon: 'fa-solid fa-microchip-ai',
			title: 'AI-First Mindset',
			body: "I don't just bolt AI onto existing systems. I architect from first principles — every solution evaluated through the lens of intelligent automation."
		},
		{
			icon: 'fa-solid fa-gauge-high',
			title: 'Rapid Execution',
			body: "360+ certifications aren't just credentials — they're evidence of a relentless drive to master technologies fast and apply them immediately."
		},
		{
			icon: 'fa-solid fa-link',
			title: 'Business Translation',
			body: 'I speak both languages: I translate technical complexity into executive clarity and business requirements into precise engineering specifications.'
		},
		{
			icon: 'fa-solid fa-arrows-to-dot',
			title: 'Scalable by Design',
			body: 'Systems I build are architected to grow — modular, maintainable, and built to handle 10x load without rewrites.'
		}
	];

	const skills = [
		{ category: 'Languages', items: ['JavaScript', 'Python', 'C#', 'Java', 'TypeScript', 'C++'] },
		{ category: 'Frontend', items: ['React', 'Svelte', 'HTML/CSS', 'Tailwind'] },
		{ category: 'Backend', items: ['Node.js', 'ASP.NET', 'Spring Boot', 'REST APIs'] },
		{ category: 'AI & Data', items: ['LLMs', 'AI Agents', 'Data Analytics', 'Automation'] },
		{ category: 'Tools', items: ['Git', 'Docker', 'Linux', 'CI/CD'] }
	];

	const tickerItems = [
		'AI-Driven Development',
		'Full-Stack Engineering',
		'Automation Systems',
		'LLM Architectures',
		'Cloud Solutions',
		'Data Analytics',
		'System Design',
		'Technical Strategy'
	];
</script>

<!-- ============================================================ -->
<!-- HERO -->
<!-- ============================================================ -->
<section
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden grid-bg"
	id="hero"
>
	<!-- Particle Canvas -->
	<div class="absolute inset-0 -z-10">
		<FiveBackground />
	</div>

	<!-- Radial glow center -->
	<div
		class="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
		aria-hidden="true"
	>
		<div
			class="h-[600px] w-[600px] rounded-full"
			style="background: radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%);"
		></div>
	</div>

	<!-- Hero Content -->
	<div class="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-10">
		<!-- Label chip -->
		<div class="reveal mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
			<span class="h-1.5 w-1.5 rounded-full bg-cyan-400 pulse-ring"></span>
			<span class="font-mono text-xs tracking-widest text-cyan-400 uppercase"
				>AI-Era Software Engineer</span
			>
		</div>

		<!-- Name / Headline -->
		<h1
			class="reveal reveal-delay-1 mb-6 text-balance text-5xl font-bold leading-none tracking-tight text-foreground md:text-7xl lg:text-8xl"
			style="font-family: var(--font-sans);"
		>
			Demitri
			<span class="text-cyan-glow">Echols</span>
		</h1>

		<p
			class="reveal reveal-delay-2 mb-4 text-balance text-lg font-medium tracking-wide text-white/40 uppercase md:text-xl"
			style="font-family: var(--font-sans);"
		>
			Building Intelligent Digital Systems
		</p>

		<p
			class="reveal reveal-delay-3 mx-auto mb-12 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
			style="font-family: var(--font-body);"
		>
			I design, build, and optimize intelligent software systems that help businesses move faster,
			scale smarter, and stay competitive in an AI-first world.
		</p>

		<!-- CTAs -->
		<div class="reveal reveal-delay-4 flex flex-wrap items-center justify-center gap-4">
			<a
				href="#projects"
				class="group relative overflow-hidden rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
				style="font-family: var(--font-sans);"
			>
				<span class="relative z-10 flex items-center gap-2">
					View Projects
					<i class="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
				</span>
			</a>
			<a
				href="#contact"
				class="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white"
				style="font-family: var(--font-sans);"
			>
				Schedule Consultation
			</a>
		</div>
	</div>

	<!-- Stats bar -->
	<div class="absolute bottom-0 left-0 right-0 border-t border-white/5">
		<div class="mx-auto grid max-w-4xl grid-cols-4 divide-x divide-white/5">
			{#each stats as stat}
				<div class="flex flex-col items-center py-6 px-4">
					<span
						class="text-xl font-bold text-cyan-400 md:text-2xl"
						style="font-family: var(--font-sans);">{stat.value}</span
					>
					<span class="mt-1 text-xs tracking-wide text-white/40">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:bottom-36">
		<span class="font-mono text-xs tracking-widest text-white/20 uppercase">Scroll</span>
		<div class="h-8 w-px bg-gradient-to-b from-cyan-400/40 to-transparent"></div>
	</div>
</section>

<!-- ============================================================ -->
<!-- TICKER -->
<!-- ============================================================ -->
<div
	class="overflow-hidden border-y border-white/5 bg-surface py-3"
	aria-hidden="true"
>
	<div class="flex animate-ticker whitespace-nowrap">
		{#each [...tickerItems, ...tickerItems] as item}
			<span class="mx-8 font-mono text-xs tracking-widest text-white/20 uppercase"
				>{item} <span class="mx-4 text-cyan-400/30">·</span></span
			>
		{/each}
	</div>
</div>

<!-- ============================================================ -->
<!-- ABOUT -->
<!-- ============================================================ -->
<section id="about" class="relative py-32 px-6 md:px-10">
	<div class="mx-auto max-w-6xl">
		<div class="grid grid-cols-1 gap-16 md:grid-cols-2">
			<!-- Left -->
			<div class="scroll-reveal">
				<div class="mb-4 font-mono text-xs tracking-widest text-cyan-400/70 uppercase">
					01 / About
				</div>
				<h2
					class="mb-6 text-balance text-4xl font-bold leading-tight text-foreground md:text-5xl"
					style="font-family: var(--font-sans);"
				>
					Engineer for the
					<span class="text-cyan-glow">AI Era</span>
				</h2>
				<p class="mb-6 text-base leading-relaxed text-white/60">
					I&apos;m a software engineer with a strong foundation in systems thinking, problem-solving,
					and building reliable, maintainable software. Before starting my Bachelor&apos;s in
					Software Engineering, I earned over 360 technical certifications from Google, IBM, and
					LinkedIn Learning.
				</p>
				<p class="mb-8 text-base leading-relaxed text-white/60">
					My background in operations analytics gives me an edge — I approach every system with
					a data-informed mindset, building for performance, clarity, and measurable impact.
				</p>
				<a
					href="#contact"
					class="inline-flex items-center gap-2 font-mono text-sm text-cyan-400 transition hover:gap-3"
				>
					Work with me
					<i class="fas fa-arrow-right text-xs"></i>
				</a>
			</div>

			<!-- Right — Skills Matrix -->
			<div class="scroll-reveal grid gap-3">
				{#each skills as group}
					<div class="glass rounded-xl p-4">
						<div class="mb-3 font-mono text-xs tracking-widest text-white/30 uppercase">
							{group.category}
						</div>
						<div class="flex flex-wrap gap-2">
							{#each group.items as skill}
								<span
									class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 transition hover:border-cyan-400/40 hover:text-cyan-400"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- BENTO — INTELLIGENCE SECTION -->
<!-- ============================================================ -->
<section id="intelligence" class="relative py-32 px-6 md:px-10">
	<!-- bg accent -->
	<div
		class="pointer-events-none absolute right-0 top-1/4 h-96 w-96 opacity-30"
		aria-hidden="true"
		style="background: radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%);"
	></div>

	<div class="mx-auto max-w-6xl">
		<div class="scroll-reveal mb-16 text-center">
			<div class="mb-4 font-mono text-xs tracking-widest text-cyan-400/70 uppercase">
				02 / Capabilities
			</div>
			<h2
				class="text-balance text-4xl font-bold text-foreground md:text-5xl"
				style="font-family: var(--font-sans);"
			>
				Technical Intelligence
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-base text-white/50">
				From AI-first architectures to full-stack delivery — capabilities built to create real business impact.
			</p>
		</div>

		<!-- Bento Grid -->
		<div class="grid gap-4 md:grid-cols-3">
			<!-- Large card (spans 2 cols) -->
			{#each bentoItems as item, i}
				<div
					class="scroll-reveal glass-strong group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-cyan-400/25"
					class:md:col-span-2={item.size === 'large'}
					class:md:col-span-1={item.size !== 'large'}
					style="animation-delay: {i * 0.08}s"
				>
					<!-- Hover glow -->
					<div
						class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
						style="background: radial-gradient(circle at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%);"
						aria-hidden="true"
					></div>

					<div class="relative z-10">
						<div class="mb-4 flex items-center gap-3">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10"
							>
								<i class="{item.icon} text-sm text-cyan-400"></i>
							</div>
							<span class="font-mono text-xs tracking-wider text-white/30 uppercase"
								>{item.category}</span
							>
						</div>

						<h3
							class="mb-3 text-lg font-semibold text-foreground"
							style="font-family: var(--font-sans);"
						>
							{item.title}
						</h3>
						<p class="mb-4 text-sm leading-relaxed text-white/55">{item.body}</p>

						<div class="flex flex-wrap gap-2">
							{#each item.tags as tag}
								<span
									class="rounded-full border border-cyan-400/15 px-2.5 py-1 font-mono text-xs text-cyan-400/60"
									>{tag}</span
								>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- PROJECTS -->
<!-- ============================================================ -->
<section id="projects" class="relative py-32 px-6 md:px-10">
	<div
		class="pointer-events-none absolute left-0 top-1/3 h-80 w-80 opacity-20"
		aria-hidden="true"
		style="background: radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%);"
	></div>

	<div class="mx-auto max-w-6xl">
		<div class="scroll-reveal mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<div class="mb-4 font-mono text-xs tracking-widest text-cyan-400/70 uppercase">
					03 / Projects
				</div>
				<h2
					class="text-balance text-4xl font-bold text-foreground md:text-5xl"
					style="font-family: var(--font-sans);"
				>
					Featured Work
				</h2>
			</div>
			<p class="max-w-sm text-sm text-white/40">
				Intentional projects. Built to solve real problems, designed to scale.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			{#each projects as project, i}
				<article
					class="scroll-reveal glass-strong group relative overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:border-white/20"
					style="animation-delay: {i * 0.1}s"
				>
					<!-- Accent line top -->
					<div
						class="absolute left-0 top-0 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
						style="background: {project.accent};"
						aria-hidden="true"
					></div>

					<div class="mb-4 flex items-center justify-between">
						<span
							class="rounded-full border px-3 py-1 font-mono text-xs"
							style="color: {project.accent}; border-color: {project.accent}33;"
						>
							{project.category}
						</span>
						<div class="flex gap-3 text-white/20">
							<a href="#" aria-label="View live project" class="transition hover:text-cyan-400">
								<i class="fas fa-arrow-up-right-from-square text-xs"></i>
							</a>
							<a href="#" aria-label="View repository" class="transition hover:text-cyan-400">
								<i class="fab fa-github text-xs"></i>
							</a>
						</div>
					</div>

					<h3
						class="mb-3 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-cyan-400"
						style="font-family: var(--font-sans);"
					>
						{project.title}
					</h3>

					<p class="mb-5 text-sm leading-relaxed text-white/55">{project.description}</p>

					<!-- Metrics -->
					<div class="mb-5 flex gap-6">
						{#each project.metrics as metric}
							<div>
								<div
									class="text-lg font-bold"
									style="font-family: var(--font-sans); color: {project.accent};"
								>
									{metric.value}
								</div>
								<div class="text-xs text-white/35">{metric.label}</div>
							</div>
						{/each}
					</div>

					<!-- Stack -->
					<div class="flex flex-wrap gap-2">
						{#each project.stack as tech}
							<span
								class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50"
								>{tech}</span
							>
						{/each}
					</div>
				</article>
			{/each}
		</div>

		<div class="scroll-reveal mt-12 text-center">
			<a
				href="https://github.com/ceodemitri"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/50 transition hover:border-cyan-400/40 hover:text-cyan-400"
				style="font-family: var(--font-sans);"
			>
				<i class="fab fa-github"></i>
				View All on GitHub
			</a>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHY WORK WITH ME -->
<!-- ============================================================ -->
<section id="value" class="relative py-32 px-6 md:px-10">
	<div class="mx-auto max-w-6xl">
		<div class="scroll-reveal mb-16 text-center">
			<div class="mb-4 font-mono text-xs tracking-widest text-cyan-400/70 uppercase">
				04 / Value
			</div>
			<h2
				class="text-balance text-4xl font-bold text-foreground md:text-5xl"
				style="font-family: var(--font-sans);"
			>
				Why Work With Me
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-base text-white/50">
				Technical depth combined with business clarity — the partnership that accelerates growth.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each valueProps as prop, i}
				<div
					class="scroll-reveal glass group relative rounded-2xl p-6 transition-all duration-500 hover:border-cyan-400/20"
					style="animation-delay: {i * 0.08}s"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/8 transition-all duration-300 group-hover:bg-cyan-400/15"
					>
						<i class="{prop.icon} text-cyan-400"></i>
					</div>
					<h3
						class="mb-3 text-base font-semibold text-foreground"
						style="font-family: var(--font-sans);"
					>
						{prop.title}
					</h3>
					<p class="text-sm leading-relaxed text-white/50">{prop.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- CONTACT -->
<!-- ============================================================ -->
<section id="contact" class="relative py-32 px-6 md:px-10">
	<!-- Glow -->
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30"
		aria-hidden="true"
	>
		<div
			class="h-[500px] w-[500px] rounded-full"
			style="background: radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%);"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-5xl">
		<!-- Header -->
		<div class="scroll-reveal mb-16 text-center">
			<div class="mb-4 font-mono text-xs tracking-widest text-cyan-400/70 uppercase">
				05 / Contact
			</div>
			<h2
				class="text-balance text-4xl font-bold text-foreground md:text-6xl"
				style="font-family: var(--font-sans);"
			>
				Ready to Build<br />
				<span class="text-cyan-glow">Something Great?</span>
			</h2>
			<p class="mx-auto mt-6 max-w-lg text-base text-white/50">
				Whether you need an AI integration, a full product build, or a technical strategy — let&apos;s
				talk. No idea is too big.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-5">
			<!-- Form -->
			<div class="scroll-reveal md:col-span-3">
				<div class="glass-strong rounded-2xl p-8">
					{#if submitted}
						<div class="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10"
							>
								<i class="fas fa-check text-xl text-cyan-400"></i>
							</div>
							<h3 class="text-xl font-semibold text-foreground" style="font-family: var(--font-sans);">Message Sent</h3>
							<p class="text-sm text-white/50">I&apos;ll get back to you shortly.</p>
						</div>
					{:else}
						<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-5">
							<div>
								<label
									for="email"
									class="mb-2 block font-mono text-xs tracking-widest text-white/40 uppercase"
								>
									Email Address
								</label>
								<input
									id="email"
									type="email"
									bind:value={email}
									required
									placeholder="your.email@company.com"
									class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-white/20 transition focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
								/>
							</div>
							<div>
								<label
									for="message"
									class="mb-2 block font-mono text-xs tracking-widest text-white/40 uppercase"
								>
									Message
								</label>
								<textarea
									id="message"
									bind:value={message}
									rows={5}
									required
									placeholder="Tell me about your project or challenge…"
									class="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-white/20 transition focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
								></textarea>
							</div>
							<button
								type="submit"
								class="group w-full overflow-hidden rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.35)]"
								style="font-family: var(--font-sans);"
							>
								<span class="flex items-center justify-center gap-2">
									Send Message
									<i class="fas fa-paper-plane text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></i>
								</span>
							</button>
						</form>
					{/if}
				</div>
			</div>

			<!-- Contact Info -->
			<div class="scroll-reveal flex flex-col gap-4 md:col-span-2">
				<!-- Email -->
				<div class="glass rounded-xl p-5">
					<div class="mb-3 flex items-center gap-2 font-mono text-xs tracking-wider text-white/30 uppercase">
						<i class="fas fa-envelope text-cyan-400/60"></i>
						Email
					</div>
					<a
						href="mailto:iprogramidesign@gmail.com"
						class="text-sm text-foreground transition hover:text-cyan-400 break-all"
					>
						iprogramidesign@gmail.com
					</a>
				</div>

				<!-- Socials -->
				<div class="glass rounded-xl p-5">
					<div class="mb-4 font-mono text-xs tracking-wider text-white/30 uppercase">
						Find Me Online
					</div>
					<div class="flex flex-col gap-3">
						<a
							href="https://github.com/ceodemitri"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 text-sm text-white/50 transition hover:text-cyan-400"
						>
							<i class="fab fa-github w-4"></i>
							<span>github.com/ceodemitri</span>
						</a>
						<a
							href="https://www.linkedin.com/in/demitri-echols-391225282/"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 text-sm text-white/50 transition hover:text-cyan-400"
						>
							<i class="fab fa-linkedin w-4"></i>
							<span>LinkedIn</span>
						</a>
						<a
							href="https://x.com/iprogramidesign"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 text-sm text-white/50 transition hover:text-cyan-400"
						>
							<i class="fab fa-x-twitter w-4"></i>
							<span>@iprogramidesign</span>
						</a>
						<a
							href="https://codepen.io/CEODemitri"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 text-sm text-white/50 transition hover:text-cyan-400"
						>
							<i class="fab fa-codepen w-4"></i>
							<span>CodePen</span>
						</a>
					</div>
				</div>

				<!-- Availability -->
				<div class="glass rounded-xl p-5">
					<div class="flex items-center gap-2">
						<span class="h-2 w-2 rounded-full bg-emerald-400 pulse-ring"></span>
						<span class="font-mono text-xs tracking-wider text-emerald-400 uppercase"
							>Available for Projects</span
						>
					</div>
					<p class="mt-2 text-xs text-white/40">
						Open to freelance, consulting, and full-time opportunities.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<Footer />

<style>
	/* Scroll reveal base state */
	.scroll-reveal {
		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.scroll-reveal.revealed {
		opacity: 1;
		transform: translateY(0);
	}

	/* Override default h3 color from old style */
	h3 {
		color: inherit;
		font-size: inherit;
		font-weight: inherit;
	}

	/* CSS variable shorthands as tailwind classes aren't picking them up */
	:global(.text-foreground) {
		color: var(--color-foreground);
	}
	:global(.text-cyan-400) {
		color: var(--color-cyan);
	}
	:global(.bg-cyan-400) {
		background-color: var(--color-cyan);
	}
	:global(.border-cyan-400) {
		border-color: var(--color-cyan);
	}
	:global(.border-cyan-400\/20) {
		border-color: rgba(0, 212, 255, 0.2);
	}
	:global(.border-cyan-400\/40) {
		border-color: rgba(0, 212, 255, 0.4);
	}
	:global(.border-cyan-400\/15) {
		border-color: rgba(0, 212, 255, 0.15);
	}
	:global(.border-cyan-400\/25) {
		border-color: rgba(0, 212, 255, 0.25);
	}
	:global(.border-cyan-400\/50) {
		border-color: rgba(0, 212, 255, 0.5);
	}
	:global(.bg-cyan-400\/5) {
		background-color: rgba(0, 212, 255, 0.05);
	}
	:global(.bg-cyan-400\/8) {
		background-color: rgba(0, 212, 255, 0.08);
	}
	:global(.bg-cyan-400\/10) {
		background-color: rgba(0, 212, 255, 0.1);
	}
	:global(.bg-cyan-400\/15) {
		background-color: rgba(0, 212, 255, 0.15);
	}
	:global(.bg-cyan-400\/20) {
		background-color: rgba(0, 212, 255, 0.2);
	}
	:global(.bg-surface) {
		background-color: var(--color-surface);
	}
	:global(.text-background) {
		color: var(--color-background);
	}
	:global(.bg-background) {
		background-color: var(--color-background);
	}
	:global(.text-platinum) {
		color: var(--color-platinum);
	}
	:global(.text-cyan-glow) {
		color: var(--color-cyan);
		text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
	}
	:global(.font-mono) {
		font-family: var(--font-mono);
	}
	:global(.grid-bg) {
		background-image: linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
		background-size: 60px 60px;
	}
	:global(.glass) {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.07);
	}
	:global(.glass-strong) {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(32px);
		-webkit-backdrop-filter: blur(32px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	:global(.pulse-ring) {
		animation: pulse-ring 3s ease-in-out infinite;
	}
	:global(.animate-ticker) {
		animation: ticker 30s linear infinite;
	}
	@keyframes pulse-ring {
		0% { transform: scale(0.9); opacity: 0.8; }
		50% { transform: scale(1.05); opacity: 0.4; }
		100% { transform: scale(0.9); opacity: 0.8; }
	}
	@keyframes ticker {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}
	:global(.reveal) {
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
	}
	:global(.reveal-delay-1) { animation-delay: 0.1s; }
	:global(.reveal-delay-2) { animation-delay: 0.2s; }
	:global(.reveal-delay-3) { animation-delay: 0.35s; }
	:global(.reveal-delay-4) { animation-delay: 0.5s; }
	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(32px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
