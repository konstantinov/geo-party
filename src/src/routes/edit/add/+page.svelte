<script>
	import { goto } from '$app/navigation';
	import axios from 'axios';

	import Tag from '~/atoms/Tag.svelte';
	import ItemForm from '~/organisms/ItemForm.svelte';

	export let data;

	const onSubmit = ({ detail: data }) => {
		axios.post('/edit', data).then(({ id }) => goto(`/item/${id}`));
	};
</script>

<main class="std-w std-p">
	<h1>Adding new item to map</h1>
	<ItemForm on:submit={onSubmit} categories={data.categories} />
</main>
