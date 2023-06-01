<script>
	import { onMount } from 'svelte';

	export let center;
	export let containerClass;

	let map, container;

	$: {
		if (map && center) {
			map.setLocation({ center: [center.lat, center.lon], duration: 200 });
		}
	}

	onMount(async () => {
		map = new ymaps.Map(container, {
			center: center || [37.64, 55.76],
			zoom: 7,
			controls: ['geolocationControl', 'typeSelector']
		});
	});
</script>

<div bind:this={container} class={containerClass} />
