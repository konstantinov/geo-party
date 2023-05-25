<script>
	import Button from '~/atoms/Button.svelte';
	import { page } from '$app/stores';
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

<slot />

<footer>
	<nav class="std-w std-p toolbar">
		{#each items as item}
			<Button
				leftIcon={`far fa-${item.icon}`}
				{...pathname === item.url ? { text: item.text, type: 'black' } : undefined}
				on:click={() => goto(item.url)}
			/>
		{/each}
	</nav>
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
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
</style>
