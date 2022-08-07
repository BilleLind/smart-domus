<script>
	import SetTheme from '../routes/stores/setTheme.svelte';

	import Hamburger from 'svelte-hamburgers';

	export let open = false;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css" />
</svelte:head>

<nav class="relative flex justify-between w-full pt-4 mx-auto gap-x-4 whitespace-nowrap">
	<div class="items-center justify-center flex">
		<div class="ml-6 p-1 bg-slate-600 rounded-lg dark:bg-background-dark" aria-haspopup="menu">
			<Hamburger bind:open --color="#03DAC6" --padding="0" />
		</div>
		{#if open}
			<div class="absolute left-0 right-0 top-14 bg-secondary-variant text-on-primary font-medium shadow-md">
				<div class="flex justify-between ml-6 py-1">
					<div class="flex gap-x-6">
						<a href="/blog" class="focus:text-primary focus:outline-none hover:text-primary" aria-label="Goes to the Blog"> Blog </a>
						<a href="/shop" class="focus:text-primary focus:outline-none hover:text-primary" aria-label="Goes to the Webshop"> Shop </a>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="absolute text-center mx-auto w-60 left-0 right-0 text-lg">
		<a href="/" aria-label="Goes to the start page"> Smart Domus </a>
	</div>
	<div class="flex items-center gap-x-6 mr-6">
		<form method="GET">
			<div class="relative text-on-primary mr-4">
				<span class="absolute inset-y-0 right-0 flex items-center pr-2">
					<button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
						<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
					</button>
				</span>
				<input type="search" name="search" id="search" class="py-2 text-xs bg-secondary-variant rounded-md pl-2 focus:outline-none placeholder-on-primary w-72" placeholder="Søg her!" autocomplete="off" />
			</div>
		</form>
		<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="36px" viewBox="0 0 24 24" width="36px" fill="#ffffff"><g><rect fill="none" height="24" width="24" /><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z" /></g></svg>
		<SetTheme />
	</div>
</nav>
