<script>
	import { createEventDispatcher, getContext } from 'svelte';

	export let clickable = false;
	const user = getContext('user');

	const dispatch = createEventDispatcher();
</script>

<div class="avatar" class:clickable on:click={() => clickable && dispatch('click')}>
	{#if user}
		<img src={user.avatar} alt={user.name} />
	{:else}
		<i class="far fa-user" />
	{/if}
</div>

<style>
	.avatar {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: #ccc;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		font-size: 30px;
		justify-self: end;
		overflow: hidden;
	}
	.clickable {
		cursor: pointer;
		transition: ease-in-out 0.3s;
	}
	.clickable:hover {
		background: #000;
	}
	.clickable:hover img {
		opacity: 0.5;
	}
	.avatar img {
		max-width: 100%;
		transition: ease-in-out 0.3s;
	}
</style>
