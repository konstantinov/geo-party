<script>
	import Map from '~/moleculas/Map.svelte';
	import ItemStat from '~/moleculas/ItemStat.svelte';
	import { buildImage } from '~/../utils/ui';
	export let data;

	const itemDot = [data.item.latitude, data.item.longitude];
</script>

<svelte:head>
	<title>{data.item.name} / {data.item.category.name}</title>
</svelte:head>

<div class="std-w">
	{#each data.item.images as image}
		<img src={buildImage(image.uuid, { size: '1280x1280' })} />
	{/each}
	<div class="item-card-details std-p std-b">
		<h2>{data.item.name}</h2>

		{#each data.item.description.split(/\n/) as line}
			<p>{line}</p>
		{/each}
		<Map center={itemDot} containerClass="item-map" dots={[itemDot]} />
		<div class="stat"><ItemStat category={data.item.category} views={data.item.stat?.views} /></div>
	</div>
</div>

<style>
	img {
		display: block;
		width: 100%;
		max-height: 60vh;
		object-fit: cover;
	}

	h2 {
		margin-bottom: 10px;
	}

	p {
		padding: 10px 0;
	}

	.item-card-details {
		position: relative;
		margin-top: -25px;
		padding: 25px 20px;
	}

	.item-card-details > :global(.item-map) {
		width: 100%;
		height: 40vh;
		border-radius: 25px;
		overflow: hidden;
	}

	@media (min-width: 600px) {
		.item-card-details {
			margin-top: -50px;
			border-radius: 50px;
			padding: 50px 20px;
		}
	}

	.stat {
		padding: 10px 0;
	}
</style>
