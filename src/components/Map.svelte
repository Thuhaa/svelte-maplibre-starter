<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import maplibregl, { Map } from 'maplibre-gl'
  import 'maplibre-gl/dist/maplibre-gl.css'
  import { map } from '../stores'
  import { addFillGeoJSONToMap, updateChoropleth } from "../helperFunctions";

  export let data: any
  export let showProperty: string
  let mapContainer: HTMLDivElement
  let mapLibreMap: Map
  let propertySelectControl: any

  function PropertySelectControl() {}


  const selectOption = (e: any) => {
    showProperty = e.target.value
    updateChoroplethMap(showProperty)
  }


  PropertySelectControl.prototype.onAdd = function (map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group select';
    this._container.innerHTML = `
      <select id="property-select">
      ${Object.keys(data.features[0].properties).map((property) => {
        return `<option value="${property}">${property}</option>`
      }).join('')}
    }
      </select>
    `;
    this._container.addEventListener('change', selectOption);
    return this._container;
  };


  PropertySelectControl.prototype.onRemove = function () {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  };

  onMount(() => {
    mapLibreMap = new Map({
          container: mapContainer,
          style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
          center: [30.05885, -1.94995],
          zoom: 8,
      })
    propertySelectControl = new PropertySelectControl()
    mapLibreMap.addControl(new maplibregl.NavigationControl({}), 'top-right')
    mapLibreMap.addControl(new maplibregl.ScaleControl({}), 'bottom-left')
    mapLibreMap.addControl(new maplibregl.FullscreenControl({}), 'top-right')
    mapLibreMap.addControl(new maplibregl.GeolocateControl({}), 'top-right')
    mapLibreMap.addControl(propertySelectControl, 'top-left')


    mapLibreMap.on('load', () => {
      map.set(mapLibreMap)
      addFillGeoJSONToMap(mapLibreMap, data, 'districts')
    })

    mapLibreMap.on('click', 'districts', function (e) {
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          '<p>' +
          e.features[0].properties[showProperty] +
          '</p>'
        )
        .addTo(mapLibreMap);
    });
    $map = mapLibreMap
  });

  const updateChoroplethMap = (showProperty: string) => {
    updateChoropleth(mapLibreMap, data, 'districts', showProperty)
  }

  onDestroy(() => {
    map.set(null)
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
        height: 100%;
        margin: 0;
    }
</style>