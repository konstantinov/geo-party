<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let containerClass;
	export let center = [37, 55];

	export let zoom = 7;
	export let autoCenter = false;
	export let dots = [];
	export let centerMark;
	const dispatch = createEventDispatcher();
	let centerMarkObject;

	let map, container;

	const iconLayout = ymaps.templateLayoutFactory.createClass(`<i class="far fa-circle-dot"></i>`);
	$: {
		if (map) {
			map.geoObjects.removeAll();
			if (dots.length) {
				dots.forEach((dot) => {
					map.geoObjects.add(
						new ymaps.Placemark(
							[dot.latitude, dot.longitude],
							{},
							{
								iconLayout,
								iconShape: {
									type: 'Circle',
									coordinates: [0, 0],
									radius: 18
								}
							}
						)
					);
				});

				if (autoCenter) {
					map.setBounds(map.geoObjects.getBounds());

					if (map.getZoom() > 16) map.setZoom(16);
				}
			}
		}
	}

	onMount(async () => {
		map = new ymaps.Map(container, {
			center,
			zoom,
			controls: ['geolocationControl', 'typeSelector']
		});

		if (centerMark) {
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

			const bounds = event.get('newBounds');

			dispatch('move', { center, zoom, bounds });
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
		color: #000;
	}
</style>
