<script>
	import Tag from '~/atoms/Tag.svelte';
	import ItemForm from '~/organisms/ItemForm.svelte';

	export let data;

	const onSubmit = (data) => {
		console.log(data);
	};
</script>

<main class="std-w std-p">
	<h1>Adding new item to map</h1>
	<ItemForm on:submit={onSubmit} categories={data.categories} />
</main>
