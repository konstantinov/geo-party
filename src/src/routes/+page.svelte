<script>
	import SearchBox from '~/moleculas/SearchBox.svelte';
	import { goto } from '$app/navigation';
	import Avatar from '~/atoms/Avatar.svelte';

	export let data;
</script>

<header class="std-w std-p">
	<SearchBox />
	<Avatar user={data.user} clickable on:click={() => goto('/profile')} />
</header>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style>
	header {
		display: flex;
		flex-flow: row wrap;
		gap: 20px;
		align-items: start;
	}

	header :global(.Input) {
		flex: 1;
	}
</style>
