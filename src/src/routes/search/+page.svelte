<script>
	import SearchHeader from '~/organisms/SearchHeader.svelte';
	import Map from '~/moleculas/Map.svelte';
	import SplitLayout from '~/layouts/SplitLayout.svelte';
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
<SplitLayout>
	<div class="std-p items-list" slot="content">
		{#each data.items as item}
			<ItemCard {item} xs on:click={() => goto(`/item/${item.id}/`)} />
		{/each}
	</div>
	<svelte:fragment slot="rightSidebar">
		<Map containerClass="search-map" />
	</svelte:fragment>
</SplitLayout>

<style>
	@media (min-width: 800px) {
		.items-list > :global(.Item) {
			flex: calc((100% - 25px) / 2) 0 0;
			box-sizing: border-box;
		}
	}

	:global(.search-map) {
		height: 100%;
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
		overflow: auto;
		max-height: 100%;
		box-sizing: border-box;
	}
	.items-list {
		display: flex;
		flex-flow: row wrap;
		gap: 25px;
	}

	:global(.SplitLayoyt) {
		flex-grow: 1;
		max-height: 100%;
		overflow: hidden;
	}
</style>
