<script>
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Button from '~/atoms/Button.svelte';
	import Avatar from '~/atoms/Avatar.svelte';

	let origin;
	export let data;

	$: origin = $page.url.origin;

	const onLogout = () => goto('/profile/logout');

	const onLogin = () =>
		(window.location = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${origin}/profile/auth-success/&client_id=${PUBLIC_GOOGLE_CLIENT_ID}`);
</script>

<div class="content std-w std-p">
	<Avatar user={data.user} />
	{#if data.user}
		<div class="std-p std-b">
			<h1>{data.user.name}</h1>
			<h1>{data.user.email}</h1>
			<Button
				leftIcon="arrow-right-from-bracket"
				text="Sign out"
				type="black"
				on:click={onLogout}
			/>
		</div>
	{:else}
		You didn't sign in so far.
		<Button leftIcon="fa-brands fa-google" text="Sign in" type="black" on:click={onLogin} />
	{/if}
</div>

<style>
	.content {
		display: flex;
		flex-flow: column;
		gap: 40px;
		align-items: center;
	}

	.std-b {
		width: 100%;
		display: flex;
		flex-flow: column;
		gap: 20px;
		align-items: center;
		box-sizing: border-box;
	}

	h1 {
		font-size: 18px;

		font-weight: bold;
	}
</style>
