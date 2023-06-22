<script>
	import { buildIcon } from '~/../utils/ui';

	export let type = '';
	export let title = undefined;
	export let color = 'white';
	export let text = '';
	export let leftIcon = undefined;
	export let rightIcon = undefined;
	export let disabled = false;
</script>

<button
	on:click
	class:btn-circle={type === 'circle'}
	class:btn-black={color === 'black'}
	class:btn-orange={color === 'orange'}
	class:btn-disabled={disabled}
	{disabled}
	{title}
	>{#if leftIcon}<i class={buildIcon(leftIcon)} />{/if}{text || ''}{#if rightIcon}<i
			class={buildIcon(rightIcon)}
		/>{/if}</button
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
	}

	button:hover:not(.btn-disabled) {
		background: #bbb;
	}

	.btn-disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	button:active {
		background: #979797;
	}

	button.btn-black {
		color: #fff;
		background: #000;
	}

	button.btn-black:hover {
		background: #444;
	}
	button.btn-black:active {
		background: #666;
		transition-duration: 0.1s;
	}

	.btn-circle {
		box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
			0px 1px 18px 0px rgba(0, 0, 0, 0.12);
		border-radius: 50%;
		padding: 0;
		width: 36px;
		justify-content: center;
	}
	.btn-circle i {
		transition: rotate 1s;
		rotate: 0deg;
	}
	.btn-circle:hover i {
		rotate: 360deg;
	}

	.btn-orange {
		background: #fc9d2d;
		color: #fff;
	}

	.btn-orange:hover:not(.btn-disabled) {
		background: rgba(252, 156, 45, 0.6);
	}
	.btn-orange:active {
		background: rgba(252, 156, 45, 0.2);
	}
</style>
