<script>
	import { createEventDispatcher } from 'svelte';

	import Button from '~/atoms/Button.svelte';

	export let images = [];
	export let multiple = false;

	const dispatch = createEventDispatcher();

	let input;

	const onFileChange = async () => {
		if (!input.files || !input.files[0]) return;

		const files = await Promise.all(
			Array.prototype.slice.call(input.files).map(
				(file) =>
					new Promise((resolve) => {
						const reader = new FileReader();

						reader.addEventListener('load', (evt) => {
							resolve({ name: file.name, size: file.size, content: evt.target.result });
						});

						reader.readAsDataURL(file);
					})
			)
		);

		dispatch('add', files);
	};
</script>

<div class="Input">
	{#each images as image, index}
		<div class="image-container" on:click={() => dispatch('remove', { index })}>
			<img src={image} alt="" />
			<i class="fa fa-trash" />
		</div>
	{/each}

	<Button
		leftIcon="plus"
		text=""
		on:click={(e) => {
			input.click();
			e.preventDefault();
		}}
	/>

	<input
		accept=".jpg,.jpeg,.png"
		type="file"
		{multiple}
		bind:this={input}
		on:change={onFileChange}
	/>
</div>

<style>
	input {
		display: none;
	}

	.image-container {
		border-radius: 8px;
		border: 1px solid #979797;
		overflow: hidden;
		transition: ease-in-out 0.3s;
		position: relative;
		background: #000;
	}

	.image-container > .fa {
		opacity: 0;
		font-size: 32px;
		transition: ease-in-out 0.3s;
		position: absolute;
		color: #fff;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.image-container:hover > .fa {
		opacity: 1;
	}

	.image-container:hover {
		cursor: pointer;
		transition: ease-in-out 0.3s;
	}
	.image-container > img {
		transition: ease-in-out 0.3s;
	}
	.image-container:hover > img {
		opacity: 0.5;
	}

	.Input img {
		height: 72px;
		width: 72px;
		display: block;
		box-sizing: border-box;
		object-fit: cover;
	}

	.Input > :global(button) {
		height: 72px;
		width: 72px;
		border-radius: 8px;
		border: 1px solid #fc9d2d;
		padding: 0;
		justify-content: center;
		outline: none;
		color: #fc9d2d;
	}

	.Input > :global(button:hover) {
		color: #fff;
	}
	.Input > :global(button:hover) {
		background: rgba(252, 156, 45, 0.6) !important;
	}

	.Input {
		border: 1px solid #979707;
		padding: 10px 12px;
		background: #fff;
		border-radius: 18px;
		box-sizing: border-box;
		display: flex;
		flex-flow: row wrap;
		gap: 12px;
	}
</style>
