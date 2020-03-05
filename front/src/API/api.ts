import axios from 'axios';

const baseURL = 'http://localhost:3000';

const instance = axios.create({
    baseURL,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

export const UserApi = {
    getAuthTag() {
        instance.get('')
    },
    getLoginInfo() {
        instance.get('')
    }
}