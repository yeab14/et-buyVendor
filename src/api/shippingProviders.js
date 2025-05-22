import apiClient from '@/axios/axios';
const fetchShippingProviders = async (params = {}) => {
    try {
        const response = await apiClient.get("/shipping-providers", { params });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data; 
        } else {
            throw error; 
        }
    }
};
export default fetchShippingProviders;