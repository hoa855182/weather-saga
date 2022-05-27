import { all, takeLatest } from "redux-saga/effects"
import { getWeatherAsync } from "../Redux-saga/getWeatherAsync";
import { GET_WEATHER } from "../Redux/weatherAction";

export default function* rootSaga() {
    yield all([
        getWeatherAsync()
    ])
    // code after all-effect
}

export function* test() {
    yield takeLatest('*', (action)=> {
        console.log('abc');
    });
}