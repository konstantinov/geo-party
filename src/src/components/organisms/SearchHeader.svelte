<script>
	import SearchBox from '~/moleculas/SearchBox.svelte';

	import { goto } from '$app/navigation';
	import Avatar from '~/atoms/Avatar.svelte';

	export let user, categories, selectedCategories, query;
</script>

<header class="std-w std-p">
	<SearchBox {categories} {query} {selectedCategories} on:search />
	<Avatar {user} clickable on:click={() => goto('/profile')} />
</header>

<style>
	header {
		display: flex;
		flex-flow: row wrap;
		gap: 10px;
		align-items: start;
	}

	@media (min-width: 600px) {
		header {
			gap: 20px;
		}
	}
</style>
