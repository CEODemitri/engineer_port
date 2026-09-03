<script lang="ts">
	import { PORTFOLIO_CONTENT } from '$lib/constants';
	import { Mail, Phone, Github, Linkedin, Twitter, ArrowUpRight } from './icons';

	const contact = PORTFOLIO_CONTENT.contact;
</script>

<section
	id="contact"
	data-section="05"
	class="snap-section relative min-h-screen w-full flex items-center justify-center px-6 py-24 lg:py-32 z-10 bg-transparent border-t border-[#E5E5E5]/60"
	aria-label="Contact Information"
>
	<div class="max-w-[640px] w-full mx-auto text-center flex flex-col items-center">
		<!-- Section Header -->
		<div class="mb-4">
			<span class="font-mono text-xs text-[#B76E79] uppercase tracking-[0.15em]">
				{contact.sectionNumber} // {contact.sectionTitle}
			</span>
		</div>

		<h2
			class="font-heading text-[#000000] uppercase tracking-[-0.01em] leading-tight mb-8"
			style="font-size: clamp(1.5rem, 3vw, 2.25rem);"
		>
			{contact.heading}
		</h2>

		<p class="font-body text-base text-[#666666] leading-relaxed max-w-lg mb-12">
			Available for production engineering contracts, technical strategy consulting, and high-impact
			full-stack development.
		</p>

		<!-- Direct Contact Channels -->
		<div class="w-full flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-12">
			<!-- Email -->
			<a
				href="mailto:{contact.email}"
				class="flex-1 spec-card bg-[#F5F5F5] border border-[#E5E5E5] hover:border-[#4682B4] hover:text-[#4682B4] p-5 flex items-center justify-center gap-3 font-body font-medium text-base text-[#333333] transition-colors duration-200 focus-visible:outline-none"
				aria-label="Send email to {contact.email}"
			>
				<Mail size={20} class="text-[#4682B4]" />
				<span class="truncate">{contact.email}</span>
			</a>

			<!-- Phone -->
			<a
				href="tel:{contact.phone}"
				class="flex-1 spec-card bg-[#F5F5F5] border border-[#E5E5E5] hover:border-[#4682B4] hover:text-[#4682B4] p-5 flex items-center justify-center gap-3 font-body font-medium text-base text-[#333333] transition-colors duration-200 focus-visible:outline-none"
				aria-label="Call {contact.phone}"
			>
				<Phone size={20} class="text-[#4682B4]" />
				<span>{contact.phone}</span>
			</a>
		</div>

		<!-- Social Networks (Electric Green hover per spec) -->
		<div class="w-full pt-8 border-t border-[#E5E5E5]">
			<p class="font-mono text-xs text-[#666666] uppercase tracking-widest mb-6">
				DIRECT SOCIAL CHANNELS
			</p>

			<div class="flex flex-wrap justify-center gap-6 sm:gap-10">
				{#each contact.socials as social}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 font-body font-medium text-sm text-[#333333] hover:text-[#39FF14] transition-colors duration-200 focus-visible:outline-none group"
						aria-label="{social.label} ({social.handle})"
					>
						{#if social.label === 'GitHub'}
							<Github size={20} />
						{:else if social.label === 'LinkedIn'}
							<Linkedin size={20} />
						{:else if social.label === 'Twitter/X'}
							<Twitter size={20} />
						{/if}
						<span>{social.label}</span>
						<ArrowUpRight size={14} class="opacity-40 group-hover:opacity-100" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
