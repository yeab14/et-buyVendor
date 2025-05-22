import apiClient from "@/axios/axios";

export const createProduct = async (formData) => {
  try {
    // Get the vendorSession from localStorage and extract the JWT
    const vendorSession = localStorage.getItem("vendorSession");
    const sessionData = vendorSession ? JSON.parse(vendorSession) : null;
    const token = sessionData?.jwt;

    if (!token) {
      throw new Error("Authentication required. Please log in.");
    }

    const response = await apiClient.post("/products", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
