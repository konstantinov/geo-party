<script>
	import { PUBLIC_YANDEX_API_KEY } from '$env/static/public';
	import Map from '~/atoms/Map.svelte';
	import { onMount } from 'svelte';
	let mapsInitialized = false;
	let mapCenter;
	const scriptNeeded = typeof ymaps3 === 'undefined';
	onMount(async () => {
		await ymaps3.ready.then(() => {
			mapsInitialized = true;
			navigator.geolocation?.getCurrentPosition(
				(center) => (mapCenter = { lat: center.coords.latitude, lon: center.coords.longitude })
			);
		});
	});
</script>

<svelte:head>
	{#if scriptNeeded}
		<script
			src="https://api-maps.yandex.ru/3.0/?apikey={PUBLIC_YANDEX_API_KEY}&lang=en_EN"
		></script>
	{/if}
</svelte:head>
{#if mapsInitialized}
	<Map center={mapCenter} />
{/if}
