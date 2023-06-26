<script>
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	import SigninButton from '~/moleculas/SigninButton.svelte';
	import Avatar from '~/atoms/Avatar.svelte';
	import ItemCard from '~/moleculas/ItemCard.svelte';

	export let data;

	const user = getContext('user');

	const onLogout = () => goto('/profile/logout');
</script>

<div class="std-s">
	<div class="content std-w std-p">
		<Avatar />
		{#if user}
			<div class="std-p std-b">
				<h1>{user.name}</h1>
				<h1>{user.email}</h1>
				<SigninButton />
			</div>
			<div class="std-p std-b">
				<h1>My items</h1>
			</div>
			<div class="std-w items-list">
				{#each data.items as item}
					<ItemCard {item} on:click={() => goto(`/item/${item.id}/`)} />
				{/each}
			</div>
		{:else}
			<h1>You didn't sign in so far.</h1>
			<SigninButton />
		{/if}
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-flow: column;
		gap: 20px;
		align-items: center;
	}

	@media (min-width: 600px) {
		.content {
			gap: 40px;
		}

		.items-list > :global(.Item) {
			flex: calc((100% - 50px) / 3) 0 0;
			box-sizing: border-box;
		}
	}

	.std-b {
		width: 100%;
		display: flex;
		flex-flow: column;
		gap: 20px;
		align-items: center;
		box-sizing: border-box;
	}

	.items-list {
		display: flex;
		flex-flow: row wrap;
		gap: 25px;
	}
</style>
