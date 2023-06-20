<script>
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	import Button from '~/atoms/Button.svelte';
	import Avatar from '~/atoms/Avatar.svelte';
	import ItemCard from '~/moleculas/ItemCard.svelte';

	let origin;
	export let data;

	const user = getContext('user');

	$: origin = $page.url.origin;

	const onLogout = () => goto('/profile/logout');

	const onLogin = () =>
		(window.location = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${origin}/profile/auth-success/&client_id=${PUBLIC_GOOGLE_CLIENT_ID}`);
</script>

<div class="content std-w std-p">
	<Avatar />
	{#if user}
		<div class="std-p std-b">
			<h1>{user.name}</h1>
			<h1>{user.email}</h1>
			<Button
				leftIcon="arrow-right-from-bracket"
				text="Sign out"
				color="black"
				on:click={onLogout}
			/>
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
		You didn't sign in so far.
		<Button leftIcon="fa-brands fa-google" text="Sign in" color="black" on:click={onLogin} />
	{/if}
</div>

<style>
	.content {
		display: flex;
		flex-flow: column;
		gap: 20px;
		align-items: center;
		max-height: 100%;
		overflow: auto;
		box-sizing: border-box;
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
