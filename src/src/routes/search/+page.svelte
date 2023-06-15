<script>
	import SearchHeader from '~/organisms/SearchHeader.svelte';
	import { onMount } from 'svelte';
    import { page } from '$app/stores';
	import { goto } from '$app/navigation';

    let query, selectedCategories;

    $:  {
        const params = new URLSearchParams($page.url.search);

        [query, selectedCategories ] = [ params.get('query'), params.get('categoryIds') ?  params.get('categoryIds').split(/,/) : [] ];
    };

	export let data;
</script>

<SearchHeader {...data} {query} {selectedCategories} on:search={({ detail: { query, categories } }) => goto(`/search/?query=${encodeURIComponent(query)}&categoryIds=${categories.join(',')}`)} />