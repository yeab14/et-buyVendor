import apiClient from "@/axios/axios";

async function createProduct(formData) {
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
}

async function getProductsByVendor(vendorId) {
  try {
    // Get the vendorSession from localStorage and extract the JWT
    const vendorSession = localStorage.getItem("vendorSession");
    const sessionData = vendorSession ? JSON.parse(vendorSession) : null;
    const token = sessionData?.jwt;

    if (!token) {
      throw new Error("Authentication required. Please log in.");
    }

    const response = await apiClient.get(`/products/vendor/${vendorId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Log the response for debugging
    console.log('Products fetched successfully:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error.response ? error.response.data : error;
  }
}

export { createProduct, getProductsByVendor };
