import apiClient from '@/axios/axios';
const fetchAttributeValuesByDefinitionId = async (definitionId) => {
    try {
        const response = await apiClient.get(`/attribute-values/definition/${definitionId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data; 
        } else {
            throw error; 
        }
    }
};
export default fetchAttributeValuesByDefinitionId;