<script>
	import SectionTitle from '../components/SectionTitle.svelte';

	const homeMeta = {
		sectionTitle: 'Home - Engineer Portfolio',
		subtitle: 'Welcome to My Portfolio',
		description:
			'Welcome to my portfolio website where I showcase my projects, skills, and experiences as an engineer.',
		keywords: 'engineer, portfolio, projects, skills, experience, coding, development'
	};
</script>

<!-- hero section-->
<section class="h-[80vh] flex flex-col gap-8 pb-8 pl-8">
	<div class="mt-auto">
		<h1 class="text-6xl">Hallo, ich heiBe Demitri.</h1>
		<p class="text-sm">Your Neighborhood Software Developer</p>
	</div>

	<div class="flex gap-12">
		<a href="#" class="bg-black text-white p-1 px-4 b">Projects</a>
		<a href="#">Resume</a>
	</div>
</section>

<!-- Test -->
<!--<SectionTitle {...homeMeta} /> -->
<div>
	<section id="about">
		<h2>About Me</h2>
		<p>
			I am a passionate engineer with experience in software development, problem-solving, and
			innovative solutions. I enjoy working on challenging projects and continuously learning new
			technologies.
		</p>
	</section>

	<section id="skills">
		<h2>Skills</h2>
		<ul>
			<li>Programming: Python, C++, JavaScript</li>
			<li>Web: HTML, REST APIs</li>
			<li>Tools: Git, Docker, Linux</li>
			<li>Other: Data Structures, Algorithms, Debugging</li>
		</ul>
	</section>
</div>

<section id="projects">
	<h2>Projects</h2>
	<article>
		<h3>Project One</h3>
		<p>Brief description of the project, what it does, and technologies used.</p>
	</article>
	<article>
		<h3>Project Two</h3>
		<p>Another project description with highlights and purpose.</p>
	</article>
</section>

<section id="contact">
	<h2>Contact</h2>
	<p>Email: yourname@example.com</p>
	<p>LinkedIn: <a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a></p>
	<p>GitHub: <a href="https://github.com/yourusername">github.com/yourusername</a></p>
</section>

<footer>
	<p>&copy; 2025 Your Name</p>
</footer>
