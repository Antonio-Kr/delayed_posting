import { all } from 'redux-saga/effects';
import {loginFlow} from "./autorization";

export default function* rootSaga() {
    yield all([loginFlow()]);
