import axios from 'axios';
import dotenv from 'dotenv'


dotenv.config();

const BASE_URL = 'http://localhost:9090';


export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers:{'Content-Type': 'application/json'},
    withCredentials: true
})


