import apiClient from '@/axios/axios';
const fetchAttributeDefinitionsBySubCategory = async (subCategoryId) => {
    try {
        const response = await apiClient.get(`/attribute-definitions/subcategory/${subCategoryId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data; 
        } else {
            throw error; 
        }
    }
};
export default fetchAttributeDefinitionsBySubCategory;