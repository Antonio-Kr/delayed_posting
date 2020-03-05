import axios from 'axios';

const baseURL = process.env.BASE_URL;

const instance: any = axios.create({
    baseURL,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const UserApi = {
    getLoginInfo() {
    }
}