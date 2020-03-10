import {createAction} from "redux-actions";
import {IAuth, IUser} from "../../types";

enum Type {
    GET_AUTH = 'GET_AUTH',
    SEND_AUTH_DATA = 'SEND_AUTH_DATA',
    AUTHENTICATION_IN_PROGRESS = 'AUTHENTICATION_IN_PROGRESS'
}

const sendAuthData = createAction<IUser>(Type.SEND_AUTH_DATA);
const getAuth = createAction<IAuth>(Type.GET_AUTH);
const authenticationInProgress = createAction<IAuth>(Type.AUTHENTICATION_IN_PROGRESS);

export const AuthActions = {
    Type,
    sendAuthData,
    getAuth,
    authenticationInProgress
}

export type AuthActions = Omit<typeof AuthActions, 'Type'>;