<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Map } from 'maplibre-gl';
    import 'maplibre-gl/dist/maplibre-gl.css';


    let map: Map;
    let mapContainer: HTMLDivElement;

    onMount(() => {
        map = new Map({
            container: mapContainer,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [0, 0],
            zoom: 0,
        });

        return () => {
            map.remove();
        };
    });
</script>
<div class="map" id="map" bind:this={mapContainer}></div>
<style>
    .map {
        position: absolute;
        width: 100%;
        height: 100vh;
        margin: 0;
    }
</style>