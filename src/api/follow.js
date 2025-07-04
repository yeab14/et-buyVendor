import apiClient from '@/axios/axios';

/**
 * Fetches the list of followers for the current vendor.
 * @returns {Promise<Array>} List of follower user objects
 */
export const fetchFollowers = async () => {
  try {
    const { data } = await apiClient.get('/vendor/follow/followers');
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unknown error occurred while fetching followers.';
    throw new Error(errMsg);
  }
};



/**
 * Searches followers for the current vendor using a query string.
 *
 * @param {string} query - The search keyword (name, email, or phone).
 * @returns {Promise<Array>} Filtered list of follower user objects.
 */
export const searchFollowers = async (query) => {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty.');
    }
  
    try {
      const { data } = await apiClient.get('/vendor/follow/followers/search', {
        params: { q: query }
      });
      return data;
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        'An error occurred while searching followers.';
      throw new Error(errMsg);
    }
  };