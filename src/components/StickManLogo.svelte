<script lang="ts">
	interface Props {
		section?: string;
		size?: number | string;
		class?: string;
		color?: string;
		showBadge?: boolean;
		interactive?: boolean;
	}

	let {
		section = '#home',
		size = 40,
		class: className = '',
		color = 'currentColor',
		showBadge = false,
		interactive = true
	}: Props = $props();

	// Normalise section name to pose key
	let pose = $derived.by(() => {
		const s = (section || '').toLowerCase();
		if (s.includes('why-me') || s === '02' || s.includes('02')) return 'why-me';
		if (s.includes('skills') || s.includes('projects') || s === '03' || s.includes('03'))
			return 'skills-projects';
		if (s.includes('credential') || s === '04' || s.includes('04')) return 'credentials';
		if (s.includes('contact') || s === '05' || s.includes('05')) return 'contact';
		if (s.includes('footer')) return 'footer';
		return 'home';
	});

	let poseLabels: Record<string, { title: string; subtitle: string }> = {
		home: { title: 'Zen Meditation', subtitle: 'Profound cross-legged resting pose' },
		'why-me': { title: 'Relaxed Stance', subtitle: 'Weight shift contrapposto pose' },
		'skills-projects': { title: 'Athletic Stance', subtitle: 'Grounded ready posture' },
		credentials: { title: 'Forward Stride', subtitle: 'Marching into the future' },
		contact: { title: 'Casual Wave', subtitle: 'Welcoming human connection' },
		footer: { title: 'Dragon Strike', subtitle: 'Martial arts crane stance' }
	};

	let isHovered = $state(false);
</script>

<div
	class="stickman-wrapper relative inline-flex select-none items-center justify-center {className}"
	style="width: {typeof size === 'number' ? `${size}px` : size}; height: {typeof size === 'number'
		? `${size}px`
		: size};"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="img"
	aria-label="Dynamic Stick Man Logo — {poseLabels[pose]?.title || 'Logo'} ({poseLabels[pose]
		?.subtitle || ''})"
	title="Stick Man: {poseLabels[pose]?.title} ({poseLabels[pose]?.subtitle})"
