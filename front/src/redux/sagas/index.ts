import { all } from 'redux-saga/effects';
import {RegisterWatchAgeUp} from "./autorization";

export default function* rootSaga() {
    yield all([RegisterWatchAgeUp]);
}