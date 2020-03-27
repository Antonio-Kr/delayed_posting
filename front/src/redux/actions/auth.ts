import {createAction} from "redux-actions";
import {IAuth, IUser} from "../../types";

enum Type {
    LOGIN = 'LOGIN',
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS',
    LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED',
    SEND_AUTH_DATA = 'SEND_AUTH_DATA',
    LOGOUT = 'LOGOUT',
}

const login = createAction<any>(Type.LOGIN);
const sendAuthData = createAction<IUser>(Type.SEND_AUTH_DATA);
const loginRequest = createAction<IAuth>(Type.LOGIN_REQUEST);
const loginRequestSuccess = createAction<IAuth>(Type.LOGIN_REQUEST_SUCCESS);
const loginRequestFailed = createAction<IAuth>(Type.LOGIN_REQUEST_FAILED);
const logout = createAction<null>(Type.LOGOUT);

export const AuthActions = {
    Type,
    login,
    sendAuthData,
    loginRequestSuccess,
    loginRequest,
    loginRequestFailed,
    logout,
}

export type AuthActions = Omit<typeof AuthActions, 'Type'>;