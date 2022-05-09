import { useState } from 'react';
import MapView from '../map/Map'
import {Source, Layer} from 'react-map-gl'
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import LooksThreeIcon from '@mui/icons-material/Looks3';
import LooksFourIcon from '@mui/icons-material/Looks4';
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
const getLblLayerSections = (
  visible,
  field,
  fontSize,
  nDecimals,
  showZeros,
  activeLegend,
  attrType,
  lblData
) => {
  const visibility = visible ? 'visible' : 'none';
  let lblExpression;
  let valueExpression;
  const emptyExpression = '';
  if (Object.keys(lblData).length === 0) {
    if (activeLegend === 'roadtype') {
      valueExpression = [
        'get',
        ['to-string', ['get', field]],
        ['literal', roadTypeLabels],
      ];
    } else if (attrType === 'string') {
      valueExpression = ['to-string', ['get', field]];
    } else if (attrType === 'number') {
      valueExpression = [
        'to-string',
        [
          '/',
          ['round', ['*', ['to-number', ['get', field]], 10 ** -nDecimals]],
          10 ** -nDecimals,
        ],
      ];
    }
  } else {
    valueExpression = [
      'to-string',
      [
        '/',
        [
          'round',
          [
            '*',
            [
              'to-number',
              ['get', ['to-string', ['get', 'ID']], ['literal', lblData]],
            ],
            10 ** -nDecimals,
          ],
        ],
        10 ** -nDecimals,
      ],
    ];
  }
  if (showZeros) {
    lblExpression = valueExpression;
  } else {
    lblExpression = [
      'case',
      ['==', valueExpression, '0'],
      emptyExpression,
      valueExpression,
    ];
  }

  return {
    id: 'sections_labels',
    type: 'symbol',
    source: 'nebula_sections',
    'source-layer': 'nebula_sections',
    minzoom: 10,
    layout: {
      visibility,
      'text-field': lblExpression,
      'symbol-placement': 'line-center',
      'text-size': fontSize,
      'text-rotation-alignment': 'map',
      'text-offset': [0, 0.6],
      'text-allow-overlap': true,
      'text-ignore-placement': true,
      'text-font': ['Open Sans Regular'],
    },
  };
};`;
            


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
          <Tab label="Because I can" value="1" />
          {/* <Tab label="The result" value="2" />
          <Tab label="Looking at the Code" value="3" /> */}
          {/* <Tab label="What's underneath in MapBox?" value="4" /> */}
          <Tab label="Labels" value="5" />
          <Tab label="Other paints, points & polygons" value="6" />
          <Tab label="Legends" value="7" />
          <Tab label="And how about that JavaScript logic?" value="8" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <Image src="https://images.fineartamerica.com/images-medium-large/cow-butts-patrice-clarkson.jpg" />
      </TabPanel>
      <TabPanel value="2">
        <FormControlLabel control={<Checkbox
          checked={visible}
          onChange={handleCheckboxChange}
        />} label="Label" />
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
          Labels:
        </Typography>
        <Image src="/labels.png" width={600} />
        <List>
          <ListItem>
            <ListItemIcon>
              <SentimentVerySatisfiedIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Yes we can!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentVeryDissatisfiedIcon color="error" />
            </ListItemIcon>
            <ListItemText
              primary="But the syntax for rounding ain't pretty"
            />
          </ListItem>
        </List>
        <SyntaxHighlighter
          language="javascript"
          style={zenburn}
          showLineNumbers
        >
          {codestring}
        </SyntaxHighlighter>
      </TabPanel>
      <TabPanel value="6">
        <Typography variant="h5" gutterBottom component="div">
          Other paints:
        </Typography>
        <Image src="/otherpaints.png" width={600} />
        <List>
          <ListItem>
            <ListItemIcon>
              <SentimentVerySatisfiedIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="No problem here"
            />
          </ListItem> 
        </List>
      </TabPanel>
      <TabPanel value="7">
        <Typography variant="h5" gutterBottom component="div">
          Legends:
        </Typography>
        <Image src="/legend.png" width={400} />
        <List>
          <ListItem>
            <ListItemIcon>
              <SentimentVerySatisfiedIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="They can be made"
              secondary="and with some TLC, prettier than this example"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SentimentVeryDissatisfiedIcon color="error" />
            </ListItemIcon>
            <ListItemText
              primary="Yet it's custom code"
              secondary="No auto-generated goodness here..."
            />
          </ListItem> 
        </List>
      </TabPanel>
      <TabPanel value="8">
        <Typography variant="h5" gutterBottom component="div">
          Using JavaScript:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <LooksOneIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary="Loop over the currently rendered features"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LooksTwoIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary="Keep track of desired color, width, etc. per feature ID"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LooksThreeIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary="Build a MapBox Match expressions based on the compiled lists"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LooksFourIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary="Profit"
              secondary="Repeat this process if rendered features do change (performance seems to be perfectly fine so far)."
            />
          </ListItem>
        </List>
      </TabPanel>
    </TabContext>
  </Box>
  )
}