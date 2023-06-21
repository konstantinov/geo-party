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
		filterOpened = !filsterOpened;
	};
</script>

<div class="SearchBox" class:filter-open={filterOpened}>
	<Input
		leftIcon="search"
		rightIcon="sliders"
		bind:value={query}
		on:change={dispatchEvent}
		on:keyUp={dispatchEvent}
		on:iconClick={({ detail }) => (detail.icon === 'right' ? onToggleFilter() : undefined)}
	/>
	{#if filterOpened}
		<div class="filter">
			<div class="tags">
				{#each categories as category}
					<Tag
						text={category.name}
						icon={category.icon}
						on:click={() => onToggleTag(category)}
						color={tagsSelected[category.id] ? 'orange' : 'white'}
					/>
				{/each}
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
	}

	.filter {
		padding-top: 10px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.filter > .tags {
		display: flex;
		flex-flow: row wrap;
		gap: 10px;
	}

	.filter-open :global(.Input > i:last-child) {
		color: #fc9d2d;
	}
</style>
