<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let containerClass;
	export let center = [37, 55];

	export let zoom = 7;
	export let centerMark;
	const dispatch = createEventDispatcher();
	let centerMarkObject;

	let map, container;

	onMount(async () => {
		map = new ymaps.Map(container, {
			center,
			zoom,
			controls: ['geolocationControl', 'typeSelector']
		});

		if (centerMark) {
			const iconLayout = ymaps.templateLayoutFactory.createClass(
				`<i class="far fa-circle-dot"></i>`
			);
			centerMarkObject = new ymaps.Placemark(
				center,
				{},
				{
					iconLayout,
					iconShape: {
						type: 'Circle',
						coordinates: [0, 0],
						radius: 18
					}
				}
			);

			map.geoObjects.add(centerMarkObject);

			map.events.add('actiontick', (e) => {
				const current_state = map.action.getCurrentState();
				const geoCenter = map.options
					.get('projection')
					.fromGlobalPixels(current_state.globalPixelCenter, current_state.zoom);

				centerMarkObject.geometry.setCoordinates(geoCenter);
			});
		}

		map.events.add(['boundschange', 'boundschange'], (event) => {
			const center = event.get('newCenter');
			const zoom = event.get('newZoom');

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

<style>
	:global(.fa-circle-dot) {
		color: #fc9d2d;
	}
</style>
