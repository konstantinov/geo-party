<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let type;
	export let text;
	export let leftIcon;
</script>

<button on:click={() => dispatch('click')} class:btn-black={type === 'black'}
	>{#if leftIcon}<i class="fa-regular fa-{leftIcon}" />{/if}{text || ''}</button
>

<style>
	button {
		margin: 0;
		padding: 0 18px;
		border: none;
		height: 36px;
		border-radius: 18px;
		cursor: pointer;
		display: flex;
		gap: 10px;
		flex-flow: row nowrap;
		transition: ease-in-out 0.3s;
		color: #000;
		background: transparent;
		align-items: center;
		font-size: 14px;
		
		&:hover {
			background: #bbb;
		}

		&:active {
			background: #999;
		}

		&.btn-black {
			color: #fff;
			background: #000;

			&:hover {
				background: #444;
			}
			&:active {
				background: #666;
				transition-duration: 0.1s;
			}
		}
	}
</style>
