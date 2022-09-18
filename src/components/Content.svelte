<script lang="ts">

  import { map, optionsList } from "../stores";
  import Map from "./Map.svelte";
  import { onMount } from "svelte";
  export let data
  let selectedOption : string = optionsList[0]
  $: mmap = $map

  onMount(async () => {
    $optionsList = Object.keys(data.features[0].properties)
  })

</script>
<Map bind:data={data} bind:showProperty={selectedOption}/>
<style>

</style>