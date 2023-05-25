<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import axios from 'axios';

	const login = (accessToken) => axios.post('/profile/login', { accessToken });
	let accessToken;

	$: {
		accessToken = $page.url.hash.match(/access_token=(.*?)[&$]/);

		if (accessToken) {
			login(accessToken[1]).then(() => goto('/profile'));
		}
	}
</script>

<main class="std-w std-p">
	<i class="fas fa-cog fa-spin" />
</main>

<style>
	main {
		display: flex;
		flex-flow: column;
		align-items: center;
		padding-top: 30vh;
	}
	i {
		font-size: 36px;
	}
</style>
