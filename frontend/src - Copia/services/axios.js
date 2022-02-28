import axios from 'axios';

const axiosApi = axios.create ({
    baseURL : "http://localhost:21105/"
})

export default axiosApi;