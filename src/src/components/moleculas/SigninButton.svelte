<script>
	import Button from '~/atoms/Button.svelte';
	import { loginURL } from '~/../utils/ui';
</script>

<Button
	leftIcon="fa-brands fa-google"
	text="Sign in"
	color="black"
	on:click={() => (window.location = loginURL)}
/>
