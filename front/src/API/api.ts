import axios from 'axios';

// const baseURL = 'http://localhost:3000';
const baseURL = 'https://jsonplaceholder.typicode.com/users/';

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
    name: string
    email: string
    password: string
}

export const UserApi = {
    getUser(id: number) {
        instance.get(`/${id}`)
            .then(response => response.data)
    },
    registerUser(userData: IUserData) {
        instance.post('', {
            ...userData
        })
            .then(({data}) => data)
            .then(console.log)
            .catch(console.log)
    },
    getLoginInfo() {
        instance.get('')
    }
}