<script>
	import Button from '~/atoms/Button.svelte';
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
	import { page } from '$app/stores';

	let origin;

	$: origin = $page.url.origin;

	const onLogin = () =>
		window.open(
			`https://accounts.google.com/o/oauth2/v2/auth?scope=profile&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${origin}/profile/auth-success/&client_id=${PUBLIC_GOOGLE_CLIENT_ID}`
		);
</script>

<div class="std-w">
	<Button leftIcon="fa-brands fa-google" text="Sign in" type="black" on:click={onLogin} />
</div>
