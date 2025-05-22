import apiClient from "@/axios/axios";

export const registerVendor = async (vendorData) => {
  try {
    const response = await apiClient.post("/vendor/auth/register", vendorData);
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    localStorage.setItem("vendorData", JSON.stringify(response.data));
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const loginVendor = async (loginData) => {
  try {
    const response = await apiClient.post("/vendor/auth/login", loginData);
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    localStorage.setItem("vendorSession", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
