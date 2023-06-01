<script>
	import { buildIcon } from '~/../utils/ui';
	import { createEventDispatcher } from 'svelte';
	export let leftIcon = undefined;
	export let rightIcon = undefined;
	export let value;
	export let textarea = false;
	export let name = undefined;
	export let id = undefined;

	const dispatch = createEventDispatcher();
</script>

<div class="Input">
	{#if leftIcon}<i
			class={buildIcon(leftIcon)}
			on:click={() => dispatch('iconClick', { icon: 'left' })}
		/>{/if}
	{#if textarea}<textarea {id} {name} type="text" bind:value on:change on:blur />
	{:else}
		<input {id} {name} type="text" bind:value on:change on:blur />
	{/if}
	{#if rightIcon}<i
			class={buildIcon(rightIcon)}
			on:click={() => dispatch('iconClick', { icon: 'right' })}
		/>{/if}
</div>

<style>
	input,
	textarea {
		padding: 0;
		margin: 0;
		border: 0;
		outline: none;
		flex: 1;
		background: transparent;
		height: 100%;
		color: #000;
		font-size: 14px;
		height: 16px;
	}
	i {
		color: #979797;
		cursor: pointer;
	}
	i:hover {
		color: #333;
	}
	.Input {
		display: flex;
		gap: 12px;
		flex-flow: row nowrap;
		align-items: center;
		border-radius: 18px;
		background: #fff;
		padding: 12px 10px;
		border: 1px solid #979797;
		box-sizing: border-box;
	}

	textarea {
		height: 108px;
	}
</style>
