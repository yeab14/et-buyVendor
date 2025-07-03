import apiClient from '@/axios/axios';

/**
 * Fetches the list of users who have chatted with the current vendor.
 * @returns {Promise<Array>} List of user chat summaries
 */
export const fetchUserChatSummaries = async () => {
  try {
    const { data } = await apiClient.get('/vendor/chat/user-list');
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unknown error occurred while fetching user chat summaries.';
    throw new Error(errMsg);
  }
};

/**
 * Fetches chat history between the vendor and a specific user.
 * @param {number|string} userId - ID of the user to fetch chat history with
 * @returns {Promise<Array>} Chat messages
 */
export const fetchChatHistoryWithUser = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required to fetch chat history.');
  }

  try {
    const { data } = await apiClient.get(`/vendor/chat/history/user/${userId}`);
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unknown error occurred while fetching chat history.';
    throw new Error(errMsg);
  }
};

/**
 * Sends a reply message from vendor to a specific user.
 * @param {number|string} userId - ID of the recipient user
 * @param {string} content - Message content
 * @returns {Promise<string>} Success message from backend
 */
export const replyToUserChat = async (userId, content) => {
  if (!userId || !content) {
    throw new Error('User ID and content are required to send a reply.');
  }

  try {
    const { data } = await apiClient.post(`/vendor/chat/reply/${userId}`, { content });
    return data; // "reply sent"
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unknown error occurred while sending the reply.';
    throw new Error(errMsg);
  }
};

/**
 * Marks all messages from a specific user as seen by the vendor.
 * @param {number|string} userId - ID of the user whose messages will be marked as seen
 * @returns {Promise<string>} Confirmation message
 */
export const markUserMessagesAsSeen = async (userId) => {
    if (!userId) {
      throw new Error('User ID is required to mark messages as seen.');
    }
  
    try {
      const { data } = await apiClient.post(`/vendor/chat/mark-as-seen/${userId}`);
      return data;
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        'An unknown error occurred while marking messages as seen.';
      throw new Error(errMsg);
    }
  };
  
/**
 * Fetches unread message count per user.
 * @returns {Promise<Object>} A map of userId to unread count, e.g. { "1": 2, "3": 5 }
 */
export const getUnreadMessageCountMap = async () => {
  try {
    const { data } = await apiClient.get('/vendor/chat/unread-count');
    return data; // e.g., { "1": 1 }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'Failed to fetch unread message counts.';
    throw new Error(errMsg);
  }
};
