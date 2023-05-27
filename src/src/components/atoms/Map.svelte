<script>
	import { onMount } from 'svelte';

	export let center;

	let map, container;

	$: {
		if (map && center) {
			console.log(center);
			map.setLocation({ center: [center.lat, center.lon], duration: 200 });
		}
	}

	onMount(async () => {
		map = new ymaps3.YMap(
			container,
			{
				location: {
					center: center || [37.64, 55.76],
					zoom: 7
				}
			},
			[new ymaps3.YMapDefaultSchemeLayer()]
		);
	});
</script>

<div bind:this={container} class="std-f" />
