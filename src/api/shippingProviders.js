import publicApi from '@/axios/publicApi';

const fetchShippingProviders = async (params = {}) => {
    try {
        const response = await publicApi.get("/shipping-providers", { params });
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