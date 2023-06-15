<script>
	import SearchHeader from '~/organisms/SearchHeader.svelte';
	import Button from '~/atoms/Button.svelte';

	import { goto } from '$app/navigation';

	export let data;
</script>

<SearchHeader {...data} on:search={({ detail: { query, categories } }) => goto(`/search/?query=${encodeURIComponent(query)}&categoryIds=${categories.join(',')}`)} />
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
		bottom: 10px;
		right: 10px;
	}
	:global(.content) {
		display: flex;
		flex-flow: column;
	}

	@media (min-width: 600px) {
		main > :global(.btn-circle) {
			bottom: 20px;
			right: 20px;
			height: 50px !important;
			width: 50px !important;
			font-size: 130%;
		}
	}
</style>
