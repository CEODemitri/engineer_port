<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import { PORTFOLIO_CONTENT } from '$lib/constants';
	import {
		Mail,
		Phone,
		Github,
		Linkedin,
		Twitter,
		ArrowUpRight,
		Copy,
		Check,
		Download
	} from './icons';

	const contact = PORTFOLIO_CONTENT.contact;

	let qrDataUrl = $state('');
	let copiedField = $state<'email' | 'phone' | null>(null);

	async function generateQrCode() {
		try {
			const targetUrl =
				typeof window !== 'undefined' && window.location.origin
					? `${window.location.origin}/#home`
					: 'https://demitri.dev/#home';

			qrDataUrl = await QRCode.toDataURL(targetUrl, {
				margin: 0,
				width: 260,
				color: {
					dark: '#000000',
					light: '#FFFFFF'
				}
			});
		} catch (e) {
			console.error('Error generating QR code:', e);
		}
	}

	function handleQrClick(e: MouseEvent) {
		e.preventDefault();
		if (typeof document !== 'undefined') {
			const homeEl = document.querySelector('#home');
			if (homeEl) {
				homeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
				try {
					history.pushState(null, '', '#home');
				} catch {
					// Fallback
				}
			}
		}
	}

	async function copyToClipboard(text: string, field: 'email' | 'phone') {
		try {
			await navigator.clipboard.writeText(text);
			copiedField = field;
			setTimeout(() => {
				if (copiedField === field) {
					copiedField = null;
				}
			}, 2000);
		} catch {
			copiedField = field;
			setTimeout(() => {
				copiedField = null;
			}, 1800);
		}
	}

	function downloadVCard() {
		const originUrl =
			typeof window !== 'undefined' ? window.location.origin : 'https://demitri.dev';
		const vCardLines = [
			'BEGIN:VCARD',
			'VERSION:3.0',
			'N:Echols;Demitri;;;',
			'FN:Demitri Echols',
			'ORG:Creative Developer & Software Engineering',
			'TITLE:Creative Developer & Software Engineer',
			`EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
			`TEL;TYPE=CELL,WORK:${contact.phone}`,
			`URL:${originUrl}`,
			'NOTE:Creative Developer specializing in Full-Stack Systems, Operations Analytics, and AI Integration.',
			'END:VCARD'
		];

		const blob = new Blob([vCardLines.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Demitri_Echols.vcf');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}

	onMount(() => {
		generateQrCode();
	});
</script>

<section
	id="contact"
	data-section="05"
	class="snap-section relative box-border flex h-screen h-dvh min-h-screen min-h-dvh w-full flex-col items-center justify-center overflow-hidden border-t border-[#E5E5E5]/60 bg-transparent px-4 pt-16 pb-6 sm:px-6 lg:py-6 lg:px-8"
	aria-label="Contact Business Card"
>
	<div class="my-auto flex w-full max-w-2xl flex-col items-center justify-center">
		<!-- Section Header -->
		<div class="mb-4 w-full text-left">
			<span class="font-mono text-xs uppercase tracking-[0.15em] text-[#B76E79]">
				{contact.sectionNumber} // {contact.sectionTitle}
			</span>
		</div>

		<!-- Clean Business Card -->
		<div
			class="relative w-full border border-[#000000] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
			role="region"
			aria-label="Demitri Echols Business Card"
		>
			<!-- Card Header -->
			<div class="border-b border-[#E5E5E5] pb-5">
				<h2 class="font-heading text-2xl uppercase tracking-tight text-[#000000] sm:text-3xl">
					DEMITRI ECHOLS
				</h2>
				<p class="font-body mt-1 text-sm font-medium text-[#4682B4]">
					Creative Developer &amp; Software Engineer
				</p>
			</div>

			<!-- Card Content: QR Code & Direct Contact Info (No inner container boxes) -->
			<div
				class="grid grid-cols-1 items-center gap-6 border-b border-[#E5E5E5] py-6 sm:grid-cols-12 sm:gap-8"
			>
				<!-- QR Code directly on card -->
				<div class="flex flex-col items-center justify-center sm:col-span-4">
					<a
						href="#home"
						onclick={handleQrClick}
						class="group relative block cursor-pointer"
						title="Tap to jump to homepage"
						aria-label="QR Code to Demitri Homepage"
					>
						{#if qrDataUrl}
							<img
								src={qrDataUrl}
								alt="QR Code to Homepage"
								class="h-28 w-28 object-contain transition-transform group-hover:scale-105 sm:h-32 sm:w-32"
								width="128"
								height="128"
								loading="eager"
							/>
						{:else}
							<div class="h-28 w-28 bg-neutral-100 sm:h-32 sm:w-32"></div>
						{/if}
					</a>
				</div>

				<!-- Contact Details & Actions -->
				<div class="flex flex-col gap-4 sm:col-span-8">
					<!-- Email -->
					<div class="flex items-center justify-between gap-3">
						<a
							href="mailto:{contact.email}"
							class="group flex min-w-0 items-center gap-3 text-left transition-colors"
							aria-label="Send email to {contact.email}"
						>
							<Mail size={18} class="shrink-0 text-[#4682B4]" />
							<span
								class="font-body truncate text-sm font-medium text-[#000000] transition-colors group-hover:text-[#4682B4] sm:text-base"
							>
								{contact.email}
							</span>
						</a>
						<button
							type="button"
							onclick={() => copyToClipboard(contact.email, 'email')}
							class="shrink-0 cursor-pointer p-1 text-[#666666] transition-colors hover:text-[#000000]"
							title="Copy email to clipboard"
							aria-label="Copy email"
						>
							{#if copiedField === 'email'}
								<Check size={16} class="text-[#39FF14]" />
							{:else}
								<Copy size={16} />
							{/if}
						</button>
					</div>

					<!-- Phone -->
					<div class="flex items-center justify-between gap-3">
						<a
							href="tel:{contact.phone}"
							class="group flex min-w-0 items-center gap-3 text-left transition-colors"
							aria-label="Call {contact.phone}"
						>
							<Phone size={18} class="shrink-0 text-[#4682B4]" />
							<span
								class="font-body truncate text-sm font-medium text-[#000000] transition-colors group-hover:text-[#4682B4] sm:text-base"
							>
								{contact.phone}
							</span>
						</a>
						<button
							type="button"
							onclick={() => copyToClipboard(contact.phone, 'phone')}
							class="shrink-0 cursor-pointer p-1 text-[#666666] transition-colors hover:text-[#000000]"
							title="Copy phone number to clipboard"
							aria-label="Copy phone"
						>
							{#if copiedField === 'phone'}
								<Check size={16} class="text-[#39FF14]" />
							{:else}
								<Copy size={16} />
							{/if}
						</button>
					</div>

					<!-- Save Contact Action -->
					<div class="pt-1">
						<button
							type="button"
							onclick={downloadVCard}
							class="inline-flex cursor-pointer items-center gap-2 border border-[#000000] bg-[#000000] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#333333] focus-visible:outline-none"
							aria-label="Download vCard contact file (.vcf)"
						>
							<Download size={14} class="text-[#B76E79]" />
							<span>Save to Contacts (.vcf)</span>
						</button>
					</div>
				</div>
			</div>

			<!-- Card Footer: Socials -->
			<div class="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs">
				<div class="flex flex-wrap items-center gap-6">
					{#each contact.socials as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex items-center gap-1.5 font-body text-xs font-medium text-[#333333] transition-colors hover:text-[#39FF14]"
							aria-label="{social.label} ({social.handle})"
						>
							{#if social.label === 'GitHub'}
								<Github size={16} />
							{:else if social.label === 'LinkedIn'}
								<Linkedin size={16} />
							{:else if social.label === 'Twitter/X'}
								<Twitter size={16} />
							{/if}
							<span>{social.label}</span>
							<ArrowUpRight size={12} class="opacity-40 group-hover:opacity-100" />
						</a>
					{/each}
				</div>

				<div class="font-mono text-[0.65rem] uppercase tracking-wider text-[#999999]">
					USA // REMOTE
				</div>
			</div>
		</div>
	</div>
</section>
