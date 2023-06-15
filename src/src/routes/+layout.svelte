<script>
	import Button from '~/atoms/Button.svelte';
	import { page, navigating } from '$app/stores';
	import { goto } from '$app/navigation';

	let pathname;

	$: pathname = $page.url.pathname.split('/').slice(0, 2).join('/');

	const items = [
		{
			icon: 'newspaper',
			text: 'Home',
			url: '/'
		},
		{
			icon: 'map',
			text: 'Map',
			url: '/map'
		},
		{
			icon: 'bookmark',
			text: 'Bookmarks',
			url: '/bookmarks'
		},
		{
			icon: 'user',
			text: 'Profile',
			url: '/profile'
		}
	];
</script>

<div class="container">
	<div class="content">
		{#if $navigating}
			<div class="loader">
				<i class="fas fa-cog fa-spin" />
			</div>
		{/if}
		<slot />
	</div>

	<footer>
		<nav class="std-w std-p toolbar">
			{#each items as item}
				<Button
					leftIcon={`far fa-${item.icon}`}
					{...pathname === item.url ? { text: item.text, color: 'black' } : undefined}
					on:click={() => goto(item.url)}
				/>
			{/each}
		</nav>
	</footer>
</div>

<style>
	footer {
		width: 100%;
		background: #fff;
	}
	.loader {
		align-items: center;
		justify-content: center;
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(6px);
	}

	.loader > i {
		font-size: 52px;
	}
	.toolbar {
		display: flex;
		flex-flow: row nowrap;
		gap: 10px;
		justify-content: center;
	}

	footer > nav > :global(button > i) {
		font-size: 20px;
	}
	footer > nav > :global(button.btn-black) {
		font-size: 16px;
	}

	@media (min-width: 600px) {
		footer > nav > :global(button) {
			height: 50px;
			border-radius: 25px;
			padding: 10px 25px;
		}

		footer > nav > :global(button > i) {
			font-size: 28px;
		}
		footer > nav > :global(button.btn-black > i) {
			font-size: 20px;
		}
	}

	.container {
		height: 100vh;
		display: flex;
		flex-flow: column;
	}
	.content {
		width: 100%;
		flex: 1;
		overflow: auto;
		position: relative;
	}
</style>
