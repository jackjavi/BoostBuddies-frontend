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
    console.error(
      "Error fetching system-wide logs:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
  }
};

export const editProfile = async (data) => {
  try {
    const response = await api.put("/api/v1/members/profile-edit", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing profile:", error.response.data.error.message);
    throw error.response.data.error.message;
  }
};

export const fetchUsersWithPaymentStatus = async () => {
  try {
    const response = await api.get("/api/v1/admin/users-with-payment-status");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users with payment status:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
  }
};

export const confirmPackagePayment = async (userId, packageId) => {
  try {
    const response = await api.post("/api/v1/purchase", { userId, packageId });
    return response.data;
  } catch (error) {
    console.error(
      "Error confirming payment:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
  }
};

export const fetchUserPaymentSummary = async (userId) => {
  try {
    const response = await api.get(`/api/v1/users/${userId}/payment-summary`);
    return response?.data;
  } catch (error) {
    console.error(
      `Error fetching payment summary for user ${userId}:`,
      error.response.data.error.message
    );
    throw error.response.data.error.message;
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
    console.error(
      "Error fetching products:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
  }
};

export const fetchProductCategories = async () => {
  try {
    const response = await api.get("/api/v1/products/categories");
    return response.data.categories;
  } catch (error) {
    console.error(
      "Error fetching product categories:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
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
    console.error(
      "Error tracking product view:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
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
    console.error("Fetch error:", error.response.data.error.message);
    return [];
  }
}

export const fetchUserData = async () => {
  try {
    const response = await api.get("/api/v1/users/verify-token");
    return response.data.user;
  } catch (error) {
    console.error(
      "Error verifying user token:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
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
    console.error(
      "Error changing password:",
      error.response.data.error.message
    );
    throw new error.response.data.error.message();
  }
};

export const submitPackagePayment = async (data) => {
  try {
    const response = await api.post(
      "/api/v1/payments/submit-package-payment",
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting package payment:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
  }
};

export const getPaymentForVerification = async (paymentId) => {
  try {
    const response = await api.get(
      `/api/v1/payments/verification/${paymentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching payment details:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
  }
};

export const verifyPayment = async (paymentId, data) => {
  try {
    const response = await api.put(
      `/api/v1/payments/verify/${paymentId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error verifying payment:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
  }
};

export const getPendingPayments = async (limit = 50, offset = 0) => {
  try {
    const params = new URLSearchParams({ limit, offset }).toString();
    const response = await api.get(`/api/v1/payments/pending?${params}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching pending payments:",
      error.response.data.error.message
    );
    throw error.response.data.error.message;
  }
};

export default api;
