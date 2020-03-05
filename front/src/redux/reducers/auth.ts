import {handleActions} from 'redux-actions';
import store from "../store";

const initialState = {
    isLogin: false
};

type actionType = {
    type: string
    payload: boolean
}

export const authReducer = (state = initialState, action: actionType) => {

    switch (action.type) {
        // case

        default:
            return store
    }
}


