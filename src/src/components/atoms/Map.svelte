<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let containerClass;
	export let center = undefined;

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
			if (dots.length) {
				map.geoObjects.removeAll();
				dots.forEach((dot) => {
					const dotObject = new ymaps.Placemark(
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
					);
					dotObject.events.add('mouseenter', () => dispatch('dotMouseEnter', { dot }));
					dotObject.events.add('mouseleave', () => dispatch('dotMouseLeave', { dot }));
					dotObject.events.add('click', () => dispatch('dotClick', { dot }));
					map.geoObjects.add(dotObject);
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
			center:
				center ||
				(await ymaps.geolocation
					.get({ provider: 'yandex' })
					.then((location) => location.geoObjects.get(0).geometry.getCoordinates())),
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

		map.events.add('boundschange', (event) => {
			const center = event.get('newCenter');
			const zoom = event.get('newZoom');

			const bounds = event.get('newBounds');

			dispatch('move', { center, zoom, bounds });
		});

		dispatch('init', { map });
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
		transform: translate(-50%, -50%);
	}
</style>
