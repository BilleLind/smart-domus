<script>
    import Hamburger from 'svelte-hamburgers'

    export let open = false;
</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css" />

</svelte:head>

<Hamburger bind:open  />