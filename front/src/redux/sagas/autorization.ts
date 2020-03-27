import {put, call, takeLatest, take, takeEvery} from 'redux-saga/effects';
import {AuthActions} from "../actions";
import {instance, UserApi} from "../../API/api";

const headerParams = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
}

const loginRequest = {
    Start: {
        type: AuthActions.Type.LOGIN_REQUEST,
        payload: {
            isLoginFetching: true,
        }
    },
    End: {
        type: AuthActions.Type.LOGIN_REQUEST,
        payload: {
            isLoginFetching: true
        }
    },
    Failed: {
        type: AuthActions.Type.LOGIN_REQUEST_FAILED,
        payload: {
            loginError: false
        }
    }
}


export function* login(payload: any) {

    payload = JSON.stringify({
        email: payload.payload.email,
        password: payload.payload.password
    })

    try {
        yield put(loginRequest.Start)
        const request = yield call(instance.post, '/login', payload)
        if (request.status == 200) {
            // TODO:
            //    get Token
            //    redirect to home

            yield put({
                type: AuthActions.Type.LOGIN_REQUEST_SUCCESS, payload: {
                    token: request.token
                }
            });
            yield put(loginRequest.End)
        }
        if (request.status == 401) {
            yield put(loginRequest.Failed)
        }
    } catch (error) {
        yield put(loginRequest.Failed)
        console.error(error)
    }
}

export function* logout() {
    try {
        // yield put({AuthActions.Type.LOGOUT})
        window.localStorage.clear();
    } catch (error) {
        yield put({type: "FETCH_FAILED", error})
    }
}

export function* loginFlow() {
    // while (true) {
    yield takeLatest(AuthActions.Type.LOGIN, login)
    // yield takeLatest()
    // yield take(AuthActions.logout, logout)
    // }
}