import apiClient from '@/axios/axios';

const fetchCategories = async (params = {}) => {
    try {
        const response = await apiClient.get("/categories", { params });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

export default fetchCategories;