>
	<svg
		viewBox="0 0 100 100"
		class="h-full w-full overflow-visible transition-transform duration-300 ease-out {isHovered &&
		interactive
			? 'scale-110 -translate-y-0.5'
			: ''}"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style="color: {color};"
	>
		<!-- ─── POSE 1: HOME (Profound Cross-Legged Zen Meditation Resting Pose) ─── -->
		{#if pose === 'home'}
			<g class="animate-fade-in pose-home">
				<!-- Ground line -->
				<line
					x1="16"
					y1="92"
					x2="84"
					y2="92"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					opacity="0.25"
				/>

				<!-- Subtle serenity halo around head -->
				<circle
					cx="50"
					cy="17"
					r="13"
					stroke="#B76E79"
					stroke-width="1.2"
					stroke-dasharray="2 3"
					opacity="0.35"
				/>

				<!-- Head (Serene, upright and centered) -->
				<circle cx="50" cy="17" r="7.5" stroke="currentColor" stroke-width="3.5" fill="none" />

				<!-- Neck Connection -->
				<line
					x1="50"
					y1="24.5"
					x2="50"
					y2="28.5"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				/>

				<!-- Relaxed Broad Shoulders -->
				<line
					x1="34"
					y1="29.5"
					x2="66"
					y2="29.5"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Serene Upright Spine -->
				<line
					x1="50"
					y1="29.5"
					x2="50"
					y2="61"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Pelvic Base -->
				<line
					x1="41"
					y1="61"
					x2="59"
					y2="61"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Left Arm (Upper arm + Forearm resting peacefully on knee) -->
				<path
					d="M 34 29.5 L 22 47 L 24 71"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Left Gyan Mudra Dot -->
				<circle cx="24" cy="71" r="2.5" fill="#B76E79" />

				<!-- Right Arm (Upper arm + Forearm resting peacefully on knee) -->
				<path
					d="M 66 29.5 L 78 47 L 76 71"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Right Gyan Mudra Dot -->
				<circle cx="76" cy="71" r="2.5" fill="#B76E79" />

				<!-- Left Folded Lotus Leg (Grounded knee and thigh) -->
				<path
					d="M 43 61 C 22 67 14 75 18 83 C 22 89 36 89 50 87"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Right Folded Lotus Leg (Grounded knee and thigh) -->
				<path
					d="M 57 61 C 78 67 86 75 82 83 C 78 89 64 89 50 87"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Interlocked crossed ankles/feet -->
				<path
					d="M 30 84 Q 50 88 70 84"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 2: WHY ME (Relaxed Contrapposto Stance) ─── -->
		{:else if pose === 'why-me'}
			<g class="animate-fade-in pose-why-me">
				<!-- Ground line -->
				<line
					x1="22"
					y1="94"
					x2="78"
					y2="94"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					opacity="0.25"
				/>

				<!-- Head -->
				<circle cx="50" cy="14" r="7.5" stroke="currentColor" stroke-width="3.5" fill="none" />
				<line
					x1="50"
					y1="21.5"
					x2="49.5"
					y2="26"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				/>

				<!-- Shoulders (Tilted contrapposto) -->
				<line
					x1="36"
					y1="27"
					x2="63"
					y2="29"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Spine (Relaxed S-curve) -->
				<path
					d="M 49.5 28 Q 52 40 48 54"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					fill="none"
				/>

				<!-- Pelvic Girdle -->
				<line
					x1="39"
					y1="55"
					x2="57"
					y2="53"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Left Arm (Thumb in pocket / hip) -->
				<path
					d="M 36 27 L 27 40 L 39 50"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Right Arm (Relaxed hanging arm) -->
				<path
					d="M 63 29 L 68 44 L 64 60"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Left Leg (Support leg) -->
				<path
					d="M 40 55 L 39 74 L 38 94 L 30 94"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Right Leg (Relaxed leg) -->
				<path
					d="M 56 53 L 64 72 L 60 92 L 67 94"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 3: SKILLS & WORK (Dynamic Athletic Ready Stance) ─── -->
		{:else if pose === 'skills-projects'}
			<g class="animate-fade-in pose-skills">
				<!-- Ground line -->
				<line
					x1="14"
					y1="94"
					x2="86"
					y2="94"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					opacity="0.25"
				/>

				<!-- Head -->
				<circle cx="50" cy="15" r="7.5" stroke="currentColor" stroke-width="3.5" fill="none" />
				<line
					x1="50"
					y1="22.5"
					x2="50"
					y2="26"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				/>

				<!-- Broad Shoulders -->
				<line
					x1="34"
					y1="27"
					x2="66"
					y2="27"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Solid Torso -->
				<line
					x1="50"
					y1="27"
					x2="50"
					y2="55"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Pelvis -->
				<line
					x1="41"
					y1="55"
					x2="59"
					y2="55"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Left Double-Bicep Arm -->
				<path
					d="M 34 27 L 20 27 L 20 12"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<circle cx="20" cy="10" r="2.5" fill="currentColor" />

				<!-- Right Double-Bicep Arm -->
				<path
					d="M 66 27 L 80 27 L 80 12"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<circle cx="80" cy="10" r="2.5" fill="currentColor" />

				<!-- Athletic Power Stance -->
				<path
					d="M 43 55 L 30 73 L 20 94 L 14 94"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<path
					d="M 57 55 L 70 73 L 80 94 L 86 94"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 4: CREDENTIALS (Realistic Climbing Stride) ─── -->
		{:else if pose === 'credentials'}
			<g class="animate-fade-in pose-credentials">
				<!-- Trajectory step guide -->
				<path
					d="M 12 94 L 46 94 L 46 80 L 88 80"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					opacity="0.25"
				/>

				<!-- Head looking up and forward -->
				<circle cx="56" cy="15" r="7.5" stroke="currentColor" stroke-width="3.5" fill="none" />
				<line
					x1="55"
					y1="22.5"
					x2="52"
					y2="26"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				/>

				<!-- Shoulders in dynamic angle -->
				<line
					x1="40"
					y1="28"
					x2="65"
					y2="24"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Forward leaning Torso -->
				<line
					x1="52"
					y1="26"
					x2="42"
					y2="54"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Pelvis -->
				<line
					x1="36"
					y1="55"
					x2="48"
					y2="52"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Leading Arm reaching upward -->
				<path
					d="M 65 24 L 78 18 L 88 12"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<circle cx="89" cy="11" r="2" fill="#B76E79" />

				<!-- Trailing Arm pumping for momentum -->
				<path
					d="M 40 28 L 28 38 L 22 50"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Climbing Front Leg -->
				<path
					d="M 47 53 L 64 54 L 64 80 L 72 80"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Back Push-off Leg -->
				<path
					d="M 38 55 L 26 73 L 18 94 L 12 94"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 5: CONTACT (Realistic Welcoming Stance with Wave) ─── -->
		{:else if pose === 'contact'}
			<g class="animate-fade-in pose-contact">
				<!-- Ground line -->
				<line
					x1="22"
					y1="94"
					x2="78"
					y2="94"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					opacity="0.25"
				/>

				<!-- Head tilted warmly -->
				<circle cx="48" cy="15" r="7.5" stroke="currentColor" stroke-width="3.5" fill="none" />
				<line
					x1="48"
					y1="22.5"
					x2="48"
					y2="26"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				/>

				<!-- Shoulders -->
				<line
					x1="35"
					y1="27"
					x2="62"
					y2="27"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Torso -->
				<line
					x1="48"
					y1="26"
					x2="48"
					y2="54"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Pelvis -->
				<line
					x1="40"
					y1="54"
					x2="56"
					y2="54"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Left Arm (Hand on waist/hip) -->
				<path
					d="M 35 27 L 24 39 L 38 49"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Right Arm (Waving warmly) -->
				<path
					d="M 62 27 L 72 22 L 79 10"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<circle cx="80" cy="8" r="2.5" fill="currentColor" />

				<!-- Wave aura arcs -->
				<path
					d="M 85 6 Q 89 10 85 14"
					stroke="#B76E79"
					stroke-width="1.8"
					stroke-linecap="round"
					fill="none"
				/>
				<path
					d="M 89 3 Q 94 10 89 17"
					stroke="#B76E79"
					stroke-width="1.8"
					stroke-linecap="round"
					fill="none"
				/>

				<!-- Relaxed Standing Legs -->
				<path
					d="M 42 54 L 38 74 L 36 94 L 28 94"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<path
					d="M 54 54 L 59 74 L 62 94 L 69 94"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 6: FOOTER (Shaolin Dragon / Crane Martial Arts Stance) ─── -->
		{:else}
			<g class="animate-fade-in pose-footer">
				<!-- Ground line shadow -->
				<line
					x1="14"
					y1="94"
					x2="86"
					y2="94"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					opacity="0.25"
				/>

				<!-- Head (Focused forward gaze with martial determination) -->
				<circle cx="46" cy="16" r="7.5" stroke="currentColor" stroke-width="3.5" fill="none" />
				<line
					x1="46"
					y1="23.5"
					x2="47"
					y2="28"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				/>

				<!-- Shoulders (Dynamic athletic combat torque) -->
				<line
					x1="33"
					y1="29"
					x2="62"
					y2="25"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Torso / Spine (Coiled athletic martial stance) -->
				<path
					d="M 47 28 Q 44 42 46 56"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					fill="none"
				/>

				<!-- Pelvic Girdle (Rooted low for center of gravity) -->
				<line
					x1="38"
					y1="56"
					x2="54"
					y2="55"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
				/>

				<!-- Lead Striking Arm (Open dragon palm / crane spear hand thrust) -->
				<path
					d="M 62 25 L 78 20 L 92 15"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Extended striking palm / claw -->
				<circle cx="93" cy="14" r="2.5" fill="#B76E79" />
				<path
					d="M 90 11 L 95 14 L 92 18"
					stroke="#B76E79"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Guarding Arm (Chambered tight at ribs in solid fist) -->
				<path
					d="M 33 29 L 20 38 L 32 46"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<circle cx="33" cy="46" r="2.5" fill="currentColor" />

				<!-- Grounded Base Leg (Deep rooted Kung Fu crane stance) -->
				<path
					d="M 40 56 L 28 72 L 24 94 L 16 94"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Chambered Crane Leg (Raised high, foot poised for snap strike) -->
				<path
					d="M 52 55 L 70 44 L 66 70 L 74 74"
					stroke="currentColor"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>

				<!-- Martial Focus Impact Aura Arcs -->
				<path
					d="M 88 8 Q 97 15 90 23"
					stroke="#B76E79"
					stroke-width="1.8"
					stroke-linecap="round"
					fill="none"
				/>
				<path
					d="M 92 5 Q 101 15 94 26"
					stroke="#B76E79"
					stroke-width="1.8"
					stroke-linecap="round"
					fill="none"
				/>
			</g>
		{/if}
	</svg>

	{#if showBadge}
		<span
			class="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-wider text-[#B76E79] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
		>
			{poseLabels[pose]?.title}
		</span>
	{/if}
</div>

<style>
	@keyframes fadeInPose {
		from {
			opacity: 0.2;
			transform: scale(0.92);
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in {
		animation: fadeInPose 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transform-origin: center center;
	}
</style>
