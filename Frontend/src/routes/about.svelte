<script lang="js">
    import Carousel from "$lib/carousel.svelte";

    let slides = [
        {src:"https://picsum.photos/900/600?random=1", alt:"first image", link:"https:://google.com"},
        {src:"https://picsum.photos/900/600?random=2", alt:"second image", link:"https:://google.com"},
        {src:"https://picsum.photos/900/600?random=3", alt:"third image", link:"https:://google.com"}

    ];
</script>
<section>
    About

    <div class="w-[60%]">
        <Carousel bind:slides/>
    </div>
</section>