<script>
	import SearchHeader from '~/organisms/SearchHeader.svelte';
	import ItemCard from '~/moleculas/ItemCard.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let query, selectedCategories;

	$: {
		const params = new URLSearchParams($page.url.search);

		[query, selectedCategories] = [
			params.get('query'),
			params.get('categoryIds') ? params.get('categoryIds').split(/,/) : []
		];
	}

	export let data;
</script>

<SearchHeader
	{...data}
	{query}
	{selectedCategories}
	on:search={({ detail: { query, categories } }) =>
		goto(`/search/?query=${encodeURIComponent(query)}&categoryIds=${categories.join(',')}`)}
/>
<div class="std-w std-p items-list">
	{#each data.items as item}
		<ItemCard {item} on:click={() => goto(`/item/${item.id}/`)} />
	{/each}
</div>

<style>
	@media (min-width: 600px) {
		.items-list > :global(.Item) {
			flex: calc((100% - 50px) / 3) 0 0;
			box-sizing: border-box;
		}
	}

	.std-b {
		width: 100%;
		display: flex;
		flex-flow: column;
		gap: 20px;
		align-items: center;
		box-sizing: border-box;
	}

	.items-list {
		display: flex;
		flex-flow: row wrap;
		gap: 25px;
	}
	.items-list {
		display: flex;
		flex-flow: row wrap;
		gap: 25px;
	}
</style>
