<script>
    export let src;
    export let alt;
    export let projectTitle;
    export let techStack;
    export let description;
</script>

<div class="h-[475px] w-[325px] grid grid-cols-6 grid-rows-7 m-auto px-2">
    <div class="flex col-span-full justify-between row-start-1">
        <a href="#" class="bg-stone-900 h-fit p-2 text-white">Live Site</a>
        <a href="#" class="h-fit p-2 bg-stone-500">View Repo</a>
    </div>

    <h4 class="row-start-2">Stack: {techStack}</h4>
    
    <img {src} {alt} class="project_bg col-span-full row-start-3 bg-red-400 h-16 w-16 m-auto"/>
    
    <h3 class="w-full text-center text-3xl font-bold row-start-4 mt-4 col-start-2 col-span-4">{projectTitle}</h3>    
    <p class="row-start-6 col-span-full">{description}</p>  
</div>