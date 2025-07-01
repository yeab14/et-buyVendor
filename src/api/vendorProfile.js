import apiClient from '@/axios/axios';

/**
 * Fetches vendor profile by ID
 * @param {string|number} vendorId - The unique identifier of the vendor
 * @returns {Promise<Object>} Vendor data
 * @throws {Error} If vendorId is missing or request fails
 */
export const fetchVendorProfile = async (vendorId) => {
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


export const updateVendorProfile = async (vendorId, profileData, photoFile = null, bannerFile = null) => {
    if (!vendorId) {
      throw new Error('Vendor ID is required for profile update.');
    }
  
    const formData = new FormData();
  
    // Must match backend @RequestPart("profile")
    formData.append(
      'profile',
      new Blob([JSON.stringify(profileData)], { type: 'application/json' })
    );
  
    // Must match backend @RequestPart("photo")
    if (photoFile) formData.append('photo', photoFile);
  
    // Must match backend @RequestPart("banner")
    if (bannerFile) formData.append('banner', bannerFile);
  
    let token;
    try {
      const session = JSON.parse(localStorage.getItem('vendorSession'));
      token = session?.jwt;
      if (!token) throw new Error();
    } catch {
      throw new Error('Authorization token not found or invalid session.');
    }
  
    try {
      const { data } = await apiClient.put(
        `/vendor/profile/update?vendorId=${vendorId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        'Failed to update vendor profile.';
      throw new Error(errMsg);
    }
  };
  