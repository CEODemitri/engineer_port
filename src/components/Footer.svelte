<script lang="ts">
	const year = new Date().getFullYear();

	const links = [
		{ href: '#about',    label: 'About' },
		{ href: '#work',     label: 'What I Do' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#contact',  label: 'Contact' }
	];

	const socials = [
		{ href: 'https://github.com/ceodemitri',                        icon: 'fab fa-github',    label: 'GitHub' },
		{ href: 'https://www.linkedin.com/in/demitri-echols-391225282/', icon: 'fab fa-linkedin',  label: 'LinkedIn' },
		{ href: 'https://x.com/iprogramidesign',                        icon: 'fab fa-x-twitter', label: 'X / Twitter' },
		{ href: 'https://codepen.io/CEODemitri',                        icon: 'fab fa-codepen',   label: 'CodePen' }
	];
</script>

<footer
	style="
		background: var(--color-bg-2);
		border-top: 1px solid var(--color-border);
	"
>
	<div class="mx-auto max-w-6xl px-6 py-16 md:px-10">
		<div class="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">

			<!-- Brand -->
			<div>
				<div class="mb-4 flex items-center gap-3">
					<div
						class="h-8 w-8 rounded-sm flex items-center justify-center text-xs font-bold"
						style="background: var(--color-orange); color: #fff; font-family: var(--font-sans);"
					>DE</div>
					<span
						class="text-sm font-semibold tracking-wide"
						style="color: var(--color-fg); font-family: var(--font-sans);"
					>Demitri Echols</span>
				</div>
				<p
					class="max-w-xs text-sm leading-relaxed"
					style="color: var(--color-fg-3);"
				>Software engineer building AI systems, full-stack apps, and automation tools that help businesses grow.</p>

				<div class="mt-6 flex gap-3">
					{#each socials as s}
						<a
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={s.label}
							class="h-8 w-8 rounded-sm flex items-center justify-center transition-opacity hover:opacity-60"
							style="
								background: var(--color-bg-3);
								border: 1px solid var(--color-border);
								color: var(--color-fg-3);
							"
						>
							<i class="{s.icon} text-xs"></i>
						</a>
					{/each}
				</div>
			</div>

			<!-- Nav -->
			<div>
				<p
					class="mb-4 text-xs font-semibold tracking-widest uppercase"
					style="color: var(--color-fg-3); font-family: var(--font-mono);"
				>Navigation</p>
				<ul class="flex flex-col gap-2.5">
					{#each links as l}
						<li>
							<a
								href={l.href}
								class="text-sm transition-opacity hover:opacity-60"
								style="color: var(--color-fg-2);"
							>{l.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<p
					class="mb-4 text-xs font-semibold tracking-widest uppercase"
					style="color: var(--color-fg-3); font-family: var(--font-mono);"
				>Get In Touch</p>
				<a
					href="mailto:iprogramidesign@gmail.com"
					class="text-sm break-all transition-opacity hover:opacity-60"
					style="color: var(--color-fg-2);"
				>iprogramidesign@gmail.com</a>
				<div class="mt-4 flex items-center gap-2">
					<span
						class="h-1.5 w-1.5 rounded-full"
						style="background: var(--color-green);"
					></span>
					<span
						class="text-xs"
						style="color: var(--color-green); font-family: var(--font-mono);"
					>Available for new work</span>
				</div>
			</div>
		</div>

		<!-- Bottom rule -->
		<div
			class="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
			style="border-top: 1px solid var(--color-border);"
		>
			<p
				class="text-xs"
				style="color: var(--color-fg-3); font-family: var(--font-mono);"
			>&copy; {year} Demitri Echols. All rights reserved.</p>
			<p
				class="text-xs"
				style="color: var(--color-fg-3); font-family: var(--font-mono);"
			>Built with SvelteKit &amp; Tailwind CSS</p>
		</div>
	</div>
</footer>
