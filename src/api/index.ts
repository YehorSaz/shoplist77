import axios, { AxiosInstance } from 'axios';
import {baseURL, urls} from "../constants/urls";


const api: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
});


export default api;
