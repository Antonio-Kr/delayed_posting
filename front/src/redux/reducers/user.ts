import {handleActions} from 'redux-actions';
import {IState} from '../../types';
import {UserActions} from '../actions';
import {IUser} from "../../types/user";

const initialState: IState = {
    isFetching: false,
    user: null as IUser | null
};


// fake  initial state

// const initialState = {
// email: 'string',
//     status: 'string',
//     avatar: 'string',
//     lastName: 'string',
//     firstName: 'string',
//     gender: 'string',
//     address: {
//         country: 'string',
//         city: 'string',
//         addressLine1: 'string',
//         addressLine2: 'string',
//     },
//     profession: 'string',
//     phone: 'string',
//     roles: ['1', '2', '3'],
//
// }

export const UserReducer = handleActions({
    [UserActions.Type.FETCHING_USER]: (state, action) => ({
        ...action.payload

    }), // fetching to/from server
    [UserActions.Type.SET_USER]: (state, action) => ({
        ...action.payload,
    }), // set user into state

}, initialState);



