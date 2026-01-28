<script>
	import FiveBackground from '../components/FiveBackground.svelte';
	import Footer from '../components/Footer.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
	import SectionTitle from '../components/SectionTitle.svelte';

	const homeMeta = {
		sectionTitle: 'Home - Engineer Portfolio',
		subtitle: 'Welcome to My Portfolio',
		description:
			'Welcome to my portfolio website where I showcase my projects, skills, and experiences as an engineer.',
		keywords: 'engineer, portfolio, projects, skills, experience, coding, development'
	};

	const meOneMeta = {
		sectionTitle: 'Career Objectives',
		subtitle: 'Journey Ahead',
		description: '',
		keywords: ''
	};

	const meTwoMeta = {
		sectionTitle: 'Core Skills',
		subtitle: 'Focused and Intentional Growth',
		description: '',
		keywords: ''
	};

	const valueMeta = {
		sectionTitle: 'Value',
		subtitle: 'What I bring to the Table',
		description: '',
		keywords: ''
	};

	const projectMeta = {
		sectionTitle: 'Featured Projects',
		subtitle: 'Intentional Work',
		description:
			'Bigger and better ideas, check back frequently as they listed will change periodically.',
		keywords: ''
	};

	const projectOne = {
		alt: '',
		src: '',
		projectTitle: 'Project One',
		techStack: '',
		description: 'A long project practicing the best of the best'
	};

	const projectTwo = {
		alt: '',
		src: '',
		projectTitle: 'Project One',
		techStack: '',
		description: 'A long project practicing the best of the best'
	};

	let email = '';
	let message = '';

	function handleSubmit() {
		// Example: log the form data, replace with your own logic
		console.log('Email:', email);
		console.log('Message:', message);
		// Optionally, reset the form
		email = '';
		message = '';
	}
</script>

<!-- HERO -->
<section
	class="relative flex min-h-[90vh] flex-col justify-between overflow-hidden px-6 py-16 md:px-20"
>
	<!-- Background Layer -->
	<div class="absolute inset-0 -z-10">
		<FiveBackground />
	</div>

	<!-- Main Content -->
	<div class="mx-auto max-w-4xl space-y-8 text-center md:mt-auto md:text-left">
		<h1 class="text-5xl leading-tight font-extrabold tracking-tight md:text-7xl">
			😁 Hallo, ich heiße Demitri.
		</h1>
		<p
			class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-base text-transparent md:text-lg"
		>
			Your Neighborhood Software Developer
		</p>

		<p class="mt-6 font-mono text-sm leading-relaxed text-gray-700 md:text-base">
			Dedicated, results-driven software developer with a strong foundation in web development, OOP,
			and data analytics, specializing in scalable and maintainable applications using JavaScript,
			React, C#, and Java. My work in operations analytics inspires me to take a data-informed
			approach to build efficient and impactful solutions. Before starting my Bachelor's in Software
			Engineering, I earned over 360 technical certifications from Google, IBM, and LinkedIn
			Learning, illustrating my commitment to continuous growth.
		</p>

		<!-- Call To Action -->
		<div class="flex flex-wrap justify-center gap-6 pt-6 md:justify-start">
			<a
				href="#"
				class="rounded bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
			>
				Projects
			</a>
			<a
				href="#"
				class="font-medium text-black underline underline-offset-4 transition hover:text-gray-800"
			>
				Resume
			</a>
		</div>
	</div>

	<div class="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-xs text-gray-400">
		<span>Scroll</span>
	</div>

	<hr class="absolute bottom-0 left-0 w-full border-t border-gray-300" />
</section>

<!-- ABOUT ME -->
<section id="about" class="bg-white px-6 py-20 text-black md:px-20">
	<div class="mx-auto mb-16 max-w-6xl text-center">
		<h2 class="text-4xl font-extrabold tracking-tight md:text-5xl">About Me</h2>
		<div class="mx-auto mt-4 h-1 w-20 bg-black"></div>
	</div>

	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-8">
		<!-- Left Column -->
		<div class="space-y-6 md:col-span-4">
			<SectionTitle {...meOneMeta} />
			<p class="text-base leading-relaxed text-black/80 md:text-lg">
				I’m a software engineer with a strong foundation in systems thinking, problem-solving, and
				building reliable, maintainable software. I enjoy working close to the fundamentals— where
				performance, clarity, and correctness matter.
			</p>
			<p class="text-base leading-relaxed text-black/80 md:text-lg">
				My interests span from low-level programming concepts to modern web technologies, with a
				consistent focus on writing clean, intentional code.
			</p>
		</div>

		<!-- Right Column -->
		<div class="space-y-6 md:col-span-4">
			<SectionTitle {...meTwoMeta} />
			<ul class="divide-y divide-black/10 text-base">
				<li class="flex justify-between py-3">
					<span class="font-medium">Programming</span>
					<span class="text-black/70">Python, C++, JavaScript</span>
				</li>
				<li class="flex justify-between py-3">
					<span class="font-medium">Web</span>
					<span class="text-black/70">HTML, REST APIs</span>
				</li>
				<li class="flex justify-between py-3">
					<span class="font-medium">Tools</span>
					<span class="text-black/70">Git, Docker, Linux</span>
				</li>
				<li class="flex justify-between py-3">
					<span class="font-medium">Other</span>
					<span class="text-black/70">Data Structures, Algorithms, Debugging</span>
				</li>
			</ul>
		</div>
	</div>
