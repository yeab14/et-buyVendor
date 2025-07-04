import apiClient from '@/axios/axios';

/**
 * Fetches a paginated list of membership requests for the current vendor,
 * with optional search, status filter, sorting, and pagination.
 *
 * @param {Object} params - Query parameters
 * @param {string} [params.searchTerm] - Text to search in user name, email, or message
 * @param {string} [params.status] - Request status filter ('PENDING', 'APPROVED', 'REJECTED')
 * @param {string} [params.sortBy] - Sort key: 'dateAsc', 'dateDesc', 'nameAsc', 'nameDesc'
 * @param {number} [params.page] - Zero-based page index
 * @param {number} [params.size] - Page size
 * @returns {Promise<Object>} Paginated membership requests response from backend
 */
export const fetchMembershipRequests = async ({
    searchTerm = '',
    status = '',
    sortBy = 'dateDesc',
    page = 0,
    size = 10,
  } = {}) => {
    try {
      const { data } = await apiClient.get('/vendor/membership-requests/search', {
        params: {
          searchTerm: searchTerm.trim() || undefined,
          status: status || undefined,
          sortBy,
          page,
          size,
        },
      });
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

