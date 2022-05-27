import { Grid, IconButton, Paper, TextField } from '@mui/material';

import weatherpict from '../images/weatherpict.png';
import { makeStyles } from "@mui/styles";
import { CircularProgress } from '@mui/material';
import { cvDate } from '../Convert/Date';
// import { getWeatherAsync } from '../Redux/WeatherReducer';
import { getWeatherAsync, selectState } from '../Redux/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectWeather } from '../Redux/weatherSlice';
import time from '../Convert/time';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { GET_WEATHER } from '../Redux/weatherAction'


const useStyles = makeStyles({
    xs4: {
        '&[class*="MuiPaper"]': {
           
            borderRadius: "0",
        },
        textAlign:"center",
        height: "100%",
        
    },

    text_field: {
        marginTop: "30px !important",
        width: '90%',
        fontSize: "1rem",
        fontWeight: "400",
        '& input': {
            height: '0.5em'
        }
    },
    img: {
        width: "50%",
       
    },

    desc: {
        fontSize: "25px",

    },
    date: {
        marginTop: "20px",
        fontSize: "18px",

    },
    wth: {
        marginTop: "20px",
        fontSize: "15px"
    },
  
    pict_info: {
        position: "relative",
       
        marginTop: "20px",
        alignItems: "center",
        marginBottom: "20px",
    },

    wth_pict: {
        width: "80%",
        borderRadius: "0.5em",

    },
    script: {
        color: "white",
        fontWeight: "bold",
        fontSize: "22px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        position: "absolute"
    },
    load:{
        marginTop:"100px",
        marginBottom: "50px",
    }
})

function Sidebar() {
    const classes = useStyles();
    const status = useSelector(selectState)
    const dispatch = useDispatch();
    const data = useSelector(selectWeather)  
    console.log(data);
    
    // const [data, setData] = useState({
    //     name: '',
    //     sys: {
    //         country: ''
    //     }
    // });

    // const [location, setLocation] = useState("")



    
    

    const handleInput = (e) => {
        if (e.code === 'Enter') {
            dispatch(GET_WEATHER(e.target.value));
            e.target.value=''
        }
       
    }
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if(status==='error'){
            setOpen(true)
        }
    }, [status])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const action = (
        <div>
            <Button color="secondary" size="small" onClick={handleClose}>UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            </IconButton>
        </div>
    )
    return (
        <Grid
            item xs={3}
        >
            {status==='error'
                &&
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    action= {action}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity = "error" sx={{width: "100%"}}>
                        City not found! Try Again
                    </Alert>
                </Snackbar>
            }
            <Paper className={classes.xs4}>
                <TextField
                    className={classes.text_field}
                    label="Search..."
                    variant="outlined"
                    
                    // onKeyDown={handleKey}
                    onKeyPress={(e)=>handleInput(e)}
                />
                {status === 'loading'
                    ?
                    <div
                        className={classes.load}
                    >
                        <CircularProgress sx={{ color: 'grey.500' }} color="inherit" />
                    </div>
                    :
                    <div>
                        <div>
                            {data.current ? <img
                                src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
                                alt="weather status icon"
                                className={classes.img}
                            /> : null}
                        </div>
                        <div className={classes.desc}>

                            <h1>{data.cityName}</h1>
                            {data.current ? <h3>{data.current.temp.toFixed()}°C</h3> : null}
                        </div>
                        <div className={classes.date}>
                            {data.current ? <h3>{cvDate(data.current.dt)}, {time.Hour(data.current.dt)}</h3> : null}

                        </div>
                        <div className={classes.wth}>
                            {data.current ? <h3>{data.current.weather[0].main}</h3> : null}
                            {data.current ? <h4>{data.current.weather[0].description}</h4> : null}
                        </div>
                    </div>
                }
                <div className={classes.pict_info}>
                    <img className={classes.wth_pict} src={weatherpict} />
                    {status === 'loading'
                        ?
                        <div
                            className={classes.script}
                        >
                            <CircularProgress sx={{ color: 'white.500' }} color="inherit" />
                        </div>
                        :
                        <h1 className={classes.script}>{data.cityName}</h1>
                    }
                </div>
                <div>
                </div>
            </Paper>
        </Grid>
    );
}

export default Sidebar;