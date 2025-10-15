<script>
    export let projectTitle;
    export let techStack;
</script>

<div>
    <div class="project_bg"></div>
    <div>
        <h3>{projectTitle}</h3>
        <h4>Stack: {techStack}</h4>
        
        <div>
            <p>{description}</p>
        </div>
    </div>
    <div>
        <a href="#">Live Site</a>
        <a href="#">View Repo</a>
    </div>
</div>