<script>
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as Yup from 'yup';

	import Tag from '~/atoms/Tag.svelte';
	import Button from '~/atoms/Button.svelte';
	import Input from '~/atoms/Input.svelte';

	export let categories = [];

	const { form, errors, handleChange, handleSubmit, validateField } = createForm({
		initialValues: { category: '', name: '', description: '' },
		validationSchema: Yup.object().shape({
			category: Yup.string().required(),
			name: Yup.string().required().max(100),
			description: Yup.string().max(12000)
		}),
		onSubmit: (values) => {
			alert(JSON.stringify(values));
		}
	});

	const dispatch = createEventDispatcher();
	let step = 1;

	const validateStep = async (step, done) => {
		if (step === 1) {
			await Promise.all(['name', 'category'].map((field) => validateField(field)));

			if (!($errors.name || $errors.category || $errors.description)) {
				done();
			}
		}
	};
</script>

<h1>Step {step} / 2</h1>
<form on:submit={handleSubmit}>
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
	{/if}
</form>

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
</style>
