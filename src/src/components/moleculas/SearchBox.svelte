<script>
	import Input from '~/atoms/Input.svelte';
	import Tag from '~/atoms/Tag.svelte';

	export let categories;

	let tags = [];
	let tagsSelected = {};

	$: {
		tagsSelected = {};
		tags.forEach((tag) => (tagsSelected[tag.id] = true));
	}

	const onToggleTag = (tag) => {
		if (tagsSelected[tag.id]) {
			tags = tags.filter(({ id }) => id !== tag.id);
		} else {
			tags = [...tags, tag];
		}
	};

	let filterOpen = false;
	const onToggleFilter = () => {
		filterOpen = !filterOpen;
	};
</script>

<div class="SearchBox" class:filter-open={filterOpen}>
	<Input
		leftIcon="search"
		rightIcon="sliders"
		on:iconClick={({ detail }) => (detail.icon === 'right' ? onToggleFilter() : undefined)}
	/>

	{#if filterOpen}
		<div class="filter">
			{#each categories as category}
				<Tag
					text={category.name}
					icon={category.icon}
					on:click={() => onToggleTag(category)}
					color={tagsSelected[category.id] ? 'orange' : 'white'}
				/>
			{/each}
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
		display: flex;
		flex-flow: row wrap;
		gap: 10px;
		padding-top: 10px;
	}

	.filter-open :global(.Input > i:last-child) {
		color: #fc9c2d;
	}
</style>
