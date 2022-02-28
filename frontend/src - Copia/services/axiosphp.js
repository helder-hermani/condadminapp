import axios from 'axios';

export const axiosApi = axios.create ({
    // baseURL : "http://syscoderweb.com/phpapi/"
    baseURL : "http://localhost:80/phpapi/"
})

