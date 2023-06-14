<script>
	import { buildImage } from '~/../utils/ui';
	export let item;
</script>

<div class="std-p std-b Item" on:click>
	<img src={buildImage(item.images[0].uuid)} alt={item.name} />
	<h1>{item.name}</h1>
</div>

<style>
	.Item {
		display: flex;
		flex-flow: column;
		gap: 25px;
		overflow: hidden;
		cursor: pointer;
	}
</style>
