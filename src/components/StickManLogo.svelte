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
		home: { title: 'Chill Lean', subtitle: 'Side view, arms crossed' },
		'why-me': { title: 'Zen Meditation', subtitle: 'Cross-legged lotus pose' },
		'skills-projects': { title: 'Power Flex', subtitle: 'Double bicep strong pose' },
		credentials: { title: 'Upward Climb', subtitle: 'Marching into the future' },
		contact: { title: 'Friendly Wave', subtitle: 'Welcoming connection' },
		footer: { title: 'Victory Cheer', subtitle: 'Celebration jump' }
	};

	let isHovered = $state(false);
</script>

<div
	class="stickman-wrapper relative inline-flex items-center justify-center select-none {className}"
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
		class="w-full h-full overflow-visible transition-transform duration-300 ease-out {isHovered &&
		interactive
			? 'scale-110 -translate-y-0.5'
			: ''}"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style="color: {color};"
	>
		<!-- ─── POSE 1: HOME (Side view, arms crossed, leaning back against wall) ─── -->
		{#if pose === 'home'}
			<g class="pose-home animate-fade-in">
				<!-- Invisible wall reference line (subtle architectural dash) -->
				<line
					x1="24"
					y1="16"
					x2="24"
					y2="92"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-dasharray="2 3"
					opacity="0.25"
				/>
				<!-- Ground line -->
				<line
					x1="18"
					y1="94"
					x2="65"
					y2="94"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					opacity="0.35"
				/>
				<!-- Head (tilted back slightly against wall) -->
				<circle cx="40" cy="22" r="10" stroke="currentColor" stroke-width="4.5" fill="none" />
				<!-- Slanted Torso (leaning back against x=24) -->
				<line
					x1="38"
					y1="32"
					x2="32"
					y2="60"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
				/>
				<!-- Back Leg (propping straight against wall) -->
				<path
					d="M 32 60 L 28 78 L 46 94"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Front Leg (crossed / relaxed bend) -->
				<path
					d="M 32 60 Q 46 66 44 76 L 31 90"
					stroke="currentColor"
					stroke-width="4"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Crossed Arms (folded comfortably across chest) -->
				<path
					d="M 36 38 Q 56 42 54 48 Q 50 54 36 52"
					stroke="currentColor"
					stroke-width="4"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<path
					d="M 36 40 Q 28 46 40 52 Q 52 50 48 44"
					stroke="currentColor"
					stroke-width="4"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 2: WHY ME (Sitting cross-legged meditation / Zen lotus) ─── -->
		{:else if pose === 'why-me'}
			<g class="pose-why-me animate-fade-in">
				<!-- Ground line -->
				<line
					x1="16"
					y1="92"
					x2="84"
					y2="92"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					opacity="0.35"
				/>
				<!-- Head (centered, peaceful) -->
				<circle cx="50" cy="22" r="10" stroke="currentColor" stroke-width="4.5" fill="none" />
				<!-- Upright straight Spine -->
				<line
					x1="50"
					y1="32"
					x2="50"
					y2="66"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
				/>
				<!-- Left Arm resting on left knee -->
				<path
					d="M 50 38 L 26 54 L 20 74"
					stroke="currentColor"
					stroke-width="4"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Right Arm resting on right knee -->
				<path
					d="M 50 38 L 74 54 L 80 74"
					stroke="currentColor"
					stroke-width="4"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Left folded leg (Lotus / cross-legged) -->
				<path
					d="M 50 66 Q 24 74 18 82 Q 22 90 48 88"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Right folded leg (Lotus / cross-legged) -->
				<path
					d="M 50 66 Q 76 74 82 82 Q 78 90 52 88"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Subtle mudra fingertips (Zen energy) -->
				<circle cx="20" cy="74" r="2.5" fill="#B76E79" />
				<circle cx="80" cy="74" r="2.5" fill="#B76E79" />
			</g>

			<!-- ─── POSE 3: SKILLS & WORK (Strong pose / double bicep flex) ─── -->
		{:else if pose === 'skills-projects'}
			<g class="pose-skills animate-fade-in">
				<!-- Ground line -->
				<line
					x1="12"
					y1="94"
					x2="88"
					y2="94"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					opacity="0.35"
				/>
				<!-- Head (proud chin upright) -->
				<circle cx="50" cy="18" r="10" stroke="currentColor" stroke-width="4.5" fill="none" />
				<!-- Powerful upright torso -->
				<line
					x1="50"
					y1="28"
					x2="50"
					y2="60"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
				/>
				<!-- Left Double-Bicep Flexing Arm (elbow out, forearm straight UP, fist) -->
				<path
					d="M 50 34 L 24 34 L 24 16"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<circle cx="24" cy="14" r="3.5" fill="currentColor" />
				<!-- Right Double-Bicep Flexing Arm (elbow out, forearm straight UP, fist) -->
				<path
					d="M 50 34 L 76 34 L 76 16"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<circle cx="76" cy="14" r="3.5" fill="currentColor" />
				<!-- Power Stance Legs (planted wide & strong) -->
				<path
					d="M 50 60 L 32 76 L 20 94"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<path
					d="M 50 60 L 68 76 L 80 94"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Muscle power arcs / sparks -->
				<path
					d="M 15 22 Q 11 25 15 28"
					stroke="#B76E79"
					stroke-width="2"
					stroke-linecap="round"
					fill="none"
				/>
				<path
					d="M 85 22 Q 89 25 85 28"
					stroke="#B76E79"
					stroke-width="2"
					stroke-linecap="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 4: CREDENTIALS (Marching / Climbing Upward into the Future) ─── -->
		{:else if pose === 'credentials'}
			<g class="pose-credentials animate-fade-in">
				<!-- Incline / Trajectory stairs cue -->
				<path
					d="M 10 94 L 44 94 L 44 80 L 88 80"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					opacity="0.35"
				/>
				<!-- Head (tilted upward looking towards the summit) -->
				<circle cx="58" cy="18" r="10" stroke="currentColor" stroke-width="4.5" fill="none" />
				<!-- Angled torso leading decisively forward -->
				<line
					x1="56"
					y1="28"
					x2="42"
					y2="58"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
				/>
				<!-- Leading arm (pointing proudly upward & forward) -->
				<path
					d="M 52 34 L 84 18"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					fill="none"
				/>
				<circle cx="86" cy="17" r="2.5" fill="#B76E79" />
				<!-- Trailing arm (pumping back for momentum) -->
				<path
					d="M 52 34 L 28 46"
					stroke="currentColor"
					stroke-width="4"
					stroke-linecap="round"
					fill="none"
				/>
				<!-- Front climbing leg (high step onto higher stair at y=80) -->
				<path
					d="M 42 58 L 66 58 L 66 80"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Back push-off leg (grounded at y=94) -->
				<path
					d="M 42 58 L 28 74 L 18 94"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 5: CONTACT (Friendly Wave & Warm Welcome) ─── -->
		{:else if pose === 'contact'}
			<g class="pose-contact animate-fade-in">
				<!-- Ground line -->
				<line
					x1="22"
					y1="94"
					x2="78"
					y2="94"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					opacity="0.35"
				/>
				<!-- Head (tilted charmingly) -->
				<circle cx="48" cy="18" r="10" stroke="currentColor" stroke-width="4.5" fill="none" />
				<!-- Torso -->
				<line
					x1="48"
					y1="28"
					x2="48"
					y2="60"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
				/>
				<!-- Left arm on hip (casual friendly posture) -->
				<path
					d="M 48 34 L 28 46 L 36 56"
					stroke="currentColor"
					stroke-width="4"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Right arm raised high waving -->
				<path
					d="M 48 34 L 70 30 L 78 12"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<circle cx="80" cy="10" r="3" fill="currentColor" />
				<!-- Animated wave ripples -->
				<path
					d="M 86 8 Q 90 12 86 16"
					stroke="#B76E79"
					stroke-width="2"
					stroke-linecap="round"
					fill="none"
				/>
				<path
					d="M 90 5 Q 95 12 90 19"
					stroke="#B76E79"
					stroke-width="2"
					stroke-linecap="round"
					fill="none"
				/>
				<!-- Relaxed standing legs -->
				<path
					d="M 48 60 L 36 94"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					fill="none"
				/>
				<path
					d="M 48 60 L 60 94"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					fill="none"
				/>
			</g>

			<!-- ─── POSE 6: FOOTER / CELEBRATION (Victory Jump) ─── -->
		{:else}
			<g class="pose-footer animate-fade-in">
				<!-- Head (joyful) -->
				<circle cx="50" cy="16" r="10" stroke="currentColor" stroke-width="4.5" fill="none" />
				<!-- Torso in mid-air -->
				<line
					x1="50"
					y1="26"
					x2="50"
					y2="56"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
				/>
				<!-- Both arms up in victory "V" -->
				<path
					d="M 50 32 L 22 12"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					fill="none"
				/>
				<path
					d="M 50 32 L 78 12"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					fill="none"
				/>
				<!-- Bent jumping legs -->
				<path
					d="M 50 56 L 32 72 L 38 88"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<path
					d="M 50 56 L 68 72 L 62 88"
					stroke="currentColor"
					stroke-width="4.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
				<!-- Sparkles -->
				<circle cx="16" cy="8" r="2.5" fill="#B76E79" />
				<circle cx="84" cy="8" r="2.5" fill="#B76E79" />
			</g>
		{/if}
	</svg>

	{#if showBadge}
		<span
			class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.55rem] text-[#B76E79] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
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
			transform: scale(1);
		}
	}

	.animate-fade-in {
		animation: fadeInPose 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transform-origin: center center;
	}
</style>
