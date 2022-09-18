<script lang="ts">

  import Map from "../../components/Map.svelte";
  export let data

</script>
<Map bind:data={data.geoJSON} />
<style>

</style>