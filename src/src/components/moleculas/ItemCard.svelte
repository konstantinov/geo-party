<script>
	import { buildImage } from '~/../utils/ui';
	import ItemStat from '~/moleculas/ItemStat.svelte';
	export let item;
</script>

<div class="std-p std-b Item" on:click>
	<img src={buildImage(item.images[0].uuid)} alt={item.name} />
	<h1>{item.name}</h1>
	<ItemStat category={item.category} views={item.stat?.views} />
</div>

<style>
	.Item {
		display: flex;
		flex-flow: column;
		gap: 25px;
		overflow: hidden;
		cursor: pointer;
		transition: ease-in-out 0.3s;
	}

	.Item:hover {
		background: rgba(252, 156, 45, 0.6);
	}

	h1 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	img {
		border-radius: 12px;
	}
</style>
