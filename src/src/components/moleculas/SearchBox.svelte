<script>
	import Input from '~/atoms/Input.svelte';
	import Tag from '~/atoms/Tag.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let categories, query, selectedCategories, showMap;
	export let filterOpened = false;
	let tags = [];
	let tagsSelected = {};

	$: {
		tagsSelected = {};
		tags.forEach((tag) => (tagsSelected[tag.id] = true));
	}

	$: {
		if (selectedCategories) tags = categories.filter(({ id }) => selectedCategories.includes(id));
	}

	const dispatchEvent = () =>
		dispatch('search', { query, showMap, categories: tags.map(({ id }) => id) });

	const onToggleTag = (tag) => {
		if (tagsSelected[tag.id]) {
			tags = tags.filter(({ id }) => id !== tag.id);
		} else {
			tags = [...tags, tag];
		}

		dispatchEvent();
	};

	const onToggleFilter = () => {
		filterOpened = !filterOpened;
	};
</script>

<div class="SearchBox" class:filter-open={filterOpened}>
	<Input
		leftIcon="sliders"
		rightIcon="search"
		bind:value={query}
		on:change={dispatchEvent}
		on:keyUp={dispatchEvent}
		on:iconClick={({ detail }) => (detail.icon === 'left' ? onToggleFilter() : undefined)}
	/>
	{#if filterOpened}
		<div class="filter">
			<div class="tags">
				<div class="tags-wrap">
					{#each categories as category}
						<Tag
							text={category.name}
							icon={category.icon}
							on:click={() => onToggleTag(category)}
							color={tagsSelected[category.id] ? 'orange' : 'white'}
						/>
					{/each}
				</div>
			</div>
			<div class="map">
				<Tag
					text="Show map"
					icon="map"
					on:click={() => {
						showMap = !showMap;
						dispatchEvent();
					}}
					color={showMap ? 'orange' : 'white'}
				/>
			</div>
		</div>
	{/if}
</div>

<style>
	.SearchBox {
		flex: 1;
		display: flex;
		flex-flow: column;
		overflow: hidden;
	}

	.filter {
		padding-top: 10px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.filter > .tags {
		position: relative;
		overflow: hidden;
	}
	.filter > .tags > .tags-wrap {
		display: flex;
		flex-flow: row nowrap;
		gap: 10px;
		overflow: auto;
	}

	.filter > .tags:after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 35px;
		/* background: linear-gradient(to right, trnasparent 0%, #f6f6f6 100%); */
		background: linear-gradient(90deg, transparent 0%, #f6f6f6 100%);
	}

	@media (min-width: 600px) {
		.filter > .tags {
			flex-flow: row wrap;
		}
	}

	.filter-open :global(.Input > i:first-child) {
		color: #fc9d2d;
	}
</style>
