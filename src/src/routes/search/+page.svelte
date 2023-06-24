<script>
	import SearchHeader from '~/organisms/SearchHeader.svelte';
	import Map from '~/moleculas/Map.svelte';
	import SplitLayout from '~/layouts/SplitLayout.svelte';
	import ItemCard from '~/moleculas/ItemCard.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let query, selectedCategories, bounds, showMap, highlighted;

	const updateState = (url) => {
		const params = new URLSearchParams(url);

		[query, selectedCategories, bounds, showMap] = [
			params.get('query') ?? '',
			params.get('categoryIds') ? params.get('categoryIds').split(/,/) : [],
			params.get('bounds') && params.get('bounds') !== '-'
				? JSON.parse(params.get('bounds'))
				: params.get('bounds'),
			params.get('showMap')
		];
	};

	$: updateState($page.url.search);

	export let data;

	const buildUrl = ({ query, categories, showMap, bounds }) =>
		`/search/?query=${encodeURIComponent(query)}&categoryIds=${categories.join(',')}${
			showMap ? '&showMap=1' : ''
		}${bounds && showMap ? `&bounds=${encodeURIComponent(JSON.stringify(bounds))}` : ''}`;
</script>

<SearchHeader
	categories={data.categories}
	{query}
	{selectedCategories}
	{showMap}
	filterOpened
	on:search={({ detail }) => goto(buildUrl({ bounds, ...detail }))}
/>
<SplitLayout rightSidebarOpened={showMap}>
	<div class="std-p items-list" slot="content" class:fullwidth={!showMap}>
		{#each data.items as item}
			<ItemCard
				{item}
				on:click={() => goto(`/item/${item.id}/`)}
				highlighted={highlighted === item.id}
			/>
		{:else}
			<h1>Nothing found</h1>
		{/each}
	</div>
	<svelte:fragment slot="rightSidebar">
		<Map
			containerClass="search-map"
			dots={data.items}
			autoCenter={!bounds}
			on:move={({ detail: { bounds } }) =>
				goto(buildUrl({ bounds, query, showMap, categories: selectedCategories }))}
			on:dotClick={(e) => console.log(e)}
			on:dotMouseEnter={({ detail: { dot } }) => (highlighted = dot.id)}
			on:dotMouseLeave={() => (highlighted = undefined)}
		/>
	</svelte:fragment>
</SplitLayout>

<style>
	h1 {
		text-align: center;
		padding: 40px 0 0;
		width: 100%;
	}

	.items-list > :global(.Item) {
		flex: 100% 0 0;
		box-sizing: border-box;
	}
	.items-list.fullwidth > :global(.Item) {
		flex: calc((100% - 12px) / 2) 0 0;
	}
	@media (min-width: 600px) {
		.items-list.fullwidth > :global(.Item) {
			flex: calc((100% - 25px) / 2) 0 0;
		}
	}
	@media (min-width: 800px) {
		.items-list > :global(.Item) {
			flex: calc((100% - 25px) / 2) 0 0;
		}
		.items-list.fullwidth > :global(.Item) {
			flex: calc((100% - 100px) / 3) 0 0;
		}
	}

	@media (min-width: 1000px) {
		.items-list.fullwidth > :global(.Item) {
			flex: calc((100% - 75px) / 4) 0 0;
		}
	}

	@media (min-width: 1200px) {
		.items-list.fullwidth > :global(.Item) {
			flex: calc((100% - 100px) / 5) 0 0;
		}
	}

	:global(.search-map) {
		height: calc(100% - 12px);
		margin: 0 12px 12px 0;
		border: 1px solid #979797;
		border-radius: 25px;
		overflow: hidden;
		box-sizing: border-box;
	}

	@media (min-width: 600px) {
		:global(.search-map) {
			height: calc(100% - 25px);
			margin: 0 25px 25px 0;
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
		gap: 12px;
		overflow: auto;
		max-height: 100%;
		box-sizing: border-box;
		padding-top: 0;
		padding-bottom: 0;
		padding-right: 6px;
		margin-right: 6px;
		height: 100%;
		align-items: flex-start;
	}

	.items-list.fullwidth {
		padding-right: 25px;
		margin: 0;
	}

	:global(.SplitLayout) {
		flex-grow: 1;
		max-height: 100%;
		overflow: hidden;
		margin-bottom: 60px;
	}

	@media (min-width: 600px) {
		:global(.SplitLayout) {
			margin-bottom: 90px;
		}

		.items-list {
			padding-right: 12px;
			margin-right: 13px;
			gap: 25px;
		}
	}
</style>
