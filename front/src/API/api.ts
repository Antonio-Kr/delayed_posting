import axios from 'axios';
import {IUser} from "../types";

// const baseURL = 'http://localhost:3000';
const baseURL = 'https://jsonplaceholder.typicode.com/users/1';

const instance = axios.create({
    baseURL,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

interface IUserData {
    name?: string
    email: string
    password: string
}

export const UserApi = {
    getUserData(): any {
        instance.get('')
            .then((response: any) => response.data)
    },
    registerUser(userData: IUser) {
        instance.post('', {
            ...userData
        })
            .then(({data}) => data)
            .then(console.log)
    }
}