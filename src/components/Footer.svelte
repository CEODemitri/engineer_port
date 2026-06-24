<script lang="ts">
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			name: 'GitHub',
			href: 'https://github.com/ceodemitri',
			icon: 'fa-brands fa-github'
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/demitri-echols-391225282/',
			icon: 'fa-brands fa-linkedin'
		},
		{
			name: 'X / Twitter',
			href: 'https://x.com/iprogramidesign',
			icon: 'fa-brands fa-x-twitter'
		},
		{
			name: 'CodePen',
			href: 'https://codepen.io/CEODemitri',
			icon: 'fa-brands fa-codepen'
		}
	];

	const navLinks = [
		{ href: '#about', label: 'About' },
		{ href: '#intelligence', label: 'Capabilities' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#value', label: 'Value' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<footer class="border-t border-white/5 bg-surface px-6 py-16 md:px-10">
	<div class="mx-auto max-w-6xl">
		<div class="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">
			<!-- Brand -->
			<div>
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10"
					>
						<span class="font-mono text-xs font-bold text-cyan-400">DE</span>
					</div>
					<span class="font-semibold tracking-widest text-foreground/80 text-sm uppercase" style="font-family: var(--font-sans);"
						>Demitri Echols</span
					>
				</div>
				<p class="max-w-xs text-sm leading-relaxed text-white/40">
					AI-Driven Software Engineer building intelligent systems for an AI-first world.
				</p>
				<div class="mt-6 flex gap-4">
					{#each socialLinks as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.name}
							class="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-cyan-400/40 hover:text-cyan-400"
						>
							<i class="{link.icon} text-xs"></i>
						</a>
					{/each}
				</div>
			</div>

			<!-- Navigation -->
			<div>
				<div class="mb-4 font-mono text-xs tracking-widest text-white/30 uppercase">Navigation</div>
				<ul class="space-y-2">
					{#each navLinks as link}
						<li>
							<a
								href={link.href}
								class="text-sm text-white/45 transition hover:text-cyan-400"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<div class="mb-4 font-mono text-xs tracking-widest text-white/30 uppercase">Contact</div>
				<div class="space-y-3 text-sm text-white/45">
					<div>
						<a
							href="mailto:iprogramidesign@gmail.com"
							class="transition hover:text-cyan-400 break-all"
						>
							iprogramidesign@gmail.com
						</a>
					</div>
					<div class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
						<span class="text-emerald-400/80">Available for new projects</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
			<p class="font-mono text-xs text-white/25">
				&copy; {currentYear} Demitri Echols. All rights reserved.
			</p>
			<p class="font-mono text-xs text-white/20">
				Built with SvelteKit &amp; Tailwind CSS
			</p>
		</div>
	</div>
</footer>

<style>
	:global(.bg-surface) {
		background-color: var(--color-surface);
	}
	:global(.text-foreground) {
		color: var(--color-foreground);
	}
	:global(.text-cyan-400) {
		color: var(--color-cyan);
	}
	:global(.border-cyan-400\/30) {
		border-color: rgba(0, 212, 255, 0.3);
	}
	:global(.border-cyan-400\/40) {
		border-color: rgba(0, 212, 255, 0.4);
	}
	:global(.bg-cyan-400\/10) {
		background-color: rgba(0, 212, 255, 0.1);
	}
</style>
