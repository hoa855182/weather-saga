import { Grid, Paper } from '@mui/material';


import { makeStyles } from "@mui/styles";
import { BsSun, BsWind, BsSunrise, BsSunset, BsThermometerLow } from 'react-icons/bs';
import { IoMdWater, IoIosTimer } from 'react-icons/io'
import { selectWeather,selectState } from '../Redux/weatherSlice';
import { CircularProgress } from '@mui/material';

import time from '../Convert/time';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    xs8: {
        backgroundColor: "rgb(246, 246, 248) !important",
        borderRadius: "0 !important",
        height: "90vh",
    },
    Tab: {
        paddingTop: "30px",
    },
    desc: {
        height: "200px",
        position:"relative",
        // '& span': {
        //     position: "absolute",
        //     top: "50%",
        //     left: "50%",
        //     translate: "transform (-50%,-50%)",
        // }
    },
    title: {
        paddingLeft: "10px",
        color: "#9e9e9e"
    },
    wth: {
        textAlign: "center",
        paddingTop: "35px",
        fontSize: "25px",

    },

    wth2: {
        textAlign: "left",
        paddingTop: "10px",
        paddingLeft: "10px",
        fontSize: "25px",
        display: "flex",
        alignItems: "center",
    },

    icon_yellow: {
        color: "#fdd835",
    },

    icon_blues: {
        color: "#03a9f4",
    },
    text: {
        paddingLeft: "10px",
        paddingBottom: "5px",
    },
    block: {
        position:"relative"
    },
    load: {
        position: "absolute",
        top: "40%",
        left: "42%",
        translate: "transform (-50%,-50%)",
    },
})

function Today() {
    const classes = useStyles();
   
    const status = useSelector(selectState)

    const data = useSelector(selectWeather)  
   
    return (
        <Grid container spacing={3}>
            <Grid item xs={4} className={classes.block}>
                <Paper className={classes.desc}>
                    <h2 className={classes.title}>UV index</h2>
                    {status ==='loading'
                        ?   
                        <div
                            className={classes.load}
                        >
                            <CircularProgress sx={{ color: 'grey.500' }}  color="inherit" />
                        </div>
                            
                        :
                        <div className={classes.wth}>
                            <h1 className={classes.icon_yellow}>
                                <BsSun />
                            </h1>
                            {data.current ? <h4>{data.current.uvi}</h4> : null}
                        </div>
                    }
                    
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.desc} >
                    <h2 className={classes.title}>Wind Status</h2>
                    {status === 'loading'
                        ?
                        <div
                            className={classes.load}
                        >
                            <CircularProgress sx={{ color: 'grey.500' }} color="inherit" />
                        </div>
                        :
                        <div className={classes.wth}>
                            <h1 className={classes.icon_blues}><BsWind /></h1>
                            {data.current ? <h4>{data.current.wind_speed} km/h</h4> : null}
                        </div>
                    }
                </Paper>

            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.desc}>
                    <h2 className={classes.title}>Sunrise & Sunset</h2>
                    {status === 'loading'
                        ?
                        <div
                            className={classes.load}
                        >
                            <CircularProgress sx={{ color: 'grey.500' }} color="inherit" />
                        </div>
                        :
                        <div>
                            <div className={classes.wth2}>
                                <h1 className={classes.icon_yellow}><BsSunrise /></h1>
                                {data.current ? <h4 className={classes.text}>{time.Hour(data.current.sunrise)}</h4> : null}
                            </div>
                            <div className={classes.wth2}>
                                <h1 className={classes.icon_yellow}><BsSunset /></h1>
                                {data.current ? <h4 className={classes.text}>{time.Hour(data.current.sunset)}</h4> : null}
                            </div>
                        </div>
                    }
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.desc}>
                    <h2 className={classes.title}>Humidity</h2>
                    {status === 'loading'
                        ?
                        <div
                            className={classes.load}
                        >
                            <CircularProgress sx={{ color: 'grey.500' }} color="inherit" />
                        </div>
                        :
                        <div className={classes.wth}>
                            <h1 className={classes.icon_blues}><IoMdWater /></h1>
                            {data.current ? <h4>{data.current.humidity}%</h4> : null}
                        </div>
                    }
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.desc}>
                    <h2 className={classes.title}>Visibility</h2>
                    {status === 'loading'
                        ?
                        <div
                            className={classes.load}
                        >
                            <CircularProgress sx={{ color: 'grey.500' }} color="inherit" />
                        </div>
                        :
                        <div className={classes.wth}>
                            <h1 className={classes.icon_yellow}><IoIosTimer /></h1>
                            {data.current ? <h4>{data.current.visibility / 1000} km</h4> : null}
                        </div>
                    }
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.desc}>
                    <h2 className={classes.title}> Pressure</h2>
                    {status === 'loading'
                        ?
                        <div
                            className={classes.load}
                        >
                            <CircularProgress sx={{ color: 'grey.500' }} color="inherit" />
                        </div>
                        :
                        <div className={classes.wth}>
                            <h1 className={classes.icon_blues}><BsThermometerLow /></h1>
                            {data.current ? <h4>{data.current.pressure} hPa</h4> : null}
                        </div>
                    }
                </Paper>
            </Grid>
        </Grid>
    
    );
}

export default Today;