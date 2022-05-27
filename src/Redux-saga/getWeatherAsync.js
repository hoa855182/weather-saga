import { call, put, takeEvery,takeLatest } from 'redux-saga/effects'
import WeatherApi from '../apis/WeatherApi';
import types from '../const/types';

import CurrentPositon from '../apis/CurrentPosition';
import name from '../apis/name'
import { setWeather, setStatus } from '../Redux/weatherSlice'

export function* getWeather(action) {
    try {
        yield put(setStatus('loading'))
        let city = yield action.payload
        let lat, lon = 0

        if (city === undefined) {
            const currentPostion = yield CurrentPositon();
            console.log(currentPostion)
            lat = yield currentPostion[0];
            lon = yield currentPostion[1];
        }
        else {
            const position = yield name.GET_LATLON({ q: city })
            lat = position.lat
            lon = position.lon
        }
        const weather = yield WeatherApi.GET({ lat: lat, lon: lon });
        const cityname = yield name.GET({ lat, lon });
        yield call(() => {
            return new Promise((resolve) => setTimeout(resolve, 1000))
        })
        yield put(setWeather({ ...weather, cityName: cityname }))
        yield put(setStatus('idle'))
    }
    catch (e) {
        yield put(setStatus('error'))
    }


}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* getWeatherAsync() {
    yield takeLatest(types.GET_WEATHER, getWeather)
}
