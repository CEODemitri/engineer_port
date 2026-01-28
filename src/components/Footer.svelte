<script>
	const sections = [
		{
			title: '/about',
			content: 'Software developer focused on clean, minimal, and performant web apps.'
		},
		{
			title: '/contact',
			content: 'Email: iprogramidesign@gmail.com\nPhone: (615) 935-1925'
		},
		{
			title: '/social',
			links: [
				{
					name: 'GitHub',
					href: 'https://github.com/ceodemitri',
					icon: 'fa-brands fa-github'
				},
				{
					name: 'CodePen',
					href: 'https://codepen.io/CEODemitri',
					icon: 'fa-brands fa-codepen'
				},
				{
					name: 'LinkedIn',
					href: 'https://www.linkedin.com/in/demitri-echols-391225282/',
					icon: 'fa-brands fa-linkedin'
				},
				{
					name: 'Twitter',
					href: 'https://x.com/iprogramidesign',
					icon: 'fa-brands fa-x-twitter'
				}
			]
		},
		{
			title: '/projects',
			content: 'Check out my latest projects on GitHub and CodePen.'
		}
	];
</script>

<footer class="border-t border-black bg-slate-200 px-6 py-12 text-black">
	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 text-sm sm:grid-cols-2 md:grid-cols-4">
		{#each sections as section}
			<div class="space-y-3">
				<h3 class="border-b border-black pb-1 text-sm font-medium tracking-wide">
					{section.title}
				</h3>

				{#if section.content}
					<p class="text-[13px] leading-relaxed whitespace-pre-line">{section.content}</p>
				{/if}

				{#if section.links}
					<ul class="space-y-1">
						{#each section.links as link}
							<li>
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-[13px] transition-colors duration-200 hover:text-blue-600 hover:uppercase"
								>
									<i class={link.icon}></i>
									{link.name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-12 text-center text-xs tracking-wide text-black">
		&copy; {new Date().getFullYear()} Demitri Echols. All rights reserved.
	</div>
</footer>
