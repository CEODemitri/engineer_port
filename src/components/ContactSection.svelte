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
		Download,
		QrCode
	} from './icons';
	import StickManLogo from './StickManLogo.svelte';

	const contact = PORTFOLIO_CONTENT.contact;

	let qrDataUrl = $state('');
	let copiedField = $state<'email' | 'phone' | 'url' | null>(null);
	let cardSide = $state<'front' | 'back'>('front');

	async function generateQrCode() {
		try {
			const targetUrl =
				typeof window !== 'undefined' && window.location.origin
					? `${window.location.origin}/#home`
					: 'https://demitri.dev/#home';

			qrDataUrl = await QRCode.toDataURL(targetUrl, {
				margin: 1,
				width: 240,
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

	async function copyToClipboard(text: string, field: 'email' | 'phone' | 'url') {
		try {
			await navigator.clipboard.writeText(text);
			copiedField = field;
			setTimeout(() => {
				if (copiedField === field) {
					copiedField = null;
				}
			}, 2200);
		} catch {
			// Fallback if clipboard API is restricted
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
			'NOTE:360+ Technical Certifications. Focus in Full-Stack Systems, Operations Analytics, and AI Integration.',
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

	function toggleCardSide() {
		cardSide = cardSide === 'front' ? 'back' : 'front';
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
	<!-- Viewport container: Strictly fits within 100vh on mobile and desktop -->
	<div class="my-auto flex w-full max-w-4xl flex-col items-center justify-center">
		<!-- Section Subtitle & Flip Toggle -->
		<div class="mb-3 flex w-full max-w-[620px] items-center justify-between px-1 sm:mb-4">
			<div class="flex items-center gap-2">
				<span
					class="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#B76E79] sm:text-xs"
				>
					{contact.sectionNumber} // {contact.sectionTitle}
				</span>
				<span class="text-xs text-[#E5E5E5]">/</span>
				<span
					class="hidden font-mono text-[0.6rem] uppercase tracking-wider text-[#666666] xs:inline"
				>
					DIGITAL BUSINESS CARD
				</span>
			</div>

			<button
				type="button"
				onclick={toggleCardSide}
				class="inline-flex cursor-pointer items-center gap-1.5 border border-[#E5E5E5] bg-white px-2.5 py-1 font-mono text-[0.65rem] text-[#333333] transition-all hover:border-[#4682B4] hover:text-[#4682B4] focus-visible:outline-none sm:text-xs"
				aria-label="Flip business card between contact info and technical specs"
			>
				<span>{cardSide === 'front' ? 'View Specs' : 'View Card'}</span>
				<span class="text-[#B76E79]">↻</span>
			</button>
		</div>

		<!-- ─── THE BUSINESS CARD CONTAINER ─── -->
		<div
			class="relative w-full max-w-[620px] border border-[#000000] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300"
			role="region"
			aria-label="Demitri Echols Business Card"
		>
			<!-- Corner Blueprint Crosshairs (+) -->
			<div
				class="pointer-events-none absolute -top-1.5 -left-1.5 select-none font-mono text-[10px] leading-none text-[#000000]"
			>
				+
			</div>
			<div
				class="pointer-events-none absolute -top-1.5 -right-1.5 select-none font-mono text-[10px] leading-none text-[#000000]"
			>
				+
			</div>
			<div
				class="pointer-events-none absolute -bottom-1.5 -left-1.5 select-none font-mono text-[10px] leading-none text-[#000000]"
			>
				+
			</div>
			<div
				class="pointer-events-none absolute -bottom-1.5 -right-1.5 select-none font-mono text-[10px] leading-none text-[#000000]"
			>
				+
			</div>

			<!-- Top Decorative Metallic / Color Accent Line -->
			<div class="h-1 w-full bg-gradient-to-r from-[#000000] via-[#B76E79] to-[#4682B4]"></div>

			<!-- ─── FRONT OF BUSINESS CARD ─── -->
			{#if cardSide === 'front'}
				<div class="animate-fade-card flex flex-col justify-between p-4 sm:p-6 lg:p-7">
					<!-- Top Card Header: Brand Wordmark + Dynamic Stick Man Logo -->
					<div class="flex items-start justify-between gap-4 border-b border-[#E5E5E5] pb-4">
						<div class="flex flex-col">
							<div class="flex items-center gap-2">
								<h2
									class="font-heading text-xl uppercase leading-none tracking-tight text-[#000000] sm:text-2xl"
								>
									DEMITRI ECHOLS
								</h2>
							</div>
							<p class="font-body mt-1 text-xs font-medium text-[#4682B4] sm:text-sm">
								Creative Developer &amp; Software Engineer
							</p>
							<div class="mt-1 flex items-center gap-2 font-mono text-[0.65rem] text-[#666666]">
								<span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#39FF14]"
								></span>
								<span class="uppercase tracking-wider">Available for Contracts &amp; Roles</span>
							</div>
						</div>

						<!-- Dynamic Stick Man Logo (Pose 05: Friendly Wave) -->
						<div class="flex shrink-0 flex-col items-center">
							<a
								href="#home"
								onclick={handleQrClick}
								class="group flex cursor-pointer flex-col items-center border border-[#E5E5E5] bg-[#F5F5F5] p-1.5 transition-colors hover:border-[#4682B4]"
								title="Click to jump to homepage"
								aria-label="Demitri waving stickman logo — click to scroll to top"
							>
								<StickManLogo
									section="#contact"
									size={40}
									color="#000000"
									class="transition-transform group-hover:scale-110"
								/>
							</a>
							<span class="mt-0.5 font-mono text-[0.55rem] text-[#999999]">POSE // 05</span>
						</div>
					</div>

					<!-- Middle Zone: QR Code & Main Channels -->
					<div
						class="grid grid-cols-1 items-center gap-4 border-b border-[#E5E5E5] py-4 sm:grid-cols-12 sm:py-5"
					>
						<!-- Left Col (QR Code Block): Links directly to homepage -->
						<div
							class="flex flex-col items-center justify-center border border-[#E5E5E5] bg-[#FAFAFA] p-3 sm:col-span-5"
						>
							<a
								href="#home"
								onclick={handleQrClick}
								class="group relative block border border-[#E5E5E5] bg-white p-1.5 transition-all duration-200 hover:border-[#000000]"
								title="Scan with phone or click to visit homepage"
								aria-label="QR Code linking to Demitri portfolio homepage"
							>
								<!-- QR Matrix -->
								{#if qrDataUrl}
									<img
										src={qrDataUrl}
										alt="QR Code to Demitri Homepage"
										class="h-24 w-24 object-contain sm:h-28 sm:w-28"
										width="112"
										height="112"
										loading="eager"
									/>
								{:else}
									<div
										class="flex h-24 w-24 items-center justify-center bg-slate-50 sm:h-28 sm:w-28"
									>
										<QrCode size={40} class="animate-pulse text-[#666666]" />
									</div>
								{/if}

								<!-- QR Hover / Tap Overlay Cue -->
								<div
									class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-2 text-center text-white opacity-0 transition-opacity group-hover:opacity-100"
								>
									<ArrowUpRight size={18} class="mb-0.5 text-[#39FF14]" />
									<span class="font-mono text-[0.6rem] font-medium uppercase tracking-wider"
										>Jump to Home</span
									>
								</div>
							</a>

							<div class="mt-2 text-center">
								<span
									class="block font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-[#333333]"
								>
									Homepage QR
								</span>
								<span class="block font-mono text-[0.55rem] text-[#888888]">
									Scan or tap to visit
								</span>
							</div>
						</div>

						<!-- Right Col: Direct Channels (Email & Phone & vCard) -->
						<div class="flex flex-col gap-2.5 sm:col-span-7">
							<!-- Email Row -->
							<div class="flex w-full items-center gap-1.5">
								<a
									href="mailto:{contact.email}"
									class="group flex min-w-0 flex-1 items-center gap-2.5 border border-[#E5E5E5] bg-[#F5F5F5] px-3 py-2 text-left transition-colors hover:border-[#4682B4] hover:bg-[#FFFFFF]"
									aria-label="Send email to {contact.email}"
								>
									<Mail size={16} class="shrink-0 text-[#4682B4]" />
									<div class="flex min-w-0 flex-col truncate">
										<span class="font-mono text-[0.55rem] uppercase tracking-wider text-[#888888]"
											>Email</span
										>
										<span
											class="font-body truncate text-xs font-medium text-[#000000] group-hover:text-[#4682B4] sm:text-sm"
										>
											{contact.email}
										</span>
									</div>
								</a>
								<button
									type="button"
									onclick={() => copyToClipboard(contact.email, 'email')}
									class="shrink-0 cursor-pointer border border-[#E5E5E5] bg-[#F5F5F5] p-2.5 text-[#666666] transition-colors hover:border-[#000000] hover:bg-white hover:text-[#000000]"
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

							<!-- Phone Row -->
							<div class="flex w-full items-center gap-1.5">
								<a
									href="tel:{contact.phone}"
									class="group flex min-w-0 flex-1 items-center gap-2.5 border border-[#E5E5E5] bg-[#F5F5F5] px-3 py-2 text-left transition-colors hover:border-[#4682B4] hover:bg-[#FFFFFF]"
									aria-label="Call {contact.phone}"
								>
									<Phone size={16} class="shrink-0 text-[#4682B4]" />
									<div class="flex min-w-0 flex-col truncate">
										<span class="font-mono text-[0.55rem] uppercase tracking-wider text-[#888888]"
											>Phone</span
										>
										<span
											class="font-body truncate text-xs font-medium text-[#000000] group-hover:text-[#4682B4] sm:text-sm"
										>
											{contact.phone}
										</span>
									</div>
								</a>
								<button
									type="button"
									onclick={() => copyToClipboard(contact.phone, 'phone')}
									class="shrink-0 cursor-pointer border border-[#E5E5E5] bg-[#F5F5F5] p-2.5 text-[#666666] transition-colors hover:border-[#000000] hover:bg-white hover:text-[#000000]"
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

							<!-- Save Contact (vCard download) button -->
							<button
								type="button"
								onclick={downloadVCard}
								class="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#000000] px-3 py-2 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#333333] focus-visible:outline-none active:bg-[#4682B4]"
								aria-label="Download vCard contact file (.vcf)"
							>
								<Download size={14} class="text-[#B76E79]" />
								<span>Save to Contacts (.vcf)</span>
							</button>
						</div>
					</div>

					<!-- Bottom Card Footer: Social Channels & Quick Info -->
					<div class="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs">
						<!-- Social Links (Clean unboxed style) -->
						<div class="flex flex-wrap items-center gap-4 sm:gap-6">
							{#each contact.socials as social}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class="group inline-flex items-center gap-1.5 font-body text-xs font-medium text-[#333333] transition-colors hover:text-[#39FF14]"
									aria-label="{social.label} ({social.handle})"
								>
									{#if social.label === 'GitHub'}
										<Github size={15} />
									{:else if social.label === 'LinkedIn'}
										<Linkedin size={15} />
									{:else if social.label === 'Twitter/X'}
										<Twitter size={15} />
									{/if}
									<span>{social.label}</span>
									<ArrowUpRight size={12} class="opacity-40 group-hover:opacity-100" />
								</a>
							{/each}
						</div>

						<div class="font-mono text-[0.6rem] uppercase tracking-wider text-[#999999]">
							USA // REMOTE
						</div>
					</div>
				</div>
			{:else}
				<!-- ─── BACK OF BUSINESS CARD (Specs, Stack & Credentials) ─── -->
				<div class="animate-fade-card flex flex-col justify-between p-4 sm:p-6 lg:p-7">
					<!-- Back Header -->
					<div class="flex items-start justify-between gap-4 border-b border-[#E5E5E5] pb-3">
						<div>
							<span class="block font-mono text-[0.65rem] uppercase tracking-wider text-[#B76E79]">
								TECHNICAL SPECIFICATIONS //
							</span>
							<h3 class="font-heading mt-0.5 text-lg uppercase text-[#000000] sm:text-xl">
								ENGINEERING PROFILE
							</h3>
						</div>
						<button
							type="button"
							onclick={toggleCardSide}
							class="cursor-pointer p-1 font-mono text-xs text-[#666666] hover:text-[#000000]"
							aria-label="Return to front of card"
						>
							[ BACK ]
						</button>
					</div>

					<!-- Back Details Grid -->
					<div class="grid grid-cols-1 gap-4 py-4 text-xs sm:grid-cols-2">
						<!-- Focus Areas -->
						<div class="border border-[#E5E5E5] bg-[#FAFAFA] p-3">
							<span
								class="mb-1.5 block font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-[#4682B4]"
							>
								Core Competencies
							</span>
							<ul class="font-body space-y-1 text-xs text-[#333333]">
								<li>• Full-Stack Architecture (SvelteKit, Next.js, Node.js)</li>
								<li>• AI &amp; LLM Systems Integration</li>
								<li>• High-Performance Operations Analytics</li>
								<li>• Distributed Databases &amp; Real-time WebSockets</li>
							</ul>
						</div>

						<!-- Credentials Summary -->
						<div class="border border-[#E5E5E5] bg-[#FAFAFA] p-3">
							<span
								class="mb-1.5 block font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-[#4682B4]"
							>
								Credentials &amp; Velocity
							</span>
							<ul class="font-body space-y-1 text-xs text-[#333333]">
								<li>• B.S. in Software Engineering (WGU)</li>
								<li>• 360+ Industry Certifications (Google, IBM)</li>
								<li>• 2,500+ GitHub Commits Shipped</li>
								<li>• Turnaround Response: &lt; 24h</li>
							</ul>
						</div>
					</div>

					<!-- Back Footer: Quick Return + Direct Contact CTA -->
					<div class="flex items-center justify-between border-t border-[#E5E5E5] pt-3">
						<span class="font-mono text-[0.6rem] text-[#666666]"> DEMITRI.DEV // v2026.CARD </span>
						<button
							type="button"
							onclick={toggleCardSide}
							class="cursor-pointer bg-[#000000] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#4682B4]"
						>
							Show Contact QR
						</button>
					</div>
				</div>
			{/if}
		</div>

		<!-- Quick Hint Under Card -->
		<p class="mt-4 text-center font-mono text-[0.65rem] uppercase tracking-widest text-[#888888]">
			[ TAP QR CODE TO JUMP TO HOMEPAGE ]
		</p>
	</div>
</section>

<style>
	@keyframes fadeCard {
		from {
			opacity: 0.4;
			transform: scale(0.985);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-fade-card {
		animation: fadeCard 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
