/* eslint-disable @typescript-eslint/no-namespace */
import {createAction} from 'redux-actions';
import {IUser} from '../../types';

enum Type {
    SET_USER = 'SET_USER',
    GET_USER = 'GET_USER',
    FETCHING_USER = "FETCHING_USER"
}

const setUser = createAction<IUser>(Type.SET_USER);
const getUser = createAction<IUser>(Type.GET_USER);
const fetchingUser = createAction<IUser>(Type.FETCHING_USER);

export const UserActions = {
    Type,
    setUser,
    getUser,
    fetchingUser
}

export type UserActions = Omit<typeof UserActions, 'Type'>;