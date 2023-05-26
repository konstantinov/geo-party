<script>
	import { PUBLIC_YANDEX_API_KEY } from '$env/static/public';
	import Map from '~/atoms/Map.svelte';
	import { onMount } from 'svelte';
	let mapsInitialized = false;
	onMount(async () => {
		await ymaps3.ready.then(() => {
			mapsInitialized = true;
		});
	});
</script>

<svelte:head>
	<script src="https://api-maps.yandex.ru/3.0/?apikey={PUBLIC_YANDEX_API_KEY}&lang=ru_RU"></script>
</svelte:head>

{#if mapsInitialized}
	<Map />
{/if}
