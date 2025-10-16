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
		description:
			'To secure a mid-level software engineering position where I will apply my technical expertise, analytical mindset, and passion for development to build impactful software solutions. I am actively seeking oppurtunities that align with my strengths in web and software development. I am open to roles that challenge me to grow further in cloud technologies and system design.',
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

<!-- hero section-->
<section
	class="relative flex h-[90vh] flex-col justify-between overflow-hidden px-6 py-10 md:px-20 md:py-16"
>
	<!-- Background Layer -->
	<div class="absolute inset-0 -z-10">
		<FiveBackground />
	</div>

	<!-- Main Content -->
	<div class="md:mt-auto md:space-y-8">
		<article class="max-w-4xl">
			<h1 class="text-5xl leading-tight font-bold tracking-tight md:text-7xl">
				Hallo, ich heiBe Demitri.
			</h1>
			<p class="text-base text-gray-600 md:text-lg">Your Neighborhood Software Developer</p>
		</article>

		<p class="mt-6 max-w-3xl font-mono text-sm leading-relaxed text-gray-700 md:text-base">
			I am a results-driven software developer with a strong foundation in web development, OOP, and
			data analytics, specializing in scalable and maintainable applications using JavaScript,
			React, C#, and Java. My background in operations analytics helps me take a data-informed
			approach to build efficient and impactful solutions. Before starting my Bachelor's in Software
			Engineering, I earned over 360 technical certifications from Google, IBM, and LinkedIn
			Learning, showing my commitment to continuous growth.
		</p>

		<!-- Call To Actions -->
		<div class="flex flex-wrap gap-6 pt-4">
			<a href="#" class="rounded bg-black px-6 py-2 text-white transition hover:bg-gray-800">
				Projects
			</a>
			<a href="#" class="text-black underline underline-offset-4 transition hover:text-gray-800">
				Resume
			</a>
		</div>
	</div>

	<!-- Optional: Scroll Hint -->
	<div class="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-xs text-gray-400">
		<span>Scroll</span>
	</div>

	<hr class="absolute bottom-0 left-0 w-full border-t border-gray-300" />
</section>

<!-- ABOUT ME -->
<section id="about" class="min-h-[70vh] bg-white px-6 py-16 text-black md:px-20">
	<h2 class="mb-12 text-4xl font-bold">About Me</h2>

	<div class="grid grid-cols-1 items-start gap-10 md:grid-cols-8">
		<div class="space-y-6 md:col-span-4">
			<SectionTitle {...meOneMeta} />
		</div>

		<div class="space-y-6 md:col-span-4">
			<SectionTitle {...meTwoMeta} />

			<ul class="space-y-2 text-sm md:text-base">
				<li><strong>Programming:</strong> Python, C++, JavaScript</li>
				<li><strong>Web:</strong> HTML, REST APIs</li>
				<li><strong>Tools:</strong> Git, Docker, Linux</li>
				<li><strong>Other:</strong> Data Structures, Algorithms, Debugging</li>
			</ul>
		</div>
	</div>
</section>

<!-- HOW I CAN HELP -->
<section id="benefit" class="min-h-[90vh] bg-gray-50 px-6 py-20 text-black md:px-20">
	<h2 class="mb-8 text-4xl font-bold">How I can help</h2>
	<SectionTitle {...valueMeta} />

	<ul class="mt-12 grid gap-8 md:grid-cols-2">
		<li class="rounded border bg-white p-6 shadow-sm">
			<h3 class="mb-2 text-lg font-semibold">Code that Performs</h3>
			<p>
				I write production-ready code in <strong>Javascript, C#, Java, Python and Ruby</strong> using
				frameworks like React, ASP.NET, Spring Boot and Rails to build responsive, secure and scalable
				applications.
			</p>
		</li>

		<li class="rounded border bg-white p-6 shadow-sm">
			<h3 class="mb-2 text-lg font-semibold">Data-Driven Thinking</h3>
			<p>
				My background in analytics gives me an edge in designing systems that are not just
				functional but optimized for performance and usability.
			</p>
		</li>

		<li class="rounded border bg-white p-6 shadow-sm">
			<h3 class="mb-2 text-lg font-semibold">Relentless Learning</h3>
			<p>
				With over <strong>360 Technical Certifications</strong>, I stay ahead of the curve —
				continuously sharpening my skills and adapting to new technologies.
			</p>
		</li>

		<li class="rounded border bg-white p-6 shadow-sm">
			<h3 class="mb-2 text-lg font-semibold">Focused Execution</h3>
			<p>
				I target roles and projects that align with my strengths and deliver measurable results.
			</p>
		</li>
	</ul>
</section>

<!-- PROJECTS -->
<section id="projects" class="min-h-[90vh] bg-white px-6 py-20 text-black md:px-20">
	<h2 class="mb-8 text-4xl font-bold">Showcase</h2>
	<SectionTitle {...projectMeta} />

	<div class="mt-12 grid gap-8 md:grid-cols-2">
		<article class="overflow-hidden rounded bg-stone-100 shadow-lg">
			<ProjectCard {...projectOne} />
		</article>

		<article class="overflow-hidden rounded bg-blue-100 shadow-lg">
			<ProjectCard {...projectTwo} />
		</article>

		<article class="overflow-hidden rounded bg-stone-100 shadow-lg">
			<ProjectCard {...projectOne} />
		</article>

		<article class="overflow-hidden rounded bg-blue-100 shadow-lg">
			<ProjectCard {...projectTwo} />
		</article>
	</div>
</section>

<hr class="my-12 border-gray-300" />

<!-- CONTACT -->
<section
	class="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-20 text-black"
>
	<form
		on:submit|preventDefault={handleSubmit}
		class="w-full max-w-md space-y-6"
		aria-label="Contact form"
	>
		<div>
			<label for="email" class="mb-1 block font-semibold">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				required
				class="w-full rounded border border-black bg-white px-3 py-2 text-black focus:ring-2 focus:ring-black focus:outline-none"
				placeholder="your.email@example.com"
			/>
		</div>

		<div>
			<label for="message" class="mb-1 block font-semibold">Message</label>
			<textarea
				id="message"
				bind:value={message}
				rows="4"
				required
				class="w-full rounded border border-black bg-white px-3 py-2 text-black focus:ring-2 focus:ring-black focus:outline-none"
				placeholder="Your message..."
			></textarea>
		</div>

		<button
			type="submit"
			class="w-full rounded border border-black px-4 py-2 font-semibold transition-colors duration-200 hover:bg-black hover:text-white"
		>
			Send
		</button>
	</form>

	<div class="mt-10 flex gap-6 text-xl text-black">
		<a
			href="https://github.com/yourusername"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub"
			class="transition hover:text-gray-600"
		>
			<i class="fab fa-github"></i>
		</a>

		<a
			href="https://linkedin.com/in/yourusername"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="LinkedIn"
			class="transition hover:text-gray-600"
		>
			<i class="fab fa-linkedin"></i>
		</a>

		<a
			href="https://twitter.com/yourusername"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Twitter"
			class="transition hover:text-gray-600"
		>
			<i class="fab fa-twitter"></i>
		</a>
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
