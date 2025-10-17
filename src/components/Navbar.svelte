<script>
	let mobileMenuOpen = false;
</script>

<!-- Main Nav -->
<nav
	class="relative z-50 flex items-center justify-between bg-gray-100 p-4 font-mono shadow-md md:p-6"
>
	<!-- Left menu (desktop) -->
	<ul class="ml-6 hidden gap-6 text-base font-medium tracking-wide md:flex">
		<li><a href="#" class="transition hover:uppercase">/console</a></li>
		<li><a href="#about" class="transition hover:uppercase">/stack</a></li>
		<li><a href="#benefit" class="transition hover:uppercase">/value</a></li>
		<li><a href="#projects" class="transition hover:uppercase">/build</a></li>
		<li><a href="#blog" class="transition hover:uppercase">/git</a></li>
		<li><a href="#contact" class="transition hover:uppercase">/ping</a></li>
	</ul>

	<!-- Name -->
	<div
		class="mr-4 bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-base text-lg font-semibold tracking-tight text-transparent md:mr-6 md:text-lg"
	>
		Demitri Echols
	</div>

	<!-- Mobile Menu Button -->
	<button
		class="rounded p-2 text-2xl transition hover:bg-gray-200 md:hidden"
		on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
		aria-label="Open menu"
	>
		<i class="fas fa-terminal"></i>
	</button>
</nav>

<!-- Mobile Sidebar Menu -->
<div
	class="fixed top-0 right-0 z-40 h-full w-64 transform bg-blue-900 text-white transition-transform duration-300 ease-in-out md:hidden"
	class:translate-x-0={mobileMenuOpen}
	class:translate-x-full={!mobileMenuOpen}
>
	<div class="flex items-center justify-between border-b border-gray-700 p-4">
		<p class="text-lg font-bold">Menu</p>
		<button on:click={() => (mobileMenuOpen = false)} aria-label="Close menu">
			<i class="fas fa-times text-xl"></i>
		</button>
	</div>

	<ul class="flex flex-col gap-4 p-6 text-base font-medium">
		<li><a href="#" on:click={() => (mobileMenuOpen = false)}>/console</a></li>
		<li><a href="#about" on:click={() => (mobileMenuOpen = false)}>/stack</a></li>
		<li><a href="#contact" on:click={() => (mobileMenuOpen = false)}>/value</a></li>
		<li><a href="#projects" on:click={() => (mobileMenuOpen = false)}>/build</a></li>
		<li><a href="#blog" on:click={() => (mobileMenuOpen = false)}>/git</a></li>
		<li><a href="#contact" on:click={() => (mobileMenuOpen = false)}>/ping</a></li>
	</ul>
</div>

<!-- Optional backdrop -->
{#if mobileMenuOpen}
	<div
		class="bg-opacity-40 fixed inset-0 z-30 bg-black md:hidden"
		on:click={() => (mobileMenuOpen = false)}
	></div>
{/if}

<!-- refactor: for each loop -->
