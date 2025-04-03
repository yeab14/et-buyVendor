import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';


const apiClient = axios.create({
  baseURL: `${process.env.API_BASE_URL}/api`,  
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,  
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  
    }
    return config;
  },
  (error) => Promise.reject(error) 
);


apiClient.interceptors.response.use(
  (response) => response,  
  (error) => {
    if (error.response && error.response.status === 401) {
      
    }
    return Promise.reject(error);  
  }
);

export default apiClient;
