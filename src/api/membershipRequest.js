import apiClient from '@/axios/axios';

/**
 * Fetches the list of membership requests submitted to the current vendor.
 * @returns {Promise<Array>} List of membership request DTOs
 */
export const fetchMembershipRequests = async () => {
  try {
    const { data } = await apiClient.get('/vendor/membership-requests/vendor');
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unknown error occurred while fetching membership requests.';
    throw new Error(errMsg);
  }
};

/**
 * Approves a membership request by ID.
 * @param {number|string} requestId - The ID of the membership request to approve
 * @returns {Promise<string>} Success message
 */
export const approveMembershipRequest = async (requestId) => {
  try {
    const { data } = await apiClient.post(`/vendor/membership-requests/${requestId}/approve`);
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unknown error occurred while approving the membership request.';
    throw new Error(errMsg);
  }
};

/**
 * Rejects a membership request by ID.
 * @param {number|string} requestId - The ID of the membership request to reject
 * @returns {Promise<string>} Success message
 */
export const rejectMembershipRequest = async (requestId) => {
  try {
    const { data } = await apiClient.post(`/vendor/membership-requests/${requestId}/reject`);
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unknown error occurred while rejecting the membership request.';
    throw new Error(errMsg);
  }
};

