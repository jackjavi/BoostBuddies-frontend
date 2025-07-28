import axios from "axios";

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

export const fetchUsersWithPaymentStatus = async () => {
  try {
    const response = await api.get("/api/v1/admin/users-with-payment-status");
    return response.data;
  } catch (error) {
    console.error("Error fetching users with payment status:", error);
    throw error;
  }
};

export const confirmPackagePayment = async (userId, packageId) => {
  try {
    const response = await api.post("/api/v1/purchase", { userId, packageId });
    return response.data;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

export const fetchUserPaymentSummary = async (userId) => {
  try {
    const response = await api.get(`/api/v1/users/${userId}/payment-summary`);
    return response?.data;
  } catch (error) {
    console.error(`Error fetching payment summary for user ${userId}:`, error);
    throw error;
  }
};

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

export const fetchProductCategories = async () => {
  try {
    const response = await api.get("/api/v1/products/categories");
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};

export const trackProductView = async (productId, userId) => {
  try {
    const response = await api.post("/api/v1/products/view", {
      productId,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error tracking product view:", error);
    throw error;
  }
};

export const trackProductClick = (productId, userId) => {
  window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/click/${productId}?userId=${userId}`;
};

export async function fetchUserInteractions(userId) {
  try {
    const response = await api.get(`/api/v1/users/${userId}/interactions`);
    const clean = response?.data?.interactions.map((item) => ({
      ...item,
      type: item.type === "click" ? "view" : item.type,
    }));

    return clean;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export const fetchUserData = async () => {
  try {
    const response = await api.get("/api/v1/users/verify-token");
    return response.data.user;
  } catch (error) {
    console.error("Error verifying user token:", error);
    throw error;
  }
};

export const apiChangePassword = async (oldPassword, newPassword) => {
  try {
    const response = await api.put("/api/v1/users/change-password", {
      oldPassword,
      newPassword,
    });

    if (response.status === 200) {
      return { success: true, message: "Password changed successfully!" };
    }
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error(error.response?.data?.error || "Failed to change password");
  }
};

export default api;
