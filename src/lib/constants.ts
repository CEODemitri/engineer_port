export interface ProjectItem {
	id: number;
	name: string;
	tagline: string;
	description: string;
	tech: string[];
	liveLink: string;
	codeLink: string;
	thumbnail: string;
	metrics?: string;
}

export interface CredentialItem {
	year: string;
	title: string;
	institution: string;
	description: string;
}

export interface NavItem {
	label: string;
	target: string;
	number: string;
}

export const PORTFOLIO_CONTENT = {
	brand: 'DEMITRI',
	tagline: 'Creative developer marching towards the future',
	hero: {
		name: 'DEMITRI',
		lastName: 'ECHOLS',
		title: 'Creative Developer',
		tagline: 'Marching towards the future using technology',
		ctaWork: 'View My Work',
		ctaContact: 'Contact Me',
		scrollHint: 'Scroll to explore'
	},
	whyMe: {
		sectionNumber: '02',
		sectionTitle: 'Why Me',
		heading: 'I solve business problems, not just write code.',
		paragraphs: [
			"I'm Demitri — a software engineer based in the United States. Before starting my Bachelor's in Software Engineering, I earned over 360 technical certifications from Google, IBM, and LinkedIn Learning. Before I begin earning my degree, I ventured into the world of software — I started building.",
			"My background in operations analytics means I approach every project from the angle that matters most to you: measurable results. I don't just write code: I solve the business problem behind it.",
			"Whether you're a startup that needs a full product built fast, or an established team that needs AI integrated into existing systems, I'm the person who ships it — and stays to make sure it works."
		],
		githubUsername: 'ceodemitri',
		fallbackStats: {
			stars: 12,
			commits: 1280,
			repositories: 60,
			followers: 4
		}
	},
	skills: [
		'TypeScript',
		'SvelteKit',
		'Angular',
		'React',
		'Node.js',
		'Python',
		'AI Integration',
		'REST APIs',
		'GraphQL',
		'PostgreSQL',
		'MongoDB',
		'Docker',
		'AWS',
		'Git',
		'CI/CD',
		'Tailwind CSS',
		'Three.js',
		'GSAP'
	],
	projects: [
		{
			id: 1,
			name: 'Echora AI Platform',
			tagline: 'Resume Bullet Point Editor For Busy Professionals',
			description:
				'Artifical Intelligent powered web application built to give busy professionals assistance with resume polishing.',
			tech: ['SvelteKit', 'TypeScript', 'Tailwind', 'WebSockets'],
			liveLink: 'https://github.com/ceodemitri/echora',
			codeLink: 'https://github.com/ceodemitri/echora',
			thumbnail: '/assets/images/project-1-thumb.png',
			metrics: '+26 Bullet Points Revised'
		},
		{
			id: 2,
			name: 'Kaeps Language Learning App',
			tagline: 'Interactive web-based premium language learning application.',
			description:
				'High-quality premium lessons for academic enthusiants who wish to learn a new language.',
			tech: ['NextJS', 'TypeScript', 'Three.js', 'WebGL'],
			liveLink: 'https://github.com/ceodemitri/kaeps',
			codeLink: 'https://github.com/ceodemitri/kaeps',
			thumbnail: '/assets/images/project-2-thumb.png',
			metrics: 'Over 1100 Commits alone for this repo, refining like good wine.'
		},
		{
			id: 3,
			name: 'Mika Astrology ',
			tagline: 'Multi-modal tool used for Astrology, Mythology and Cosmology.',
			description: 'Powerful web application at your fingertips, powered by the suns.',
			tech: ['React', 'Node.js', 'PostgreSQL', 'FastAPI'],
			liveLink: 'https://github.com/ceodemitri/mika',
			codeLink: 'https://github.com/ceodemitri/mika',
			thumbnail: '/assets/images/project-3-thumb.png',
			metrics: 'Automated 15+ weekly operational hours per team'
		},
		{
			id: 4,
			name: 'Savor',
			tagline: 'Premium recipe app',
			description: 'Instantly turn scrap food into delciious recipes and ideas.',
			tech: ['Flutter', 'AI Integration', 'TailwindCSS', 'Firestore'],
			liveLink: 'https://github.com/ceodemitri/4savor',
			codeLink: 'https://github.com/ceodemitri/4savor',
			thumbnail: '/assets/images/project-4-thumb.png',
			metrics: 'Over 2000 recipes generated.'
		}
	] as ProjectItem[],
	credentials: [
		{
			year: '2025',
			title: "Bachelor's in Software Engineering",
			institution: 'Western Governors University',
			description:
				'Currently pursuing — focused on distributed systems, algorithms, and secure software lifecycle.'
		},
		{
			year: '2024',
			title: 'Operations Analytics Background',
			institution: 'Enterprise Operations & Systems',
			description:
				'Measurable results approach to engineering: data-driven architecture, root-cause optimization, and performance KPIs.'
		},
		{
			year: '2023',
			title: '360+ Technical Certifications',
			institution: 'Google, IBM, and LinkedIn Learning',
			description:
				'Comprehensive credentials covering cloud architecture, modern full-stack development, and data engineering.'
		},
		{
			year: '2021',
			title: 'First Production Deployment',
			institution: 'Independent Client Delivery',
			description:
				'Shipped first full-stack production application serving commercial users with 99.9% uptime.'
		},
		{
			year: '2020',
			title: 'Started Building',
			institution: 'Self-Directed Engineering',
			description:
				"Didn't wait for a degree — immersed into systems programming, open source, and shipping functional software."
		}
	] as CredentialItem[],
	contact: {
		sectionNumber: '05',
		sectionTitle: 'Contact',
		heading: "Let's build the future together.",
		email: 'iprogramidesign@gmail.com',
		phone: '+1 (555) 123-4567',
		socials: [
			{
				label: 'GitHub',
				url: 'https://github.com/ceodemitri',
				handle: 'ceodemitri'
			},
			{
				label: 'LinkedIn',
				url: 'https://www.linkedin.com/in/demitri-echols-391225282/',
				handle: 'Demitri Echols'
			},
			{
				label: 'Twitter/X',
				url: 'https://x.com/iprogramidesign',
				handle: '@iprogramidesign'
			}
		]
	},
	navLinks: [
		{ label: 'Home', target: '#home', number: '01' },
		{ label: 'Why Me', target: '#why-me', number: '02' },
		{ label: 'Skills & Work', target: '#skills-projects', number: '03' },
		{ label: 'Credentials', target: '#credentials', number: '04' },
		{ label: 'Contact', target: '#contact', number: '05' }
	] as NavItem[]
};
