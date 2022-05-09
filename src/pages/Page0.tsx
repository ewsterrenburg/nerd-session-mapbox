import { useState } from 'react';
import MapView from '../map/Map'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import SyntaxHighlighter from 'react-syntax-highlighter';

import esri_basemap_style from '../data/esri_basemap_style'
import { zenburn } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const codestring = `<ReactMapGL
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
          <Tab label="What's underneath in MapBox?" value="4" />
        </TabList>
      </Box>
      <TabPanel value="1">The simplest map</TabPanel>
      <TabPanel value="2">
        <MapView>
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
      <TabPanel value="4">
        <SyntaxHighlighter
          language="javascript"
          style={zenburn}
          showLineNumbers
        >
          {JSON.stringify(esri_basemap_style, null, 2)}
        </SyntaxHighlighter>
      </TabPanel>
    </TabContext>
  </Box>
  )
}
