import apiClient from "src/axios/axios";

export const registerVendor = async (vendorData) => {
  try {
    const response = await apiClient.post("/auth/register", vendorData);
    
 
    localStorage.setItem("vendorData", JSON.stringify(response.data));
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
