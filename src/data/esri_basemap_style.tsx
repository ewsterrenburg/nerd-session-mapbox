const mapStyleEsriBaseMap = {
    version: 8,
    name: 'Mapbox',
    sources: {
      esri_basemap_topo: {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        attribution: 'Basemap by ESRI ArcGIS Online',
      },
      esri_basemap_canvas: {
        maxzoom: 16,
        type: 'raster',
        tiles: [
          'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        attribution: 'Basemap by ESRI ArcGIS Online',
      },
    
    },
    glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
    layers: [
      {
        id: 'basemap',
        type: 'raster',
        source: 'esri_basemap_canvas',
        minzoom: 0,
      },
    ],
  };


export default mapStyleEsriBaseMap;