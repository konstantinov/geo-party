<script>
	import Button from '~/atoms/Button.svelte';
	import { page, navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { setContext } from 'svelte';

	export let data;
	setContext('user', data.user);

	let pathname;

	$: pathname = $page.url.pathname.split('/').slice(0, 2).join('/');

	const items = [
		{
			icon: 'newspaper',
			text: 'Home',
			url: '/',
			pathname: '/'
		},
		{
			icon: 'map',
			text: 'Map',
			url: '/search?showMap=1',
			pathname: '/search'
		},
		{
			icon: 'bookmark',
			text: 'Bookmarks',
			url: '/bookmarks',
			pathname: '/bookmarks'
		},
		{
			icon: 'user',
			text: 'Profile',
			url: '/profile',
			pathname: '/profile'
		}
	];
</script>

<div class="container">
	<div class="content" id="layout_content">
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
					{...pathname === item.pathname ? { text: item.text, color: 'black' } : undefined}
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
		overflow: hidden;
		position: relative;
		display: flex;
		flex-flow: column;
	}
</style>
