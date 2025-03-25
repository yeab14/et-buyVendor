import apiClient from '@/axios/axios';

const fetchSubCategories = async (categoryId) => {
    if (!categoryId) {
        throw new Error("Category ID is required");
    }
    try {
        const response = await apiClient.get(`/subcategories/by-category/${categoryId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

export default fetchSubCategories;
