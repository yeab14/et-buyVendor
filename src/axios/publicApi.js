
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const publicApi = axios.create({
  baseURL: `${process.env.API_BASE_URL}/api` || 'http://localhost:8080',
  timeout: 10000,
});


export default publicApi