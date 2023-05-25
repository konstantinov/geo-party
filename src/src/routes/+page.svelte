<script>
	import SearchBox from '~/moleculas/SearchBox.svelte';
</script>

<header class="std-w std-p">
	<SearchBox />
	<div class="avatar">
		<i class="far fa-user" />
	</div>
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

	header .avatar {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: #ccc;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		font-size: 30px;
		justify-self: end;
	}
</style>
