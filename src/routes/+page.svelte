<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Preloader from '../components/Preloader.svelte';
	import HoneycombBackground from '../components/HoneycombBackground.svelte';
	import ThreeBackground from '../components/ThreeBackground.svelte';
	import Navigation from '../components/Navigation.svelte';
	import HeroSection from '../components/HeroSection.svelte';
	import WhyMeSection from '../components/WhyMeSection.svelte';
	import SkillsProjectsSection from '../components/SkillsProjectsSection.svelte';
	import CredentialsSection from '../components/CredentialsSection.svelte';
	import ContactSection from '../components/ContactSection.svelte';
	import Footer from '../components/Footer.svelte';

	let activeSection = $state('#home');
	let preloaderDone = $state(false);

	const sectionIds = ['#home', '#why-me', '#skills-projects', '#credentials', '#contact'];

	let observer: IntersectionObserver | null = null;
	let revealObserver: IntersectionObserver | null = null;

	function initObservers() {
		if (typeof window === 'undefined') return;

		const sections = document.querySelectorAll<HTMLElement>('.snap-section');

		// 1. Observer for Active Navigation Section
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = `#${entry.target.id}`;
					}
				});
			},
			{
				rootMargin: '-30% 0px -40% 0px',
				threshold: 0.1
			}
		);

		// 2. Observer for Horizontal Alternating Slide-In Transitions
		revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-revealed');
					}
				});
			},
			{
				threshold: 0.15
			}
		);

		sections.forEach((section, index) => {
			observer?.observe(section);
			// Setup initial transition classes for sections after hero
			if (index > 0) {
				const isOdd = (index + 1) % 2 !== 0;
				section.classList.add(
					'transition-reveal',
					isOdd ? 'reveal-from-right' : 'reveal-from-left'
				);
				revealObserver?.observe(section);
			}
		});
	}

	function handleKeyDown(e: KeyboardEvent) {
		const activeEl = document.activeElement;
		const isInput = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA';
		if (isInput) return;

		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			const currentIndex = sectionIds.indexOf(activeSection);
			if (currentIndex === -1) return;

			let nextIndex = currentIndex;
			if (e.key === 'ArrowDown' && currentIndex < sectionIds.length - 1) {
				nextIndex = currentIndex + 1;
			} else if (e.key === 'ArrowUp' && currentIndex > 0) {
				nextIndex = currentIndex - 1;
			}

			if (nextIndex !== currentIndex) {
				e.preventDefault();
				const targetEl = document.querySelector(sectionIds[nextIndex]);
				if (targetEl) {
					targetEl.scrollIntoView({ behavior: 'smooth' });
				}
			}
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
		if (preloaderDone) {
			initObservers();
		}
	});

	function handlePreloaderComplete() {
		preloaderDone = true;
		setTimeout(() => {
			initObservers();
		}, 80);
	}

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKeyDown);
		}
		if (observer) observer.disconnect();
		if (revealObserver) revealObserver.disconnect();
	});
</script>

<!-- Skip to content for keyboard accessibility -->
<a href="#main-content" class="skip-to-content"> Skip to main content </a>

<!-- Full-screen Honeycomb Preloader with left-to-right single wave ripple -->
<Preloader onComplete={handlePreloaderComplete} />

<!-- Interactive Full-screen Honeycomb Grid Background (Interactive 3D elevation + tap support) -->
<HoneycombBackground />

<!-- Persistent 3D Geometric Background (Subtle wireframe floating shapes) -->
<ThreeBackground />

<!-- Navigation (Desktop fixed side right / Mobile top bar with drawer) -->
<Navigation {activeSection} />

<!-- Main Content Landmark -->
<main id="main-content" class="relative w-full overflow-x-hidden bg-transparent">
	<!-- 01: Hero Section -->
	<HeroSection />

	<!-- 02: Why Me Section with GitHub Stats Box -->
	<WhyMeSection />

	<!-- 03: Skills & Featured Work (Interactive Expanding Squares) -->
	<SkillsProjectsSection />

	<!-- 04: Credentials (Vertical Timeline) -->
	<CredentialsSection />

	<!-- 05: Contact (Direct Channels & Social Links) -->
	<ContactSection />
</main>

<!-- Decorative Black Footer -->
<Footer />

<style>
	:global(.transition-reveal) {
		opacity: 0;
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform, opacity;
	}

	:global(.reveal-from-right) {
		transform: translateX(50px);
	}

	:global(.reveal-from-left) {
		transform: translateX(-50px);
	}

	:global(.transition-reveal.is-revealed) {
		opacity: 1;
		transform: translateX(0);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.transition-reveal) {
			transform: none !important;
			opacity: 1 !important;
			transition: none !important;
		}
	}
</style>
