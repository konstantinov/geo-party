<script>
	import { onMount } from 'svelte';

	let map, container;

	onMount(async () => {
		map = new ymaps3.YMap(
			container,
			{
				location: {
					center: [37.64, 55.76],
					zoom: 7
				}
			},
			[new ymaps3.YMapDefaultSchemeLayer()]
		);
	});
</script>

<div bind:this={container} />

<style>
	div {
		width: 100%;
		height: calc(100vh - 90px);
	}
</style>
