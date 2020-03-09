import {put, call, takeLatest} from 'redux-saga/effects';
import {UserApi} from "../../API/api";
import {AuthActions} from "../actions";

export function* registerUser() {

}

export function* sendRegistrationData(payload: any) {
    try {
        // const data = yield call(UserApi.getUserData())
        yield put({type: AuthActions.Type.AUTHENTICATION_IN_PROGRESS, payload})
        yield (console.log(UserApi.getUserData()))
    } catch (error) {
        yield put({type: "FETCH_FAILED", error})
    }
}

export function* RegisterWatchAgeUp() {
    yield takeLatest(AuthActions.authenticationInProgress, sendRegistrationData)
}