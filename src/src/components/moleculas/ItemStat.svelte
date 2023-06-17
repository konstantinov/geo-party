<script>
	import { buildImage, buildIcon } from '~/../utils/ui';

	export let category;
	export let views;
</script>

<div class="info">
	{#if category}
		<div class="category"><i class={buildIcon(category.icon)} />{category.name}</div>
	{/if}
	{#if views}
		<div class="views" title="Views"><i class="fa fa-eye" />{views}</div>
	{/if}
</div>

<style>
	.info {
		display: flex;
		flex-flow: row wrap;
		gap: 20px;
	}

	.info > div {
		display: flex;
		flex-flow: row nowrap;
		gap: 10px;

		align-items: center;
	}
	.info i {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		height: 24px;
		width: 24px;
		background: #eee;
	}

	.views > i {
		color: #fc9d2d;
	}
</style>
