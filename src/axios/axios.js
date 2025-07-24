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
    const vendorSession = localStorage.getItem("vendorSession");
    if (vendorSession) {
      const sessionData = JSON.parse(vendorSession);
      if (sessionData && sessionData.jwt) {
        config.headers.Authorization = `Bearer ${sessionData.jwt}`;  
      }
    }
    return config;
  },
  (error) => Promise.reject(error) 
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access:', error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
