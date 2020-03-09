import {handleActions} from "redux-actions";
import {AuthActions} from "../actions";

const initialState = {
    isLogin: false,
    inRegisterProcess: false
};

// type actionType;
export const authReducer = handleActions({
        [AuthActions.Type.GET_AUTH]: (state, action) => ({
            ...action.payload
        }), // fetching to/from server

        [AuthActions.Type.SEND_AUTH_DATA]: (state, action) => ({
            ...action.payload,
        }), // set user into state

        [AuthActions.Type.AUTHENTICATION_IN_PROGRESS]: (state, action) => ({
            ...state,
            inRegisterProcess: action.payload.inRegisterProcess
        }),

    }, initialState
    )
;