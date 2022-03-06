<script>
    export let slides;

    let index = 0;

    const next = () => {
        index = (index + 1) % slides.length
    }
    const previous = () => {
        if(index === 0) {
            index = slides.length-1
        } else {
            index = (index - 1) % slides.length
        }
    }
</script>

{#each [slides[index]] as slide (index) }
<div class="w-full flex flex-col items-center relative selection:bg-none">

    <a href="{slide.link}" class="w-[65%] flex flex-col items-center">
        <img  src="{slide.src}" alt="{slide.alt}" class="aspect-video w-full rounded-lg shadow-lg bg-slate-600" >
    </a>
    <button on:click="{previous}" class="absolute top-[50%] left-[17.5%] hover:bg-primary text-secondary  transform rotate-180 bg-slate-600 rounded-lg" ><svg xmlns="http://www.w3.org/2000/svg" height="46px" viewBox="0 0 24 24" width="46px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg></button>
    <button on:click="{next}" class="absolute top-[50%] right-[17.5%] hover:bg-primary text-secondary bg-slate-600 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" height="46px" viewBox="0 0 24 24" width="46px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg></button>
    <div class="flex absolute bottom-[2%] left-[47.5%] bg-slate-600 rounded-lg p-1">
        {#each slides as slide, i}
        {#if i === index}
        <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/></svg>
        {:else}
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></g></svg>
        {/if}
        {/each}
    </div>
</div>

{/each}
