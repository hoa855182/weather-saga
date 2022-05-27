
import { Grid, Paper, Box} from '@mui/material';
import { makeStyles } from "@mui/styles";

import { selectState, selectWeather } from '../Redux/weatherSlice';

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { cvDa } from '../Convert/Date';
import { CircularProgress, LinearProgress } from '@mui/material';
import time from '../Convert/time';

const useStyles = makeStyles({
    week: {
        textAlign: "center",
        cursor: "pointer",
        
    },

    date: {
        color: "#9e9e9e",
    },

    block_active: {
        '&[class*="MuiPaper"]': {
            backgroundColor: "#90caf9",
            '& [class*="date"]': {
                color: "#2e7d32",
            },
            '& [class*="temp"]': {
                color: "#2e7d32",
            },
        },
    },

    temp: {
        color: "#9e9e9e",
    },
    detail: {
        marginTop: "20px",
        
    },
    title: {
        color: "#9e9e9e",
    },
    descript: {
        paddingBottom: "10px",
        color: "#9e9e9e",
    },
    info: {
        paddingLeft: "20px",
        paddingTop: "20px",
    },
    load: {
        backgroundColor: "white"
    }
})


function Week() {
    const classes = useStyles();
    const status = useSelector(selectState)
    const data = useSelector(selectWeather)  

    const [show, setShow] = useState(
        data?.daily?.[0]
    )

    
    useEffect(() => {
        setShow( data?.daily?.[0])
    }, [status,data])

    const handleClick = (data) => {
        setShow(data)
    }

    return (
        
        <div>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {data?.daily?.map((item, index) => {
                    return (
                        <Grid
                            item xs={3}
                            className={classes.week}
                        >
                            {status === 'loading'
                                ?
                                <div
                                    className={classes.load}
                                >
                                    <CircularProgress sx={{ color: 'grey.500' }} color="inherit" />
                                </div>
                                :
                                <Paper
                                    className={`${classes.block} ${item.dt === show?.dt ? classes.block_active : ''}`}
                                    onClick={(e) => handleClick(item)}
                                >
                                    <div
                                        className={classes.date}
                                    >
                                        {data.daily ? <h4>{cvDa(item.dt)}, {time.Date(item.dt)}</h4> : null}
                                    </div>
                                    <div>
                                        {data.daily ? <img
                                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                            alt="abc"
                                        /> : null}
                                    </div>
                                    <div className={classes.temp}>
                                        {data.daily ? <h4>{item.temp.min.toFixed()}°C - {item.temp.max.toFixed()}°C </h4> : null}
                                    </div>
                                </Paper>
                            }
                        </Grid>
                    );
                })}
            </Grid>
        
            <Grid className={classes.detail}>
                <Paper className={classes.info}>
                    <div>
                        <h3 className={classes.title}>{cvDa(show?.dt)}, {time.Date(show?.dt)}</h3>
                    </div>
                    {status === 'loading'
                        ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>

                        :
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} pt={2}>
                            
                            <Grid item xs={6} >
                                <p className={classes.descript}> Temp current: {show?.temp.day.toFixed()}°C</p>
                                <p className={classes.descript}>Temperature: {show?.temp.min.toFixed()}°C - {show?.temp.max.toFixed()}°C</p>
                                <p className={classes.descript}>Humidity: {show?.humidity}%</p>
                                <p className={classes.descript}>Wind speed: {show?.wind_speed} km/h</p>
                            </Grid>
                            
                            <Grid item xs={6}>
                                <p className={classes.descript}>Sunrise: {time.Hour(show?.sunrise)}</p>
                                <p className={classes.descript}>Sunset: {time.Hour(show?.sunset)}</p>
                                <p className={classes.descript}>Description: {show?.weather[0].description}</p>
                                <p className={classes.descript}>Atmospheric pressure: {show?.pressure} hPa</p>
                            </Grid>
                        </Grid>
                    }
                </Paper>
            </Grid>
        </div>
    )
}

export default Week;
