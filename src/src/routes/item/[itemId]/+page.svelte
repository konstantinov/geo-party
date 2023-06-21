<script>
	import Map from '~/moleculas/Map.svelte';
	import ItemStat from '~/moleculas/ItemStat.svelte';
	import { buildImage } from '~/../utils/ui';
	import { getContext } from 'svelte';
	import Button from '~/atoms/Button.svelte';
	import { goto } from '$app/navigation';

	export let data;

	const user = getContext('user');
</script>

<svelte:head>
	<title>{data.item.name} / {data.item.category.name}</title>
</svelte:head>

<div class="std-s">
	<div class="std-w">
		{#each data.item.images as image}
			<img src={buildImage(image.uuid, { size: '1280x1280' })} />
		{/each}
		<div class="item-card-details std-p std-b">
			<h2>
				{data.item.name}

				{#if data.item.userId === user?.id}
					<Button leftIcon="pen" on:click={() => goto(`/edit/${data.item.id}`)} />
				{/if}
			</h2>

			{#each data.item.description.split(/\n/) as line}
				<p>{line}</p>
			{/each}
			<Map
				center={[data.item.latitude, data.item.longitude]}
				containerClass="item-map"
				dots={[data.item]}
			/>
			<div class="stat">
				<ItemStat category={data.item.category} views={data.item.stat?.views} />
			</div>
		</div>
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
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		gap: 20px;
	}

	h2 > :global(button) {
		color: #fc9d2d !important;
	}

	h2 > :global(button:hover) {
		background: rgba(252, 156, 45, 0.6) !important;
		color: #fff !important;
		transition: ease-in-out 0.3s;
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
		border: 1px solid #979797;
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
