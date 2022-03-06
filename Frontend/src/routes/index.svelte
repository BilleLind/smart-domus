<script context="module" lang="js">
	export async function load({ fetch }) {
		const res = await fetch('https://smart-domus-339113.ew.r.appspot.com/api');
		const content = await res.json();

		if (res.ok) {
			return {
				props: {
					slides: content.slides,
					sections: content.section
				}
			};
		}
		return {
			status: res.status,
			error: new Error('Kunne ikke hente indhold')
		};
	}
</script>

<script lang="js">
	import Carousel from '$lib/carousel.svelte';
	import Icon from '$lib/icon.svelte';

	export let slides = [],
		sections = {};
</script>

<section class="">
	<div>
		<Carousel bind:slides />
	</div>
</section>

<section class="mt-[10%] w-[90%] mx-auto flex items-center gap-x-16">
	<div class="self-center w-full relative">
		<a href={sections.first.bigCard.link}>
			<img src={sections.first.bigCard.img} alt={sections.first.bigCard.alt} class="rounded-lg w-full" />
			<h3 class="hover:underline rounded-lg bg-slate-600 bg-opacity-80 p-2 absolute {sections.first.bigCard.headerClass}">{sections.first.bigCard.header}</h3>
		</a>
	</div>

	<div class="grid grid-flow-row-dense grid-cols-2 items-center gap-12 w-full">
		{#each sections.first.cards as card}
			<div class="p-4 bg-surface-dark brightness-150 rounded-lg">
				<a href={`/shop/kategories/${card.link}`} class="hover:underline">
					<Icon key={card.svg} class="w-[60%] h-[60%] mx-auto" />
					<h4 class="text-center text-lg pt-4">{card.header}</h4>
					<!--<p class="text-sm">{card.body}</p>-->
				</a>
			</div>
		{/each}
	</div>
</section>

<section class="mt-[10%] w-[90%] mx-auto flex items-center gap-x-16">
	<div class="grid grid-flow-row-dense grid-cols-2 items-center gap-12 w-full">
		{#each sections.second.cards as card}
			<div class="p-4 bg-surface-dark brightness-150 rounded-lg">
				<a href={`/shop/kategories/${card.link}`} class="hover:underline">
					<Icon key={card.svg} class="w-[60%] h-[60%] mx-auto" />
					<h4 class="text-center text-lg pt-4">{card.header}</h4>
					<!--<p class="text-sm">{card.body}</p>-->
				</a>
			</div>
		{/each}
	</div>
	<div class="self-center w-full relative">
		<a href={sections.second.bigCard.link}>
			<img src={sections.second.bigCard.img} alt={sections.second.bigCard.alt} class="rounded-lg w-full" />
			<h3 class="hover:underline rounded-lg bg-slate-600 bg-opacity-80 p-2 absolute {sections.second.bigCard.headerClass}">{sections.second.bigCard.header}</h3>
		</a>
	</div>
</section>

<section class="mt-[10%] w-[90%] mx-auto flex justify-around items-center gap-x-16 divide-x-2 divide-slate-600">
	<a href="/" class="hover:underline w-full flex justify-center items-center ">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-on-surface dark:text-on-surface-dark w-[20%] h-[20%]"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>
		<p class="ml-4 text-sm">Fri fragt for over køb over 1000 kr.</p>
	</a>
	<a href="/" class="hover:underline w-full flex justify-center items-center">
		<p class="">hey</p>
	</a>
	<a href="/" class="hover:underline w-full flex justify-center items-center">
		<p class="">hey</p>
	</a>
</section>
