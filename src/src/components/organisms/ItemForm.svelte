<script>
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { buildImage } from '~/../utils/ui';
	import Tag from '~/atoms/Tag.svelte';
	import Button from '~/atoms/Button.svelte';
	import Input from '~/atoms/Input.svelte';
	import Map from '~/moleculas/Map.svelte';
	import ImageLoader from '~/moleculas/ImageLoader.svelte';
	import { itemValidationSchema as validationSchema } from '~/../schemas/item.js';

	export let categories = [];

	export let data = undefined;

	let zoom;

	const dispatch = createEventDispatcher();
	const { form, errors, handleChange, handleSubmit, validateField } = createForm({
		initialValues: data || {
			category: '',
			name: '',
			description: '',
			latitude: 35,
			longitude: 57,
			zoom: 7,
			images: []
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch('submit', values);
		}
	});

	let step = 1;

	const validateStep = async (step, done) => {
		if (step === 1) {
			await Promise.all(['name', 'category'].map((field) => validateField(field)));

			if (!($errors.name || $errors.category || $errors.description)) {
				done();
			}
		} else {
			handleSubmit();
		}
	};

	const onMapMove = async ({ detail }) => {
		$form.latitude = detail.center[0];
		$form.longitude = detail.center[1];

		$form.zoom = detail.zoom;

		await Promise.all(['longitude', 'latitude', 'zoom'].map((field) => validateField(field)));
	};
</script>

<h1>Step {step} / 2</h1>
{#if step === 1}
	<label>
		Category{#if $errors.category}<small>{$errors.category}</small>{/if}
	</label>
	<div class="tags-list">
		{#each categories as category}
			<Tag
				text={category.name}
				icon={category.icon}
				on:click={async () => {
					$form.category = category.id;
					await validateField('category');
				}}
				color={$form.category === category.id ? 'orange' : 'white'}
			/>
		{/each}
	</div>
	<label for="name">
		Name{#if $errors.name}<small>{$errors.name}</small>{/if}
	</label>
	<Input
		id="name"
		name="name"
		bind:value={$form.name}
		on:change={handleChange}
		on:blur={handleChange}
	/>

	<label for="description">
		Description{#if $errors.description}<small>{$errors.description}</small>{/if}
	</label>
	<Input
		id="description"
		name="description"
		textarea
		bind:value={$form.description}
		on:change={handleChange}
		on:blur={handleChange}
	/>
{:else}
	<label>Map position</label>
	<Map
		containerClass="form-map"
		on:move={onMapMove}
		zoom={$form.zoom}
		centerMark
		center={$form.latitude ? [$form.latitude, $form.longitude] : undefined}
	/>
	<label>Images</label>
	<ImageLoader
		images={$form.images.map(({ content, uuid }) =>
			uuid ? buildImage(uuid, { size: '200x200' }) : content
		)}
		on:remove={({ detail: { index } }) =>
			($form.images = $form.images.filter((_, i) => i !== index))}
		on:add={({ detail: files }) => ($form.images = [...$form.images, ...files])}
	/>
{/if}

<div class="buttons std-p">
	<Button leftIcon="chevron-left" disabled={step === 1} text="Back" on:click={() => (step -= 1)} />
	<Button
		rightIcon="chevron-right"
		text="Forward"
		on:click={() => validateStep(step, () => (step += 1))}
	/>
</div>

<style>
	.buttons {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		padding-right: 0 !important;
		padding-left: 0 !important;
	}

	label {
		margin-top: 12px;
		display: block;
		color: #444;
		margin-bottom: 5px;
		padding: 0 12px;
		font-size: 14px;
	}

	small {
		padding: 0 8px;
		font-size: 12px;
		color: red;
		font-weight: bold;
	}

	.tags-list {
		display: flex;
		flex-flow: row wrap;
		gap: 12px;
	}

	:global(.form-map) {
		width: 100%;
		height: 300px;
		border-radius: 18px;
		overflow: hidden;
		border: 1px solid #979797;
	}
</style>
