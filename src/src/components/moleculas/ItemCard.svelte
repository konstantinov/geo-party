<script>
	import { buildImage, buildIcon } from '~/../utils/ui';
	export let item;
</script>

<div class="std-p std-b Item" on:click>
	<img src={buildImage(item.images[0].uuid)} alt={item.name} />
	<h1>{item.name}</h1>
	<h1 class="category"><i class={buildIcon(item.category.icon)} />{item.category.name}</h1>
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

	h1.category {
		font-size: 80%;
		display: flex;
		flex-flow: row nowrap;
		gap: 10px;

		align-items: center;
	}
	h1.category > i {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		height: 24px;
		width: 24px;
		background: #eee;
	}

	img {
		border-radius: 12px;
	}
</style>
