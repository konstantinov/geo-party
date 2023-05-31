<script>
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as Yup from 'yup';

	import Button from '~/atoms/Button.svelte';
	import Input from '~/atoms/Input.svelte';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: { categoryId: '', name: '', description: '' },
		validationSchema: Yup.object().shape({
			categoryId: Yup.string().required(),
			name: Yup.string().required().max(100),
			description: Yup.string().max(12000)
		}),
		onSubmit: (values) => {
			alert(JSON.stringify(values));
		}
	});

	$: console.log($errors);

	const dispatch = createEventDispatcher();
	let step = 1;

	const validateStep = (step, done) => {};
</script>

<h1>Step {step} / 2</h1>
<form on:submit={handleSubmit}>
	{#if step === 1}
		<label>
			<div>
				Name{#if $errors.name}<small>{$errors.name}</small>{/if}
			</div>
			<Input name="name" bind:value={$form.name} on:change={handleChange} on:blur={handleChange} />
		</label>
		<label>
			<div>
				Description{#if $errors.description}<small>{$errors.description}</small>{/if}
			</div>
			<Input
				name="description"
				textarea
				bind:value={$form.description}
				on:change={handleChange}
				on:blur={handleChange}
			/>
		</label>
	{:else}{/if}
</form>

<div class="buttons std-p">
	<Button
		leftIcon="chevron-left"
		disabled={step === 1}
		text="Back"
		on:click={() => validateStep(step, () => step - 1)}
	/>
	<Button
		rightIcon="chevron-right"
		text="Forward"
		on:click={() => validateStep(step, () => step + 1)}
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
	}

	label :global(input),
	label :global(textarea) {
		color: #000;
	}

	label > div {
		margin-bottom: 5px;
		padding: 0 12px;
		font-size: 14px;
	}
	small {
		padding: 0 8px;
		font-size: 12px;
		color: red;
	}
</style>
