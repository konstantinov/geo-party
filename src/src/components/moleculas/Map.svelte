<script>
	import { PUBLIC_YANDEX_API_KEY } from '$env/static/public';
	import Map from '~/atoms/Map.svelte';
	import { onMount } from 'svelte';

	export let containerClass;
	export let dots = [];
	export let center = undefined;
	export let zoom = undefined;
	export let centerMark = undefined;
	export let autoCenter;

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
	<Map
		{center}
		{centerMark}
		{zoom}
		{containerClass}
		{dots}
		{autoCenter}
		on:move
		on:init
		on:dotMouseEnter
		on:dotMouseLeave
		on:dotClick
	/>
{/if}
