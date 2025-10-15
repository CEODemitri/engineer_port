<script>
  // Example footer content - adjust as needed
  const sections = [
    {
      title: 'About',
      content: 'Software developer focused on clean, minimal, and performant web apps.'
    },
    {
      title: 'Contact',
      content: 'Email: your.email@example.com\nPhone: (123) 456-7890'
    },
    {
      title: 'Social',
      links: [
        { name: 'GitHub', href: 'https://github.com/yourusername' },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
        { name: 'Twitter', href: 'https://twitter.com/yourusername' }
      ]
    },
    {
      title: 'Projects',
      content: 'Check out my latest projects on GitHub and CodePen.'
    }
  ];
</script>

<footer class="bg-white text-black border-t border-black p-8">
  <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {#each sections as section}
      <div class="space-y-3">
        <h3 class="font-bold text-lg border-b border-black pb-1">{section.title}</h3>
        {#if section.content}
          <p class="whitespace-pre-line">{section.content}</p>
        {/if}
        {#if section.links}
          <ul class="space-y-1">
            {#each section.links as link}
              <li>
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="hover:underline"
                >
                  {link.name}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>
</footer>
