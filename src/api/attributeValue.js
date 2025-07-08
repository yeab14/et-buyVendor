import publicApi from '@/axios/publicApi';
const fetchAttributeValuesByDefinitionId = async (definitionId) => {
    try {
        const response = await publicApi.get(`/attribute-values/definition/${definitionId}`);
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