// import WeatherApi from '../apis/WeatherApi';
// import types from '../const/types';
// import weatherAction from './weatherAction';
// import CurrentPositon from '../apis/CurrentPosition';
// import name from '../apis/name'


// export const getWeatherAsync = (city = '') => {
//     console.log('city')
//     return async (dispatch) => {
//         let lat = 0, lon = 0;
        
//         if (city === '') {
//             const currentPostion = await CurrentPositon();
//             lat = currentPostion[0];
//             lon = currentPostion[1];

//         }
//         else {
//             const position = await name.GET_LATLON({ q: city })
//             console.log(position)
//             lat = position.lat
//             lon = position.lon
//         }
//         const weather = await WeatherApi.GET({ lat: lat, lon: lon });
//         const cityname = await name.GET({ lat, lon });
//         console.log(weather)
//         dispatch(weatherAction.GET_WEATHER({ ...weather, cityName: cityname }))
//     }
// };
// const initState = {
//     weather: {
//     }
// };
// const weatherReducer = (state = initState, action) => {

//     switch (action.type) {
//         case types.GET_WEATHER:
//             return {
//                 ...state,
//                 weather: action.payload
//             }

//         default:
//             return state;
//     }

// };
// export default weatherReducer