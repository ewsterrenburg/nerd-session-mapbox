import { useState } from 'react';
import MapView from '../map/Map'
import {Source, Layer} from 'react-map-gl'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import SyntaxHighlighter from 'react-syntax-highlighter';

import esri_basemap_style from '../data/esri_basemap_style'
import { zenburn } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import geojson from '@/data/nebula_sections'

const COLOR_NO_DATA = 'rgba(128,128,128,0.5)';
const COLOR_VOLUME_1 = 'rgb(241,238,246)';
const COLOR_VOLUME_2 = 'rgb(208,209,230)';
const COLOR_VOLUME_3 = 'rgb(166,189,219)';
const COLOR_VOLUME_4 = 'rgb(116,169,207)';
const COLOR_VOLUME_5 = 'rgb(54,144,192)';
const COLOR_VOLUME_6 = 'rgb(5,112,176)';
const COLOR_VOLUME_7 = 'rgb(3,78,123)';

const getVolumePaint = (attribute, maxVolume) => {
  function COLOR_RAMP(variable) {
    return [
      ['==', variable, null],
      COLOR_NO_DATA,
      ['>', variable, maxVolume],
      COLOR_VOLUME_7,
      ['>', variable, 0.75 * maxVolume],
      COLOR_VOLUME_6,
      ['>', variable, 0.5 * maxVolume],
      COLOR_VOLUME_5,
      ['>', variable, 0.25 * maxVolume],
      COLOR_VOLUME_4,
      ['>', variable, 0.125 * maxVolume],
      COLOR_VOLUME_3,
      ['>', variable, 1],
      COLOR_VOLUME_2,
      COLOR_VOLUME_1,
    ];
  }

  return {
    'line-width': 3,
    'line-color': ['case', ...COLOR_RAMP(['get', attribute])],
  };
};

const layerStyle = {
  id: 'sections',
  type: 'line',
  paint: getVolumePaint('Volume|V_Totaal|T_Ochtend', 100),
}

const codestring = `
const COLOR_NO_DATA = 'rgba(128,128,128,0.5)';
const COLOR_VOLUME_1 = 'rgb(241,238,246)';
const COLOR_VOLUME_2 = 'rgb(208,209,230)';
const COLOR_VOLUME_3 = 'rgb(166,189,219)';
const COLOR_VOLUME_4 = 'rgb(116,169,207)';
const COLOR_VOLUME_5 = 'rgb(54,144,192)';
const COLOR_VOLUME_6 = 'rgb(5,112,176)';
const COLOR_VOLUME_7 = 'rgb(3,78,123)';

const getVolumePaint = (attribute, maxVolume) => {
  function COLOR_RAMP(variable) {
    return [
      ['==', variable, null],
      COLOR_NO_DATA,
      ['>', variable, maxVolume],
      COLOR_VOLUME_7,
      ['>', variable, 0.75 * maxVolume],
      COLOR_VOLUME_6,
      ['>', variable, 0.5 * maxVolume],
      COLOR_VOLUME_5,
      ['>', variable, 0.25 * maxVolume],
      COLOR_VOLUME_4,
      ['>', variable, 0.125 * maxVolume],
      COLOR_VOLUME_3,
      ['>', variable, 1],
      COLOR_VOLUME_2,
      COLOR_VOLUME_1,
    ];
  }

  return {
    'line-width': 3,
    'line-color': ['case', ...COLOR_RAMP(['get', attribute])],
  };
};

const layerStyle = {
  id: 'sections',
  type: 'line',
  paint: getVolumePaint('Volume|V_Totaal|T_Ochtend', 100),
}

<MapView>
  <Source id='my-data' type='geojson' data={geojson}>
    <Layer {...layerStyle} />
  </Source>
</MapView>

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
</ReactMapGL>`;
            


export default function Page() {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Our attempts" value="1" />
          <Tab label="The result" value="2" />
          <Tab label="Looking at the Code" value="3" />
          {/* <Tab label="What's underneath in MapBox?" value="4" /> */}
        </TabList>
      </Box>
      <TabPanel value="1">Data dependent color would be even nicer</TabPanel>
      <TabPanel value="2">
        <MapView>
          <Source id='my-data' type='geojson' data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </MapView>
      </TabPanel>
      <TabPanel value="3">
      <SyntaxHighlighter
          language="typescript"
          style={zenburn}
          showLineNumbers
        >
          {codestring}
        </SyntaxHighlighter>
      </TabPanel>
      {/* <TabPanel value="4">
        <SyntaxHighlighter
          language="javascript"
          style={zenburn}
          showLineNumbers
        >
          {JSON.stringify(esri_basemap_style, null, 2)}
        </SyntaxHighlighter>
      </TabPanel> */}
    </TabContext>
  </Box>
  )
}