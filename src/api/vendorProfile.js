import apiClient from '@/axios/axios';

/**
 * Fetches vendor profile by ID
 * @param {string|number} vendorId - The unique identifier of the vendor
 * @returns {Promise<Object>} Vendor data
 * @throws {Error} If vendorId is missing or request fails
 */
const fetchVendorProfile = async (vendorId) => {
  if (!vendorId) {
    throw new Error('Vendor ID is required');
  }

  try {
    const { data } = await apiClient.get(`/vendors/list/${vendorId}`);
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unknown error occurred while fetching vendor data.';

    throw new Error(errMsg);
  }
};

export default fetchVendorProfile;
