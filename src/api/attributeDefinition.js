import publicApi from '@/axios/publicApi';

const fetchAttributeDefinitionsBySubCategory = async (subCategoryId) => {
    try {
        const response = await publicApi.get(`/attribute-definitions/subcategory/${subCategoryId}`);
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