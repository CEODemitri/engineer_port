export interface ProjectItem {
	id: number;
	vol: number;
	name: string;
	tagline: string;
	description: string;
	element: {
		kanji: string;
		english: string;
		verticalPhrase: string;
	};
	category: {
		kanji: string;
		english: string;
	};
	tech: string[];
	techRow: string;
	commitsRow: string;
	activityRow: string;
	editionDate: string;
	liveLink: string;
	codeLink: string;
	thumbnail: string;
	image: string;
	video?: string;
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
		tagline: 'Marching towards the future with technology',
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
		githubUsername: 'CEODemitri',
		fallbackStats: {
			stars: 1,
			commits: 2500,
			repositories: 60,
			publicRepositories: 49,
			languagesCount: 12,
			followers: 1,
			yearsActive: 4
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
			vol: 1,
			name: 'Echora AI Platform',
			tagline: 'Resume Bullet Point Editor For Busy Professionals',
			description:
				'Artificial Intelligence powered web application built to give busy professionals assistance with resume polishing and precision bullet generation.',
			element: {
				kanji: '地',
				english: 'Earth',
				verticalPhrase: '大地の鼓動。'
			},
			category: {
				kanji: '界面',
				english: 'UI'
			},
			tech: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'WebSockets'],
			techRow: 'SvelteKit, TypeScript, Tailwind CSS, WebSockets',
			commitsRow: '428 commits, 36 merges, production release',
			activityRow: '340 days alive, last touched 2 days ago',
			editionDate: '2024.11.14',
			liveLink: 'https://github.com/ceodemitri/echora',
			codeLink: 'https://github.com/ceodemitri/echora',
			thumbnail: '/assets/images/project-1-thumb.png',
			image: '/projects/echora-1.png',
			metrics: '+26 Bullet Points Revised'
		},
		{
			id: 2,
			vol: 2,
			name: 'Kaeps Language Learning App',
			tagline: 'Interactive web-based premium language learning application.',
			description:
				'High-quality premium lessons for academic enthusiasts learning languages with 3D tactile modules and real-time pronunciation feedback.',
			element: {
				kanji: '火',
				english: 'Fire',
				verticalPhrase: '情熱の炎。'
			},
			category: {
				kanji: '意匠',
				english: 'Design'
			},
			tech: ['Next.js', 'TypeScript', 'Three.js', 'WebGL'],
			techRow: 'Next.js, TypeScript, Three.js, WebGL',
			commitsRow: '1,140 commits, 92 releases, continuous integration',
			activityRow: '480 days alive, last touched yesterday',
			editionDate: '2024.09.28',
			liveLink: 'https://github.com/ceodemitri/kaeps',
			codeLink: 'https://github.com/ceodemitri/kaeps',
			thumbnail: '/assets/images/project-2-thumb.png',
			image: '/projects/kaeps-1.png',
			metrics: 'Over 1100 Commits alone for this repo, refining like good wine.'
		},
		{
			id: 3,
			vol: 3,
			name: 'Mika Astrology',
			tagline: 'Multi-modal tool used for Astrology, Mythology and Cosmology.',
			description:
				'Powerful full-stack web application calculating real-time planetary ephemerides, astrological charts, and mythological cross-references.',
			element: {
				kanji: '水',
				english: 'Water',
				verticalPhrase: '澄明の流波。'
			},
			category: {
				kanji: '網際',
				english: 'Web'
			},
			tech: ['React', 'Node.js', 'PostgreSQL', 'FastAPI'],
			techRow: 'React, Node.js, PostgreSQL, FastAPI',
			commitsRow: '512 commits, 44 merges, automated deployment',
			activityRow: '290 days alive, last touched 4 days ago',
			editionDate: '2024.06.12',
			liveLink: 'https://github.com/ceodemitri/mika',
			codeLink: 'https://github.com/ceodemitri/mika',
			thumbnail: '/assets/images/project-3-thumb.png',
			image: '/projects/mika-1.png',
			metrics: 'Automated 15+ weekly operational hours per team'
		},
		{
			id: 4,
			vol: 4,
			name: 'Savor Culinary AI',
			tagline: 'Premium scrap food recipe and culinary idea generator.',
			description:
				'Instantly turns pantry surplus into gourmet recipes and ideas using smart generative culinary modeling.',
			element: {
				kanji: '風',
				english: 'Air',
				verticalPhrase: '自由の旋風。'
			},
			category: {
				kanji: '開発',
				english: 'Software'
			},
			tech: ['Flutter', 'AI Integration', 'Tailwind CSS', 'Firestore'],
			techRow: 'Flutter, AI Integration, Tailwind CSS, Firestore',
			commitsRow: '470 commits, 28 releases, cloud architecture',
			activityRow: '210 days alive, last touched 1 week ago',
			editionDate: '2024.03.19',
			liveLink: 'https://github.com/ceodemitri/4savor',
			codeLink: 'https://github.com/ceodemitri/4savor',
			thumbnail: '/assets/images/project-4-thumb.png',
			image: '/projects/streak-1.png',
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
