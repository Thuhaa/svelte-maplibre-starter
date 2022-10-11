<script>
	import Content from '../../components/Content.svelte';
	export let data;
</script>

<Content bind:data={data.geoJSON} />

<style>
	@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';
</style>
