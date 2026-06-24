<script lang="ts">
	import { onMount } from 'svelte';

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	const navLinks = [
		{ href: '#about', label: 'About' },
		{ href: '#intelligence', label: 'Capabilities' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#value', label: 'Value' },
		{ href: '#contact', label: 'Contact' }
	];

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 40;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
	class:scrolled-nav={scrolled}
>
	<nav
		class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
		aria-label="Primary navigation"
	>
		<!-- Logo / Name -->
		<a href="#" class="group flex items-center gap-3" aria-label="Demitri Echols home">
			<div
				class="relative flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/20"
			>
				<span class="text-xs font-bold text-cyan-400 font-mono">DE</span>
				<span
					class="absolute inset-0 rounded-full border border-cyan-400/20 pulse-ring pointer-events-none"
				></span>
			</div>
			<span
				class="text-sm font-semibold tracking-widest text-platinum/80 uppercase transition-colors duration-300 group-hover:text-platinum"
				style="font-family: var(--font-sans);"
			>
				Demitri Echols
			</span>
		</a>

		<!-- Desktop Nav Links -->
		<ul class="hidden items-center gap-8 md:flex" role="list">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="relative text-sm font-medium tracking-wide text-white/50 transition-colors duration-300 hover:text-cyan-400 nav-link"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- CTA Button -->
		<div class="hidden items-center gap-4 md:flex">
			<a
				href="#contact"
				class="group relative overflow-hidden rounded-full border border-cyan-400/40 px-5 py-2 text-sm font-medium text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:text-background"
				style="font-family: var(--font-sans);"
			>
				<span
					class="absolute inset-0 -translate-x-full bg-cyan-400 transition-transform duration-300 group-hover:translate-x-0"
				></span>
				<span class="relative z-10">Let&apos;s Talk</span>
			</a>
		</div>

		<!-- Mobile Menu Toggle -->
		<button
			class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-400/40 md:hidden"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileMenuOpen}
		>
			{#if mobileMenuOpen}
				<i class="fas fa-times text-sm text-cyan-400"></i>
			{:else}
				<i class="fas fa-bars text-sm text-white/70"></i>
			{/if}
		</button>
	</nav>
</header>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<div
		class="fixed inset-0 z-40 md:hidden"
		role="dialog"
		aria-modal="true"
		aria-label="Mobile navigation"
	>
		<!-- Backdrop -->
		<button
			class="absolute inset-0 w-full h-full bg-background/95 backdrop-blur-2xl border-0 cursor-default"
			onclick={() => (mobileMenuOpen = false)}
			aria-label="Close menu"
			tabindex="-1"
		></button>

		<!-- Menu Content -->
		<div class="relative flex h-full flex-col items-center justify-center gap-8 p-8">
			<ul class="flex flex-col items-center gap-6" role="list">
				{#each navLinks as link, i}
					<li style="animation-delay: {i * 0.06}s" class="reveal">
						<a
							href={link.href}
							onclick={() => (mobileMenuOpen = false)}
							class="text-3xl font-semibold tracking-tight text-white/70 transition-colors duration-200 hover:text-cyan-400"
							style="font-family: var(--font-sans);"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>

			<a
				href="#contact"
				onclick={() => (mobileMenuOpen = false)}
				class="mt-4 rounded-full border border-cyan-400/40 px-8 py-3 text-sm font-medium text-cyan-400 transition hover:bg-cyan-400/10"
				style="font-family: var(--font-sans);"
			>
				Let&apos;s Talk
			</a>

			<div class="mt-8 flex gap-6 text-white/40">
				<a
					href="https://github.com/ceodemitri"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					class="transition hover:text-cyan-400"
				>
					<i class="fab fa-github text-lg"></i>
				</a>
				<a
					href="https://www.linkedin.com/in/demitri-echols-391225282/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					class="transition hover:text-cyan-400"
				>
					<i class="fab fa-linkedin text-lg"></i>
				</a>
				<a
					href="https://x.com/iprogramidesign"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="X / Twitter"
					class="transition hover:text-cyan-400"
				>
					<i class="fab fa-x-twitter text-lg"></i>
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	header {
		background: transparent;
	}

	header.scrolled-nav {
		background: rgba(8, 10, 15, 0.85);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-cyan);
		transition: width 0.3s ease;
	}

	.nav-link:hover::after {
		width: 100%;
	}

	:global(.text-background) {
		color: var(--color-background);
	}
	:global(.bg-background) {
		background-color: var(--color-background);
	}
</style>
