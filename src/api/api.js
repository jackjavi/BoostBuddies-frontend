import axios from "axios";

/**
 * Fetches system-wide logs from the backend.
 * @returns {Promise<Object[]>} An array of logs containing User and ActivityLog details.
 */
export const fetchSystemWideLogs = async (page, filters) => {
  try {
    const query = new URLSearchParams({ ...filters, page }).toString();
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/system-logs?${query}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching system-wide logs:", error);
    throw error;
  }
};

/**
 * Edits a user's profile.
 * @returns {Promise<Object>} The user's profile details.
 */
export const editProfile = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/members/profile-edit`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing profile:", error);
    throw error;
  }
};
