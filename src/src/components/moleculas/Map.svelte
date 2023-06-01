<script>
	import { PUBLIC_YANDEX_API_KEY } from '$env/static/public';
	import Map from '~/atoms/Map.svelte';
	import { onMount } from 'svelte';

	export let containerClass;
	export let center;
	export let zoom;
	let script;
	let mapsInitialized = false;
	const scriptNeeded = typeof ymaps === 'undefined';

	const initMaps = () => {
		ymaps.ready(() => {
			mapsInitialized = true;
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
			src="https://api-maps.yandex.ru/2.1/?apikey={PUBLIC_YANDEX_API_KEY}&lang=en_GB"
		></script>
	{/if}
</svelte:head>
{#if mapsInitialized}
	<Map {center} {zoom} {containerClass} on:move />
{/if}
