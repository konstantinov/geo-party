<script>
	import { goto } from '$app/navigation';
	import ItemCard from '~/moleculas/ItemCard.svelte';
	export let data;
</script>

<div class="std-s">
	<div class="content std-w std-p">
		<div class="std-p std-b">
			<h1>Bookmarks</h1>
		</div>
		<div class=" std-w items-list">
			{#each data.items as item}
				<ItemCard {item} on:click={() => goto(`/item/${item.id}/`)} />
			{:else}
				<h1>Nothing added to bookmarks yet.</h1>
			{/each}
		</div>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-flow: column;
		gap: 20px;
		align-items: center;
	}
	.std-b {
		width: 100%;
		display: flex;
		flex-flow: column;
		gap: 20px;
		align-items: center;
		box-sizing: border-box;
	}
	h1 {
		text-align: center;
	}

	@media (min-width: 600px) {
		.content {
			gap: 40px;
		}

		.items-list > :global(.Item) {
			flex: calc((100% - 50px) / 3) 0 0;
			box-sizing: border-box;
		}
	}

	.items-list {
		display: flex;
		flex-flow: row wrap;
		gap: 25px;
	}
</style>
