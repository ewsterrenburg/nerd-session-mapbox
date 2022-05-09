import { FC, useState } from 'react'
import { styled } from '@mui/material'

import Header from '@/header'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Page0 from './pages/Page0'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'


const App: FC = () => {
  const [value, setValue] = useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Root>
      <Box sx={{ height: '100vh', width: '100vw', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Just a basemap" value="0" />
                <Tab label="Add some lines" value="1" />
                <Tab label="Coloring by numbers" value="2" />
                <Tab label="And widthing(?) as well" value="3" />
                <Tab label="More dynamic goodies" value="4" />
                <Tab label="Finally offsets" value="5" />
                <Tab label="Looking the cow into the butt" value="6" />
              </TabList>
            </Box>
            <TabPanel value="0"><Page0/></TabPanel>
            <TabPanel value="1"><Page1/></TabPanel>
            <TabPanel value="2"><Page2/></TabPanel>
            <TabPanel value="3"><Page3/></TabPanel>
            <TabPanel value="4"><Page4/></TabPanel>
            <TabPanel value="5"><Page5/></TabPanel>
            <TabPanel value="6"><Page6/></TabPanel>
          </TabContext>
        </Box>
      {/* <Header /> */}
    </Root>
  )
}

const Root = styled('div')`
  padding: 1% 2% 10vh 2%;
  width: 100%;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    text-decoration: none;
    color: ${({ theme: { palette } }) => palette.primary.main};
  }
`

export default App
