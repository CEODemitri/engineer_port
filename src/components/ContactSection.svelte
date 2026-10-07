<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import { PORTFOLIO_CONTENT } from '$lib/constants';
	import { Github, Linkedin, Twitter, Download } from './icons';

	const contact = PORTFOLIO_CONTENT.contact;

	let qrDataUrl = $state('');
	let copiedField = $state<'email' | 'phone' | null>(null);

	async function generateQrCode() {
		try {
			const targetUrl =
				typeof window !== 'undefined' && window.location.origin
					? `${window.location.origin}/#home`
					: 'https://demitri.dev/#home';

			// Slightly greyed white QR code with sharp contrast on light background
			qrDataUrl = await QRCode.toDataURL(targetUrl, {
				margin: 0,
				width: 340,
				color: {
					dark: '#2A2A2E',
					light: '#00000000'
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
	class="snap-section relative box-border flex h-screen h-dvh max-h-screen max-h-dvh w-full flex-col items-center justify-center overflow-hidden border-t border-[#E5E5E5]/60 bg-transparent px-4 pt-14 pb-4 sm:px-6 sm:pt-16 sm:pb-6 lg:py-6 lg:px-12"
	aria-label="Contact Business Card"
>
	<div class="my-auto flex w-full max-w-4xl flex-col items-center justify-center">
		<!-- Section Header -->
		<div class="mb-2.5 flex w-full max-w-3xl items-center justify-between px-1 sm:mb-3">
			<div class="flex items-center gap-2">
				<span class="h-1.5 w-1.5 bg-[#000000]"></span>
				<span class="font-mono text-xs uppercase tracking-[0.2em] text-[#000000]">
					{contact.sectionNumber} // {contact.sectionTitle}
				</span>
			</div>
		</div>

		<!-- ─── White Mode Stencil Business Card (Layered Shadows & Tones of White) ─── -->
		<div
			class="relative w-full max-w-3xl overflow-hidden border border-[#E2E2E6] bg-[#FFFFFF] p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.03)]"
			role="region"
			aria-label="Demitri Echols Business Card"
		>
			<!-- ─── Stencil Overlays (White Tones & Subtle Shadows connecting patterns) ─── -->
			<!-- Big Overlapping White/Shadow Stencil Shapes -->
			<div
				class="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-[#F7F7F9] border border-[#EDEDF0] shadow-[inset_0_2px_12px_rgba(0,0,0,0.02)] opacity-90 sm:h-72 sm:w-72"
				aria-hidden="true"
			></div>

			<div
				class="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#F3F3F6] border border-[#E8E8EC] shadow-[0_8px_24px_rgba(0,0,0,0.03)] opacity-80 sm:h-80 sm:w-80"
				aria-hidden="true"
			></div>

			<!-- Secondary Stencil Quadrant connecting the layout -->
			<div
				class="pointer-events-none absolute top-1/4 left-1/3 h-48 w-48 rotate-12 border border-[#E5E5E8] bg-[#FAFAFC]/60 opacity-60"
				aria-hidden="true"
			></div>

			<!-- Subtle Asian Architectural Watermarks in white shadow tones -->
			<span
				class="font-mincho pointer-events-none absolute left-8 bottom-4 select-none text-7xl font-light text-[#E2E2E6]/60 sm:text-8xl"
				aria-hidden="true"
			>
				印
			</span>
			<span
				class="font-mincho pointer-events-none absolute right-12 top-4 select-none text-6xl font-light text-[#E8E8EC]/70 sm:text-7xl"
				aria-hidden="true"
			>
				結
			</span>

			<!-- ─── Card Core Content (Strict 3-Zone Architecture) ─── -->
			<div
				class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[300px] sm:min-h-[340px]"
			>
				<!-- 1. TOP-LEFT ANCHOR: Smaller Name & Role Title -->
				<div
					class="md:col-span-4 flex flex-col items-start justify-start self-start text-left pt-1"
				>
					<div
						class="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-[#888888] mb-1"
					>
						<span>{'{ DEV }'}</span>
						<span>/</span>
						<span>USA</span>
					</div>

					<h2
						class="font-heading text-xl sm:text-2xl lg:text-[1.75rem] uppercase leading-tight tracking-tight text-[#000000]"
					>
						DEMITRI ECHOLS
					</h2>

					<p class="font-body text-xs sm:text-sm font-medium text-[#4682B4] mt-1">
						Creative Developer
					</p>

					<p class="font-mono text-[0.65rem] text-[#777777] uppercase tracking-wider mt-0.5">
						Software Engineer
					</p>

					<div class="mt-4 pt-3 border-t border-[#EAEAEA] w-full max-w-[180px]">
						<span class="font-mono text-[0.6rem] uppercase tracking-widest text-[#999999] block">
							LOCATION
						</span>
						<span class="font-mono text-xs text-[#222222] font-medium block"> USA // REMOTE </span>
					</div>
				</div>

				<!-- 2. CENTER: QR Code with Ghosted QR Cutout Overlaps Behind -->
				<div class="md:col-span-4 flex flex-col items-center justify-center relative py-2">
					<!-- Layer 1: Ghosted QR Stencil Cutout Layer 1 (Offset Top-Left, low opacity) -->
					{#if qrDataUrl}
						<div
							class="pointer-events-none absolute -top-2 -left-2 sm:-top-3 sm:-left-3 h-28 w-28 sm:h-36 sm:w-36 opacity-10 blur-[0.5px]"
							aria-hidden="true"
						>
							<img src={qrDataUrl} alt="" class="h-full w-full object-contain filter grayscale" />
						</div>

						<!-- Layer 2: Ghosted QR Stencil Cutout Layer 2 (Offset Bottom-Right, lower opacity) -->
						<div
							class="pointer-events-none absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 h-28 w-28 sm:h-36 sm:w-36 opacity-15"
							aria-hidden="true"
						>
							<img src={qrDataUrl} alt="" class="h-full w-full object-contain filter contrast-50" />
						</div>
					{/if}

					<!-- Primary Center QR Code (Slightly greyed white card framing) -->
					<a
						href="#home"
						onclick={handleQrClick}
						class="group relative z-10 block cursor-pointer border border-[#E2E2E6] bg-[#FFFFFF] p-2.5 sm:p-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#000000] hover:scale-105"
						title="Tap to visit homepage"
						aria-label="QR Code linking to Demitri portfolio homepage"
					>
						{#if qrDataUrl}
							<img
								src={qrDataUrl}
								alt="Homepage QR Code"
								class="h-36 w-36 object-contain sm:h-44 sm:w-44"
								width="176"
								height="176"
								loading="eager"
							/>
						{:else}
							<div class="h-36 w-36 sm:h-44 sm:w-44 bg-[#FAFAFA]"></div>
						{/if}

						<!-- Stencil Corner Brackets -->
						<div
							class="pointer-events-none absolute -top-1 -left-1 font-mono text-[9px] text-[#000000] leading-none"
						>
							⌜
						</div>
						<div
							class="pointer-events-none absolute -top-1 -right-1 font-mono text-[9px] text-[#000000] leading-none"
						>
							⌝
						</div>
						<div
							class="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[9px] text-[#000000] leading-none"
						>
							⌞
						</div>
						<div
							class="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[9px] text-[#000000] leading-none"
						>
							⌟
						</div>
					</a>
				</div>

				<!-- 3. RIGHT SIDE: Social Icons Column Above Lower-Right Contact Square -->
				<div class="md:col-span-4 flex flex-col items-end justify-between self-stretch">
					<!-- Top-Right Column of Social Icons (Stacked vertically) -->
					<div class="flex flex-row md:flex-col items-center md:items-end gap-3.5 mb-4">
						{#each contact.socials as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="group flex items-center gap-2 text-xs font-mono text-[#555555] hover:text-[#000000] transition-colors py-0.5"
								aria-label="{social.label} ({social.handle})"
								title={social.label}
							>
								<span
									class="hidden sm:inline text-[0.65rem] uppercase opacity-70 group-hover:opacity-100 font-mono"
								>
									{social.label === 'Twitter/X' ? 'X.COM' : social.label}
								</span>
								<div
									class="p-1.5 bg-[#F7F7F9] border border-[#E5E5E8] group-hover:border-[#000000] group-hover:bg-[#FFFFFF] transition-all"
								>
									{#if social.label === 'GitHub'}
										<Github size={15} />
									{:else if social.label === 'LinkedIn'}
										<Linkedin size={15} />
									{:else if social.label === 'Twitter/X'}
										<Twitter size={15} />
									{/if}
								</div>
							</a>
						{/each}
					</div>

					<!-- Lower-Right Contact Info -->
					<div class="flex flex-col items-end justify-end text-right w-full mt-auto space-y-2.5">
						<!-- Email -->
						<button
							type="button"
							onclick={() => copyToClipboard(contact.email, 'email')}
							class="group flex flex-col items-end text-right cursor-pointer transition-all hover:opacity-80 py-0.5"
							title="Click to copy {contact.email}"
							aria-label="Click to copy email {contact.email}"
						>
							<div class="flex items-center justify-end gap-2">
								{#if copiedField === 'email'}
									<span
										class="font-mono text-[0.6rem] uppercase tracking-wider text-[#39FF14] bg-[#000000] px-1.5 py-0.5 font-bold"
									>
										COPIED ✓
									</span>
								{/if}
								<span
									class="font-body text-xs sm:text-sm text-[#000000] font-medium group-hover:text-[#4682B4] transition-colors"
								>
									{contact.email}
								</span>
							</div>
						</button>

						<!-- Phone -->
						<button
							type="button"
							onclick={() => copyToClipboard(contact.phone, 'phone')}
							class="group flex flex-col items-end text-right cursor-pointer transition-all hover:opacity-80 py-0.5"
							title="Click to copy {contact.phone}"
							aria-label="Click to copy phone {contact.phone}"
						>
							<div class="flex items-center justify-end gap-2">
								{#if copiedField === 'phone'}
									<span
										class="font-mono text-[0.6rem] uppercase tracking-wider text-[#39FF14] bg-[#000000] px-1.5 py-0.5 font-bold"
									>
										COPIED ✓
									</span>
								{/if}
								<span
									class="font-mono text-xs text-[#222222] font-medium group-hover:text-[#4682B4] transition-colors"
								>
									{contact.phone}
								</span>
							</div>
						</button>

						<!-- Save to Contacts Button -->
						<button
							type="button"
							onclick={downloadVCard}
							class="mt-1 flex items-center justify-end gap-1.5 bg-[#000000] hover:bg-[#333333] text-white py-1.5 px-3 font-mono text-[0.65rem] uppercase tracking-wider transition-colors cursor-pointer"
							aria-label="Download vCard contact file (.vcf)"
						>
							<Download size={13} class="text-[#B76E79]" />
							<span>Save to Contacts (.vcf)</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
