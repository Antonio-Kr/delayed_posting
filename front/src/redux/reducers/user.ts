import {handleActions} from 'redux-actions';
import {IState} from '../../types';
import {UserActions} from '../actions';

const initialState: IState = {
    isFetching: false,
    user: null
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
        ...state,
        isFetching: action.payload.isFetching

    }),
    [UserActions.Type.SET_USER]: (state, action) => ({
        ...state,
        user: action.payload.user
    }), // registration?

}, initialState);



