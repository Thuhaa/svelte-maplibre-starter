import type { Map as MapLibreMap } from "maplibre-gl";


export const addFillGeoJSONToMap = async (map: MapLibreMap, geoJSON: any, id:string) => {
  // Adding the GeoJSON to the map
  map.addSource(id, {
    type: 'geojson',
    data: geoJSON
  })
  // Adding the layer to the map
  map.addLayer({
    id: id,
    type: 'fill',
    source: id,
    paint: {
      'fill-color': '#088',
      'fill-outline-color': '#fff',
      'fill-opacity': 0.8
    }
  })
}