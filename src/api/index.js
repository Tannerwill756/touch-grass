import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const BASE_URL = process.env.REACT_APP_ENVIRONMENT === "dev" ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers:{'Content-Type': 'application/json'},
    withCredentials: true
})


