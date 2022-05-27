import axios from "axios";
import urls from "./urls";

const apikey = 'bd158a0b6c6b4e825c668c64c1934263'

const WeatherApi = {
    GET:async (params) => {
        const weather = await axios.get(urls.weatherOneCall, {
            params: {
                ...params,
                appid: apikey ,
                units: 'metric',
            }
        })
        return weather.data; 
    }
}

export default WeatherApi