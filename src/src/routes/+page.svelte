<script>
	import SearchHeader from '~/organisms/SearchHeader.svelte';
	import Button from '~/atoms/Button.svelte';
	import { debounce } from '~/../utils/misc';

	import { goto } from '$app/navigation';

	export let data;

	let gotoSearch = debounce(
		(query, categories, showMap) =>
			goto(
				`/search/?query=${encodeURIComponent(query)}&categoryIds=${categories.join(',')}${
					showMap ? '&showMap=1' : ''
				}`
			),
		1500
	);
</script>

<SearchHeader
	{...data}
	on:search={({ detail: { query, categories } }) => gotoSearch(query, categories)}
/>
<main class="std-w std-p">
	<Button type="circle" leftIcon="plus" color="orange" on:click={() => goto('/edit/add')} />
</main>

<style>
	main {
		flex: 1;
		position: relative;
	}

	main > :global(.btn-circle) {
		position: absolute;
		bottom: 70px;
		height: 60px !important;
		width: 60px !important;
		right: 10px;
	}
	:global(.content) {
		display: flex;
		flex-flow: column;
	}

	@media (min-width: 600px) {
		main > :global(.btn-circle) {
			bottom: 110px;
			right: 20px;
			font-size: 130%;
		}
	}
</style>
