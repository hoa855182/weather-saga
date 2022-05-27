import { Grid, Paper, Container, TextField, Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Today from './Today';
import { makeStyles } from "@mui/styles";
import { selectWeather } from '../Redux/weatherSlice';

import Typography from '@mui/material/Typography';


import Week from './Week';
import { useSelector } from 'react-redux';
import Hour from './Hour';


const useStyles = makeStyles({
    xs9: {
        '&[class*="MuiPaper"]':{
            backgroundColor: "rgb(246, 246, 248)",
            borderRadius: "0",
        },
        height: "100%",
    },
    Tab: {
        paddingTop: "30px",
    },

    info: {
        paddingLeft: "20px",
        marginTop: "30px",
        
    },
    
})

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component ={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function BannerR() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

   
    const data = useSelector(selectWeather)  

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Grid item xs={9}>
            <Paper className={classes.xs9}>
                <Box className={classes.Tab} sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Today" {...a11yProps(0)} />
                            <Tab label="Week" {...a11yProps(1)} />
                            <Tab label="Hour" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel
                        className={classes.info} 
                        value={value} 
                        index={0}
                    >
                        <Today/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Week/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Hour/>
                    </TabPanel>
                </Box>
            </Paper>
        </Grid>
    );
}

export default BannerR;