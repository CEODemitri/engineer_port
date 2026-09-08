<script lang="ts">
	import { PORTFOLIO_CONTENT, type NavItem } from '$lib/constants';
	import { Menu, X } from './icons';
	import StickManLogo from './StickManLogo.svelte';

	let { activeSection = '#home' }: { activeSection?: string } = $props();
	let mobileMenuOpen = $state(false);

	const navItems: NavItem[] = PORTFOLIO_CONTENT.navLinks;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function handleNavClick(e: MouseEvent, target: string) {
		mobileMenuOpen = false;
		if (typeof document !== 'undefined') {
			const targetEl = document.querySelector(target);
			if (targetEl) {
				e.preventDefault();
				targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
				try {
					history.pushState(null, '', target);
				} catch {
					// Fallback for restricted frame contexts
				}
			}
		}
	}
</script>

<!-- ─── Desktop Fixed Side Navigation (Right side, vertically centered) ─── -->
<nav
	id="desktop-nav"
	class="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-auto"
	aria-label="Desktop Primary Navigation"
>
	<!-- Dynamic Stick Man Logo at top of sidebar (pose changes per active section) -->
	<div class="mb-8 flex flex-col items-end">
		<a
			href="#home"
			onclick={(e) => handleNavClick(e, '#home')}
			class="p-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4682B4] group inline-flex flex-col items-center"
			aria-label="Scroll to home — Demitri dynamic stick man logo"
		>
			<StickManLogo
				section={activeSection}
				size={42}
				color="#000000"
				showBadge={true}
				class="transition-all duration-300 group-hover:scale-110"
			/>
		</a>
		<span class="font-heading text-[0.65rem] tracking-widest text-[#000000] mt-1">DEMITRI</span>
	</div>

	<!-- Section Links Container -->
	<div class="relative flex items-stretch pr-4">
		<ul class="flex flex-col gap-6 items-end" role="list">
			{#each navItems as item}
				{@const isActive = activeSection === item.target}
				<li role="listitem">
					<a
						href={item.target}
						data-target={item.target}
						onclick={(e) => handleNavClick(e, item.target)}
						class="flex items-center gap-2 text-right cursor-pointer py-1 select-none font-mono text-[0.65rem] tracking-[0.12em] uppercase transition-colors duration-200 hover:text-[#4682B4] focus-visible:outline-none"
						style="color: {isActive ? '#000000' : '#666666'}; font-weight: {isActive ? 600 : 400};"
						aria-current={isActive ? 'page' : undefined}
					>
						{#if isActive}
							<!-- Rose gold dot indicator before active text -->
							<span class="w-1.5 h-1.5 bg-[#B76E79] inline-block" aria-hidden="true"></span>
						{/if}
						<span class="font-mono text-[0.55rem] text-[#B76E79]">{item.number}</span>
						<span>{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<!-- ─── Mobile Fixed Top Bar ─── -->
<header
	id="mobile-nav"
	class="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E5E5E5] px-5 py-3 flex items-center justify-between"
>
	<a
		href="#home"
		onclick={(e) => handleNavClick(e, '#home')}
		class="flex items-center gap-3 cursor-pointer group"
		aria-label="Home — Demitri stick man logo"
	>
		<StickManLogo
			section={activeSection}
			size={32}
			color="#000000"
			class="transition-transform duration-200 group-hover:scale-105"
		/>
		<span class="font-heading text-sm text-[#000000] tracking-wider">DEMITRI</span>
	</a>

	<!-- Lucide Menu Hamburger button -->
	<button
		type="button"
		onclick={toggleMobileMenu}
		class="w-11 h-11 flex items-center justify-center text-[#000000] hover:text-[#4682B4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4682B4] cursor-pointer"
		aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
		aria-expanded={mobileMenuOpen}
	>
		{#if mobileMenuOpen}
			<X size={24} />
		{:else}
			<Menu size={24} />
		{/if}
	</button>
</header>

<!-- ─── Mobile Drawer (Slides from right, focus trapped, clean full-height) ─── -->
{#if mobileMenuOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-none"
		onclick={toggleMobileMenu}
		aria-hidden="true"
	></div>
{/if}

<div
	id="mobile-drawer"
	class="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 bg-white border-l border-[#E5E5E5] p-8 flex flex-col justify-between transition-transform duration-300 ease-out {mobileMenuOpen
		? 'translate-x-0'
		: 'translate-x-full'}"
	role="dialog"
	aria-modal="true"
	aria-label="Mobile Navigation Menu"
>
	<div>
		<div class="flex items-center justify-between pb-6 border-b border-[#E5E5E5]">
			<div class="flex items-center gap-3">
				<StickManLogo section={activeSection} size={32} color="#000000" />
				<span class="font-heading text-sm text-[#000000] tracking-wider">DEMITRI</span>
			</div>
			<button
				type="button"
				onclick={toggleMobileMenu}
				class="w-11 h-11 flex items-center justify-center text-[#000000] hover:text-[#4682B4] cursor-pointer"
				aria-label="Close menu"
			>
				<X size={24} />
			</button>
		</div>

		<nav class="mt-10" aria-label="Mobile menu links">
			<ul class="flex flex-col gap-6" role="list">
				{#each navItems as item}
					{@const isActive = activeSection === item.target}
					<li class="mobile-nav-item" role="listitem">
						<a
							href={item.target}
							onclick={(e) => handleNavClick(e, item.target)}
							class="w-full flex items-center justify-between text-left py-3 cursor-pointer text-base font-body font-medium"
							style="color: {isActive ? '#000000' : '#333333'};"
						>
							<span class="flex items-center gap-3">
								{#if isActive}
									<span class="w-2 h-2 bg-[#B76E79]" aria-hidden="true"></span>
								{/if}
								<span class="font-heading text-lg {isActive ? 'text-black' : 'text-[#333333]'}">
									{item.label}
								</span>
							</span>
							<span class="font-mono text-xs text-[#B76E79]">{item.number}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="pt-6 border-t border-[#E5E5E5]">
		<p class="font-mono text-[0.7rem] text-[#666666] uppercase tracking-wider">
			MARCHING TOWARDS THE FUTURE
		</p>
		<p class="font-mono text-[0.65rem] text-[#999999] mt-1">&copy; 2024 DEMITRI</p>
	</div>
</div>
