import { useState } from 'react';
import MapView from '../map/Map'
import { Source, Layer } from 'react-map-gl'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

import SyntaxHighlighter from 'react-syntax-highlighter';

import esri_basemap_style from '../data/esri_basemap_style'
import { zenburn } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import geojson from '@/data/nebula_sections'

export const simpleBluePaint = {
  'line-color': 'blue',
  'line-width': 3,
};

const layerStyle = {
  id: 'sections',
  type: 'line',
  paint: simpleBluePaint
}

const codestring = `
export const simpleBluePaint = {
  'line-color': 'blue',
  'line-width': 3,
};

const layerStyle = {
  id: 'sections',
  type: 'line',
  paint: simpleBluePaint
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
            <Tab label="Conclusions" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Typography variant="h5" gutterBottom component="div">
            Goal: some data would be nice...
          </Typography>
        </TabPanel>
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
      <TabPanel value="5">
        <Typography variant="h5" gutterBottom component="div">
          Conclusions:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <SentimentVerySatisfiedIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Adding a layer Easy"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentVerySatisfiedIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="And it still seems we can modify things"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentVeryDissatisfiedIcon color="error" />
            </ListItemIcon>
            <ListItemText
              primary="Still boring!"
            />
          </ListItem>
        </List>
      </TabPanel>
      </TabContext>
    </Box>
  )
}