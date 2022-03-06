<script lang="js">
	import '../app.css'
	import Nav from '../lib/nav.svelte';
	import Footer from '$lib/footer.svelte'
	import { onMount } from 'svelte';

	//there should be a better solution for having double subscribe, localStorage should be onMount but the values are needed for theme_Value. perhaps it is not needed if located in the app.html?
	import { theme } from '../stores/storage';

	onMount(() => {
		if (!('theme' in localStorage)) {
			theme.useLocalStorage();
			theme.set({ ...$theme, mode: 'dark' });
		} else {
			theme.useLocalStorage();
		}
	});
</script>

<div class="w-full text-base bg-background text-on-background dark:bg-background-dark dark:text-on-background-dark">
	<Nav />
	

	
	<main class=" mt-20">
		<slot />
	</main>

	<Footer />
</div>


