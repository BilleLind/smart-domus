<script context="module" lang="js">
	export async function load({ fetch, page }) {
        const kategorie = page.params.Kategori
		const res = await fetch(`https://smart-domus-339113.ew.r.appspot.com/api/shop/${kategorie}`);
		const content = await res.json();

		if (res.ok) {
			return {
				props: {
					products: content.products
				}
			};
		}
		return {
			status: res.status,
			error: new Error('Kunne ikke hente indhold')
		};
	}
</script>
<script>
    export let products = []
</script>

<div class="grid grid-flow-row max-w-[80%]">
    {#each products as product}
        <div class="rounded-lg bg-surface-dark brightness-150 p-4 w-40 h-40">
            <p>{product.title}</p>
        </div>
    {/each}
</div>