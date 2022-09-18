<script lang="ts">
    import { onMount } from 'svelte'
    import maplibregl, { Map } from 'maplibre-gl'
    import 'maplibre-gl/dist/maplibre-gl.css'
    import { map } from '../stores'
    import { addFillGeoJSONToMap } from "../helperFunctions";

    export let data: any

    let mapContainer: HTMLDivElement

    onMount(() => {
      const mapLibreMap = new Map({
            container: mapContainer,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [30.05885, -1.94995],
            zoom: 8,
        })
      mapLibreMap.addControl(new maplibregl.NavigationControl({}), 'top-right')
      mapLibreMap.addControl(new maplibregl.ScaleControl({}), 'bottom-left')
      mapLibreMap.addControl(new maplibregl.FullscreenControl({}), 'top-right')
      mapLibreMap.addControl(new maplibregl.GeolocateControl({}), 'top-right')
      map.set(mapLibreMap)

      mapLibreMap.on('load', async () => {
        await addFillGeoJSONToMap(mapLibreMap, data, 'districts')
      })
    });

</script>
<div class="map" id="map" bind:this={mapContainer}>
  {#if map}
    <slot />
  {/if}
</div>
<style>
    .map {
        position: absolute;
        width: 100%;
        height: 100vh;
        margin: 0;
    }
</style>