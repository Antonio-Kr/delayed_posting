import {handleActions} from 'redux-actions';
import {IUser} from '../../types';
import {UserActions} from '../actions';

const initialState = null;


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

export const UserReducer = handleActions<IUser | null, IUser>({
    [UserActions.Type.SET_USER]: (state, action) => ({
        state,
        ...action.payload
    }), // registration?

}, initialState);



