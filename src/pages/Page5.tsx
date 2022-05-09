import { useState } from 'react';
import MapView from '../map/Map'
import {Source, Layer} from 'react-map-gl'
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
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
import { Image } from 'mui-image'

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

const getVolumePaint = (attribute, maxVolume, exaggeration) => {
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
    'line-width': [
      'interpolate',
      ['linear'],
      ['get', attribute],
      0,
      1,
      maxVolume,
      10 * exaggeration,
    ],
    'line-offset': [
      'interpolate',
      ['linear'],
      ['get', attribute],
      0,
      0.5,
      5,
      5 * exaggeration,
    ],
    'line-color': ['case', ...COLOR_RAMP(['get', attribute])],
  };
};

const getLayerSections = (visible, paint, activeFieldName) => {
  const visibility = visible ? 'visible' : 'none';
  return {
    id: 'sections',
    type: 'line',
    paint,
    layout: {
      visibility,
      'line-sort-key': ['*', -1, ['get', activeFieldName]],
    },
  };
};

const codestring = `
const COLOR_NO_DATA = 'rgba(128,128,128,0.5)';
const COLOR_VOLUME_1 = 'rgb(241,238,246)';
const COLOR_VOLUME_2 = 'rgb(208,209,230)';
const COLOR_VOLUME_3 = 'rgb(166,189,219)';
const COLOR_VOLUME_4 = 'rgb(116,169,207)';
const COLOR_VOLUME_5 = 'rgb(54,144,192)';
const COLOR_VOLUME_6 = 'rgb(5,112,176)';
const COLOR_VOLUME_7 = 'rgb(3,78,123)';

const getVolumePaint = (attribute, maxVolume, exaggeration) => {
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
    'line-width': [
      'interpolate',
      ['linear'],
      ['get', attribute],
      0,
      1,
      maxVolume,
      10 * exaggeration,
    ],
    'line-offset': [
      'interpolate',
      ['linear'],
      ['get', attribute],
      0,
      0.5,
      5,
      5 * exaggeration,
    ],
    'line-color': ['case', ...COLOR_RAMP(['get', attribute])],
  };
};

const getLayerSections = (visible, paint, activeFieldName) => {
  const visibility = visible ? 'visible' : 'none';
  return {
    id: 'sections',
    type: 'line',
    paint,
    layout: {
      visibility,
      'line-sort-key': ['*', -1, ['get', activeFieldName]],
    },
  };
};

...

const [exaggeration, setExaggeration] = useState(1);
const [visible, setVisible] = useState(true);

const handleSliderChange = (event: Event, newValue: number | number[]) => {
  setExaggeration(newValue as number);
};
const handleCheckboxChange = (event: Event, newValue: boolean | boolean[]) => {
  setVisible(newValue as boolean);
};

...

<FormControlLabel control={<Checkbox
  checked={visible}
  onChange={handleCheckboxChange}
/>} label="Visible" />
<Slider
  value={exaggeration}
  onChange={handleSliderChange}
  aria-labelledby='discrete-slider'
  valueLabelDisplay='auto'
  step={1}
  min={1}
  max={20}
/>
<MapView>
  <Source id='my-data' type='geojson' data={geojson}>
    <Layer {...getLayerSections(
      visible,
      getVolumePaint('Volume|V_Totaal|T_Ochtend', 100, exaggeration),
      'Volume|V_Totaal|T_Ochtend',
      )}
    />
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
  const [exaggeration, setExaggeration] = useState(1);
  const [visible, setVisible] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setExaggeration(newValue as number);
  };
  const handleCheckboxChange = (event: Event, newValue: boolean | boolean[]) => {
    setVisible(newValue as boolean);
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
            Goal: Can we finally have offsets?
        </Typography>
      </TabPanel>
      <TabPanel value="2">
        <FormControlLabel control={<Checkbox
          checked={visible}
          onChange={handleCheckboxChange}
        />} label="Visible" />
        <Slider
          value={exaggeration}
          onChange={handleSliderChange}
          aria-labelledby='discrete-slider'
          valueLabelDisplay='auto'
          step={1}
          min={1}
          max={20}
        />
        <MapView>
          <Source id='my-data' type='geojson' data={geojson}>
            <Layer {...getLayerSections(
              visible,
              getVolumePaint('Volume|V_Totaal|T_Ochtend', 100, exaggeration),
              'Volume|V_Totaal|T_Ochtend',
              )}
            />
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
        <Image src="/compare.png" width={600} />
        <List>
          <ListItem>
            <ListItemIcon>
              <SentimentVerySatisfiedIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Finally offsets!"
              secondary={<>This opens the door for exciting comparison plots! And is something that does seem to lack in the <Link target="_blank" href="https://developers.arcgis.com/javascript/latest/sample-code/playground/live/">ESRI Symbol playground</Link></>}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentNeutralIcon />
            </ListItemIcon>
            <ListItemText
              primary="Now I want labels!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentNeutralIcon />
            </ListItemIcon>
            <ListItemText
              primary="And legends!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentNeutralIcon />
            </ListItemIcon>
            <ListItemText
              primary="And all other kinds of symbologies!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentNeutralIcon />
            </ListItemIcon>
            <ListItemText
              primary="And point layers!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentNeutralIcon />
            </ListItemIcon>
            <ListItemText
              primary="And polygon layers!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentNeutralIcon />
            </ListItemIcon>
            <ListItemText
              primary="And use JavaScript logic in stead of quirky MapBox expressions!"
            />
          </ListItem>
        </List>
      </TabPanel>
    </TabContext>
  </Box>
  )
}