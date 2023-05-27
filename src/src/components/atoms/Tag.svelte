<script>
	import { buildIcon } from '~/../utils/ui';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let icon = '';
	export let text = '';
	export let color = 'white';
</script>

<div class="Tag" class:tag-orange={color === 'orange'} on:click={() => dispatch('click')}>
	{#if icon}
		<i class={buildIcon(icon)} />
	{/if}
	{text}
</div>

<style>
	.Tag {
		border-radius: 18px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 10px;
		background: #fff;
		cursor: pointer;
		height: 36px;
		padding: 0 11px 0 8px;
		font-size: 14px;
		border: 1px solid #999;
	}

	.tag-orange {
		background: #fc9c2d;
		border-color: rgba(252, 156, 45, 0.6);
	}

	.Tag:hover {
		background: rgba(252, 156, 45, 0.6);
	}

	i {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		height: 24px;
		width: 24px;
		background: #fff;
	}
</style>
