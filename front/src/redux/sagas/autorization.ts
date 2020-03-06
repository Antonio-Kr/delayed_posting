import {put, call} from 'redux-saga/effects';
import {UserApi} from "../../API/api";
import {UserActions} from "../actions";

export function* fetchUser() {
    try {
        yield put(UserActions.fetchingUser({isFetching: true}))
        const user = yield call(UserApi.getUser, 1)
        yield put(UserActions.setUser(user))

    } catch (error) {
        yield put({type: "FETCH_FAILED", error})
    }
}