</section>

<!-- HOW I CAN HELP -->
<section id="benefit" class="bg-gray-50 px-6 py-20 text-black md:px-20">
	<div class="mx-auto max-w-6xl">
		<h2 class="mb-8 text-center text-4xl font-bold md:text-left">How I Can Help</h2>
		<SectionTitle {...valueMeta} />

		<ul class="mt-12 grid gap-8 md:grid-cols-2">
			<li class="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold">Code that Performs</h3>
				<p>
					I write production-ready code in <strong>JavaScript, C#, Java, Python, and Ruby</strong>
					using frameworks like React, ASP.NET, Spring Boot, and Rails to build responsive, secure, and
					scalable applications.
				</p>
			</li>

			<li class="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold">Data-Driven Thinking</h3>
				<p>
					My background in analytics gives me an edge in designing systems that are optimized for
					performance, usability, and maintainability.
				</p>
			</li>

			<li class="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold">Relentless Learning</h3>
				<p>
					With over <strong>360 Technical Certifications</strong>, I stay ahead of the curve —
					continuously sharpening my skills and adapting to new technologies.
				</p>
			</li>

			<li class="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold">Focused Execution</h3>
				<p>
					I target roles and projects that align with my strengths and deliver measurable results.
				</p>
			</li>
		</ul>
	</div>
</section>

<!-- PROJECTS -->
<section id="projects" class="bg-white px-6 py-20 text-black md:px-20">
	<div class="mx-auto max-w-6xl">
		<h2 class="mb-8 text-center text-4xl font-bold md:text-left">Showcase</h2>
		<SectionTitle {...projectMeta} />

		<div class="mt-12 grid gap-8 md:grid-cols-2">
			<article class="overflow-hidden rounded-2xl shadow-lg">
				<ProjectCard {...projectOne} />
			</article>
			<article class="overflow-hidden rounded-2xl shadow-lg">
				<ProjectCard {...projectTwo} />
			</article>
			<article class="overflow-hidden rounded-2xl shadow-lg">
				<ProjectCard {...projectOne} />
			</article>
			<article class="overflow-hidden rounded-2xl shadow-lg">
				<ProjectCard {...projectTwo} />
			</article>
		</div>
	</div>
</section>

<hr class="my-12 border-gray-300" />

<!-- CONTACT -->
<section
	id="contact"
	class="relative flex min-h-screen items-center justify-center bg-white px-6 py-24 text-black md:px-20"
>
	<!-- Giant Background Word -->
	<h1
		class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-extrabold tracking-widest whitespace-nowrap text-black/5 select-none md:text-[15rem]"
	>
		CONTACT
	</h1>

	<!-- Container -->
	<div class="relative z-10 mx-auto w-full max-w-5xl">
		<article class="mx-auto mb-16 max-w-2xl text-center">
			<h2 class="text-4xl font-extrabold tracking-tight md:text-5xl">Get in Touch</h2>
			<p class="mt-4 text-base text-black/70 md:text-lg">
				No idea is too big or too small — let’s build something meaningful together.
			</p>
		</article>

		<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
			<!-- Form -->
			<form
				on:submit|preventDefault={handleSubmit}
				class="rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
			>
				<div class="space-y-6">
					<div>
						<label
							for="email"
							class="mb-1 block text-sm font-medium tracking-wide text-black/70 uppercase"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							required
							class="w-full rounded-md border border-black/20 bg-white px-4 py-2 text-black focus:border-black focus:outline-none"
							placeholder="your.email@example.com"
						/>
					</div>

					<div>
						<label
							for="message"
							class="mb-1 block text-sm font-medium tracking-wide text-black/70 uppercase"
						>
							Message
						</label>
						<textarea
							id="message"
							bind:value={message}
							rows="5"
							required
							class="w-full resize-none rounded-md border border-black/20 bg-white px-4 py-2 text-black focus:border-black focus:outline-none"
							placeholder="Tell me about your idea…"
						></textarea>
					</div>

					<button
						type="submit"
						class="w-full rounded-md border border-black bg-black px-4 py-2 font-medium text-white transition hover:bg-white hover:text-black"
					>
						Send Message
					</button>
				</div>
			</form>

			<!-- Social -->
			<div class="flex flex-col justify-between rounded-2xl border border-black/10 p-8">
				<div class="space-y-6">
					<h3 class="text-2xl font-semibold">Let’s connect</h3>
					<p class="text-sm leading-relaxed text-black/70">
						Whether you’re looking to collaborate, have a question, or just want to say hello, I’m
						always open to interesting conversations.
					</p>
				</div>

				<div class="mt-10">
					<div class="mb-4 text-xs tracking-wide text-black/60 uppercase">Find me online</div>
					<div class="flex gap-6 text-xl">
						<a
							href="https://github.com/yourusername"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							class="transition hover:opacity-60"
						>
							<i class="fab fa-github"></i>
						</a>
						<a
							href="https://linkedin.com/in/yourusername"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							class="transition hover:opacity-60"
						>
							<i class="fab fa-linkedin"></i>
						</a>
						<a
							href="https://twitter.com/yourusername"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Twitter"
							class="transition hover:opacity-60"
						>
							<i class="fab fa-twitter"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<Footer />

<style>
	h3 {
		color: grey;
		font-size: 1.3em;
		font-weight: bold;
	}
</style>
