import axios from "axios";
import urls from "./urls";

const apikey = 'bd158a0b6c6b4e825c668c64c1934263'

const name = {
    GET: async (params) => {
        const name = await axios.get(urls.cityName, {
            params: {
                ...params,
                appid: apikey,
            },
        });
        console.log(name)
        return name.data?.[0].local_names.vi || name.data?.[0].local_names.en;
    },
    GET_LATLON: async (params) => {
        const latlon = await axios.get(urls.latlon, {
            params: {
                ...params,
                appid: apikey,
            },
        });
        console.log(latlon.data?.[0].lat)
        return { lat: latlon.data?.[0].lat, lon: latlon.data?.[0].lon };
    }
}

export default name