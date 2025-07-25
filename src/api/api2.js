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
    const response = await api.post("/api/v1/purchase", { userId, packageId });
    return response.data;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

// Fetch user's payment summary
export const fetchUserPaymentSummary = async (userId) => {
  try {
    const response = await api.get(`/api/v1/users/${userId}/payment-summary`);
    return response?.data;
  } catch (error) {
    console.error(`Error fetching payment summary for user ${userId}:`, error);
    throw error;
  }
};

// Fetch paginated and filtered products
export const fetchProducts = async ({
  page = 1,
  limit = 10,
  category = "",
}) => {
  try {
    const params = new URLSearchParams({ page, limit });
    if (category && category !== "all") {
      params.append("category", category);
    }

    const response = await api.get(`/api/v1/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch dynamic product categories
export const fetchProductCategories = async () => {
  try {
    const response = await api.get("/api/v1/products/categories");
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};

// Track a product view (POST with productId in body)
export const trackProductView = async (productId) => {
  try {
    const response = await api.post("/api/v1/products/view", { productId });
    return response.data;
  } catch (error) {
    console.error("Error tracking product view:", error);
    throw error;
  }
};

// Increment click count
export const trackProductClick = (productId) => {
  window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/click/${productId}`;
};

export default api;
