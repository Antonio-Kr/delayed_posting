import {handleActions} from "redux-actions";
import {AuthActions} from "../actions";
import {IAuth} from "../../types";

const initialState: IAuth = {
    isLoginFetching: false,
    token: null,
    loginError: false
};

// type actionType;
export const authReducer = handleActions({
    // fetching to/from server

    [AuthActions.Type.LOGIN_REQUEST]: (state, action) => ({
        ...state,
        isLoginFetching: action.payload.isLoginFetching
    }),

    [AuthActions.Type.LOGIN_REQUEST_SUCCESS]: (state, action) => ({
        ...state,
        token: action.payload.token
    }),

    [AuthActions.Type.LOGIN_REQUEST_FAILED]: (state, action) => ({
        ...state,
        loginError: action.payload.loginError,
        isLoginFetching: false
    }),

    [AuthActions.Type.LOGOUT]: (state) => ({
        ...state,
        token: null
    }),

}, initialState);