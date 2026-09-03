<script lang="ts">
	let { size = 20, class: className = '' } = $props<{ size?: number; class?: string }>();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
	aria-hidden="true"
>
	<rect width="20" height="16" x="2" y="4" rx="0" />
	<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
</svg>
