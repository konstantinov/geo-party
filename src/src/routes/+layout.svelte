<script>
	import Button from '~/atoms/Button.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let pathname;

	$: pathname = $page.url.pathname;

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

<div class="std-w std-p header">
	<p>test</p>
</div>
<slot />

<footer>
	<nav class="std-w std-p toolbar">
		{#each items as item}
			<Button
				leftIcon={item.icon}
				{...pathname === item.url ? { text: item.text, type: 'black' } : undefined}
				on:click={() => goto(item.url)}
			/>
		{/each}
	</nav>
</footer>

<style>
	.header {
		display: flex;
		flex-flow: row nowrap;
	}
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

	footer > nav > :global(button) {
			font-size: 20px;

			&.btn-black {
				font-size: 16px;
			}
		}

	@media (min-width: 600px) {
		footer > nav > :global(button) {
			font-size: 28px;
			height: 50px;
			border-radius: 25px;
			padding: 10px 25px;

			&.btn-black {
				font-size: 20px;
			}
		}
	}
</style>
