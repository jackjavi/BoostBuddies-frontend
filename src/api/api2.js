import axios from "axios";

// Reusable API instance with base URL and token injection
const api = axios.create({
  baseURL:
    localStorage.getItem("REACT_APP_BACKEND_URL") ||
    process.env.REACT_APP_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetches system-wide logs
export const fetchSystemWideLogs = async (page, filters) => {
  try {
    const query = new URLSearchParams({ ...filters, page }).toString();
    const response = await api.get(`/api/v1/system-logs?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching system-wide logs:", error);
    throw error;
  }
};

// Edits a user's profile
export const editProfile = async (data) => {
  try {
    const response = await api.put("/api/v1/members/profile-edit", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing profile:", error);
    throw error;
  }
};

// Fetch users with their payment status (admin)
export const fetchUsersWithPaymentStatus = async () => {
  try {
    const response = await api.get("/api/v1/admin/users-with-payment-status");
    return response.data;
  } catch (error) {
    console.error("Error fetching users with payment status:", error);
    throw error;
  }
};

// Confirm package payment manually
export const confirmPackagePayment = async (userId, packageId) => {
  try {
    const response = await api.post("/api/v1/purchase", { packageId });
    return response.data;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

export default api;
