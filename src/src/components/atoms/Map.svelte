<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let containerClass;
	export let center;
	export let zoom;

	const dispatch = createEventDispatcher();

	let map, container;

	onMount(async () => {
		map = new ymaps.Map(container, {
			center: center || [37.64, 55.76],
			zoom: zoom || 7,
			controls: ['geolocationControl', 'typeSelector']
		});

		map.events.add('actiontickcomplete', (event) => {
			const center = map.getCenter();
			const zoom = map.getZoom();
			dispatch('move', { center, zoom });
		});
	});

	onDestroy(() => {
		if (map) {
			map.destroy();
			map = null;
		}
	});
</script>

<div bind:this={container} class={containerClass} />
