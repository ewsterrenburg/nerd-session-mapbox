import ReactMapGL from 'react-map-gl'

import maplibregl from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'

import esri_basemap_style from '../data/esri_basemap_style'

export default function MapView(props) {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ReactMapGL
        initialViewState={{
          latitude: 51.5,
          longitude: 3.8,
          zoom: 10
        }}
        mapLib={maplibregl}
        style={{ width: 800, height: 600 }}
        mapStyle={esri_basemap_style}
      >
        {props.children}
      </ReactMapGL>
    </div>
  )
}
