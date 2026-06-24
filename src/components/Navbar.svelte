<script lang="ts">
	import { onMount } from 'svelte';

	let mobileOpen = $state(false);
	let scrolled   = $state(false);
	let dark       = $state(true);

	const links = [
		{ href: '#about',    label: 'About' },
		{ href: '#work',     label: 'What I Do' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#contact',  label: 'Contact' }
	];

	function toggleTheme() {
		dark = !dark;
		if (dark) {
			document.documentElement.classList.remove('light');
		} else {
			document.documentElement.classList.add('light');
		}
	}

	onMount(() => {
		const onScroll = () => { scrolled = window.scrollY > 48; };
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
	style="
		background: {scrolled ? 'rgba(10,10,10,0.9)' : 'transparent'};
		backdrop-filter: {scrolled ? 'blur(20px)' : 'none'};
		border-bottom: {scrolled ? '1px solid var(--color-border)' : '1px solid transparent'};
	"
>
	<nav
		class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
		aria-label="Primary navigation"
	>
		<!-- Logo -->
		<a href="#" class="flex items-center gap-3 group" aria-label="Demitri Echols — home">
			<div
				class="h-8 w-8 rounded-sm flex items-center justify-center text-xs font-bold transition-all duration-300"
				style="
					background: var(--color-orange);
					color: #fff;
					font-family: var(--font-sans);
					font-size: 0.7rem;
					letter-spacing: 0.05em;
				"
			>DE</div>
			<span
				class="text-sm font-semibold tracking-wide hidden sm:block transition-colors duration-200"
				style="color: var(--color-fg); font-family: var(--font-sans);"
			>Demitri Echols</span>
		</a>

		<!-- Desktop links -->
		<ul class="hidden md:flex items-center gap-8" role="list">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="text-sm font-medium transition-colors duration-200 nav-link"
						style="color: var(--color-fg-2); font-family: var(--font-sans);"
					>{link.label}</a>
				</li>
			{/each}
		</ul>

		<!-- Right controls -->
		<div class="flex items-center gap-3">
			<!-- Theme toggle -->
			<button
				onclick={toggleTheme}
				class="h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-200"
				style="background: var(--color-bg-3); color: var(--color-fg-2); border: 1px solid var(--color-border);"
				aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if dark}
					<i class="fas fa-sun text-xs" style="color: var(--color-yellow);"></i>
				{:else}
					<i class="fas fa-moon text-xs" style="color: var(--color-blue);"></i>
				{/if}
			</button>

			<!-- CTA -->
			<a
				href="#contact"
				class="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-sm text-sm font-semibold transition-all duration-200"
				style="
					background: var(--color-orange);
					color: #fff;
					font-family: var(--font-sans);
				"
			>
				Hire Me
			</a>

			<!-- Mobile hamburger -->
			<button
				class="md:hidden h-8 w-8 rounded-full flex items-center justify-center"
				style="background: var(--color-bg-3); border: 1px solid var(--color-border); color: var(--color-fg-2);"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
			>
				<i class="fas {mobileOpen ? 'fa-times' : 'fa-bars'} text-xs"></i>
			</button>
		</div>
	</nav>
</header>

<!-- Mobile overlay -->
{#if mobileOpen}
	<div
		class="fixed inset-0 z-40 md:hidden flex flex-col"
		style="background: var(--color-bg);"
		role="dialog"
		aria-modal="true"
		aria-label="Mobile navigation"
	>
		<div class="flex items-center justify-between px-6 py-4" style="border-bottom: 1px solid var(--color-border);">
			<span class="text-sm font-semibold" style="color: var(--color-fg); font-family: var(--font-sans);">Menu</span>
			<button
				onclick={() => (mobileOpen = false)}
				class="h-8 w-8 flex items-center justify-center rounded-full"
				style="background: var(--color-bg-3); border: 1px solid var(--color-border); color: var(--color-fg-2);"
				aria-label="Close menu"
			>
				<i class="fas fa-times text-xs"></i>
			</button>
		</div>

		<nav class="flex flex-col gap-2 p-6 flex-1">
			{#each links as link}
				<a
					href={link.href}
					onclick={() => (mobileOpen = false)}
					class="py-4 text-2xl font-bold transition-colors duration-200 border-b"
					style="
						color: var(--color-fg);
						border-color: var(--color-border);
						font-family: var(--font-sans);
					"
				>{link.label}</a>
			{/each}
		</nav>

		<div class="p-6">
			<a
				href="#contact"
				onclick={() => (mobileOpen = false)}
				class="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold rounded-sm"
				style="background: var(--color-orange); color: #fff; font-family: var(--font-sans);"
			>Hire Me</a>
		</div>
	</div>
{/if}

<style>
	.nav-link:hover { color: var(--color-fg) !important; }
</style>
