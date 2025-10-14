<script>
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
		description: 'To secure a mid-level software engineering position where I will apply my technical expertise, analytical mindset, and passion for development to build impactful software solutions. I am actively seeking oppurtunities that align with my strengths in web and software development. I am open to roles that challenge me to grow further in cloud technologies and system design.',
		keywords: ''
	}

	const meTwoMeta = {
		sectionTitle: 'Core Skills',
		subtitle: 'Focused and Intentional Growth',
		description: '',
		keywords: ''
	}

	const valueMeta = {
		sectionTitle: 'Value',
		subtitle: 'What I bring to the Table',
		description: '',
		keywords: ''
	}

	const projectMeta = {
		sectionTitle: 'Featured Projects',
		subtitle: 'Intentional Work',
		description: 'Bigger and better ideas, check back frequently as they listed will change periodically.',
		keywords: ''
	}
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

	<hr>
</section>

<!-- Test -->
<!--<SectionTitle {...homeMeta} /> -->

<!-- about me section -->
<div>
	<section id="about" class="h-[60vh]">
		<h2>About Me</h2>
		<div>
			<SectionTitle {...meOneMeta} />
		</div>

		<div>
			<SectionTitle {...meTwoMeta}/>
			<ul>
				<li>Programming: Python, C++, JavaScript</li>
				<li>Web: HTML, REST APIs</li>
				<li>Tools: Git, Docker, Linux</li>
				<li>Other: Data Structures, Algorithms, Debugging</li>
			</ul>
		</div>
	</section>

	<section id="benefit" class="h-[60vh]">
		<SectionTitle {...valueMeta}/>
		<ul>
			<li>
				<h3>Code that Performs</h3>
				<p>I write production-ready code in <strong>Javascript, C#, Java, Python and Ruby</strong> using frameworks like React, ASP.NET, Spring Boot and Rails to build responsive, secure and scalable applications.</p>
			</li>
			<li>
				<h3>Data-Driven Thinking</h3>
				<p>My background in analytics gives me an edge in designing systems that are not just functional but optimized for performance and usability.</p>
			</li>
			<li>
				<h3>Relentless Learning</h3>
				<p>With over <strong>360 Technical Certifications</strong>, I stay ahead of the curve - continuosly sharpening my skills and adapting to new technologies.</p>
			</li>
			<li>
				<h3>Focused Execution</h3>
				<p>I target roles and projects that align with my strengths and deliver measurable results.</p>
			</li>
		</ul>
	</section>
</div>

<section id="projects" class="h-[80vh]">
	<SectionTitle {...projectMeta}/>
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
