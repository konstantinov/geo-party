<script>
	import Input from '~/atoms/Input.svelte';
</script>

<Input leftIcon="search" rightIcon="sliders" on:iconClick={({ detail }) => console.log(detail)} />
