import {call, put} from 'redux-saga/effects';
import {UserApi} from "../../API/api";
import {FETCH_USER_URL} from "../constants";

export default function* fetchUser() {
    try {
        // yeld put('REQUEST_USER')
        // yield call(UserApi.getAuthTag(FETCH_USER_URL))

    } catch (error) {
        yield put({type: "FETCH_FAILED", error})
    }
}

