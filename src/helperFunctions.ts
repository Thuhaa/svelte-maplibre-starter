import type { Map as MapLibreMap } from "maplibre-gl";


export const addFillGeoJSONToMap = async (map: MapLibreMap, geoJSON: any, id:string) => {
  if(map){
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
}

export const showChoropleth = async (map: MapLibreMap, geoJSON: any, id:string, property:string) => {
  if(map){
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
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', property],
          0,
          '#fff5f0',
          10,
          '#fee0d2',
          20,
          '#fcbba1',
          30,
          '#fc9272',
          40,
          '#fb6a4a',
          50,
          '#ef3b2c',
          60,
          '#cb181d',
          70,
          '#a50f15',
          80,
          '#67000d'
        ],
        'fill-outline-color': '#fff',
        'fill-opacity': 0.8
      }
    })
  }
}


// Loop through the geoJSON feature properties and find the kind of values we have and then generate stops for the map
export const getStops = (geoJSON: any, property:string) => {
  const stops: any[] = []
  for (const feature of geoJSON.features) {
    const value = feature.properties[property]
    if (!stops.includes(value)) {
      stops.push(value)
    }
  }
  return stops
}

// Todo: add a function to get the min and max values of a property in a geoJSON

// If layer source already exists, remove it and add the new one with new stops
export const updateChoropleth = async (map: MapLibreMap, geoJSON: any, id:string, property:string) => {
  if(map){
    if (map.getSource(id)) {
      map.removeLayer(id)
      map.removeSource(id)
    }
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
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', property],
          0,
          '#fff5f0',
          10,
          '#fee0d2',
          20,
          '#fcbba1',
          30,
          '#fc9272',
          40,
          '#fb6a4a',
          50,
          '#ef3b2c',
          60,
          '#cb181d',
          70,
          '#a50f15',
          80,
          '#67000d'
        ],
        'fill-outline-color': '#fff',
        'fill-opacity': 0.8
      }
    })
  }
}
