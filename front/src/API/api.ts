import axios from 'axios';
import {IUser} from "../types";

// const baseURL = 'http://localhost:3000';
const baseURL = 'http://5dffcf1a1fb99500141402ad.mockapi.io';

export const instance = axios.create({
    baseURL,
    responseType: 'json',
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

interface IUserData {
    name?: string
    email: string
    password: string
}

export const UserApi = {

}
