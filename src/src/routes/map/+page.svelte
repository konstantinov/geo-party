<script>
	import { PUBLIC_YANDEX_API_KEY } from '$env/static/public';
	import Map from '~/atoms/Map.svelte';
	import { onMount } from 'svelte';

	let script;
	let mapsInitialized = false;
	let mapCenter;
	const scriptNeeded = typeof ymaps3 === 'undefined';

	const initMaps = () => {
		ymaps3.ready.then(() => {
			mapsInitialized = true;
			navigator.geolocation?.getCurrentPosition(
				(center) => (mapCenter = { lat: center.coords.latitude, lon: center.coords.longitude })
			);
		});
	};

	onMount(async () => {
		if (scriptNeeded) {
			await new Promise((resolve) => {
				script.addEventListener('load', () => {
					initMaps();
				});
			});
		} else {
			initMaps();
		}
	});
</script>

<svelte:head>
	{#if scriptNeeded}
		<script
			bind:this={script}
			src="https://api-maps.yandex.ru/3.0/?apikey={PUBLIC_YANDEX_API_KEY}&lang=en_EN"
		></script>
	{/if}
</svelte:head>
{#if mapsInitialized}
	<Map center={mapCenter} />
{/if}
