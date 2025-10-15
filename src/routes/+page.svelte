<script>
	import Footer from '../components/Footer.svelte';
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

	let email = '';
	let message = '';
</script>

<!-- hero section-->
<section class="flex h-[90vh] flex-col gap-8 pb-8">
	<div class="mt-auto">
		<article>
			<h1 class="text-6xl">Hallo, ich heiBe Demitri.</h1>
			<p class="text-sm">Your Neighborhood Software Developer</p>
		</article>

		<p class="text-sm">
			I am a results driven software developer with a deep foundation in web development, OOP, and
			data analytics. I specialize in building scalable, maintainable applications using
			technologies like Javascript, React, C#, and Java. My background in operations analytics
			enables a data-informed approach to development, helping me create efficient and impactful
			solutions. Before starting my Bachelor's in Software Engineering, I've earnedover 360
			technical certifications through Google, IBM and Linkedin Learning, reflecting a strong
			commitment to continuous growth and staying current with industry trends.
		</p>
	</div>

	<div class="flex gap-12">
		<a href="#" class="b bg-black p-1 px-4 text-white">Projects</a>
		<a href="#">Resume</a>
	</div>

	<hr />
</section>

<!-- Test -->
<!--<SectionTitle {...homeMeta} /> -->

<!-- about me section -->
<div>
	<section id="about" class="min-h-[70vh]">
		<h2 class="text-4xl font-bold my-4">About Me</h2>
		<div class="grid grid-cols-8 gap-8">
			<div class="col-span-4">
				<SectionTitle {...meOneMeta} />
			</div>

			<div class="col-start-5 col-span-3">
				<SectionTitle {...meTwoMeta} />
				<ul>
					<li>Programming: Python, C++, JavaScript</li>
					<li>Web: HTML, REST APIs</li>
					<li>Tools: Git, Docker, Linux</li>
					<li>Other: Data Structures, Algorithms, Debugging</li>
				</ul>
			</div>
		</div>
	</section>

	<section id="benefit" class="h-[90vh]">
		<SectionTitle {...valueMeta} />
		<ul class="mt-8 flex flex-col gap-4">
			<li>
				<h3>Code that Performs</h3>
				<p>
					I write production-ready code in <strong>Javascript, C#, Java, Python and Ruby</strong> using
					frameworks like React, ASP.NET, Spring Boot and Rails to build responsive, secure and scalable
					applications.
				</p>
			</li>
			<li>
				<h3>Data-Driven Thinking</h3>
				<p>
					My background in analytics gives me an edge in designing systems that are not just
					functional but optimized for performance and usability.
				</p>
			</li>
			<li>
				<h3>Relentless Learning</h3>
				<p>
					With over <strong>360 Technical Certifications</strong>, I stay ahead of the curve -
					continuosly sharpening my skills and adapting to new technologies.
				</p>
			</li>
			<li>
				<h3>Focused Execution</h3>
				<p>
					I target roles and projects that align with my strengths and deliver measurable results.
				</p>
			</li>
		</ul>
	</section>
</div>

<section id="projects" class="h-[90vh]">
	<SectionTitle {...projectMeta} />
	<article>
		<h3>Project One</h3>
		<p>Brief description of the project, what it does, and technologies used.</p>
	</article>
	<article>
		<h3>Project Two</h3>
		<p>Another project description with highlights and purpose.</p>
	</article>
</section>

<hr />

<section class="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-black">
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
				class="w-full border border-black bg-white px-3 py-2 text-black focus:ring-2 focus:ring-black focus:outline-none"
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
				class="w-full border border-black bg-white px-3 py-2 text-black focus:ring-2 focus:ring-black focus:outline-none"
				placeholder="Your message..."
			></textarea>
		</div>

		<button
			type="submit"
			class="w-full border border-black px-4 py-2 font-semibold transition-colors duration-200 hover:bg-black hover:text-white"
		>
			Send
		</button>
	</form>

	<div class="mt-8 flex space-x-6 text-xl text-black">
		<a
			href="https://github.com/yourusername"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub"
			class="hover:underline"
		>
			GitHub
		</a>
		<a
			href="https://linkedin.com/in/yourusername"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="LinkedIn"
			class="hover:underline"
		>
			LinkedIn
		</a>
		<a
			href="https://twitter.com/yourusername"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Twitter"
			class="hover:underline"
		>
			Twitter
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
