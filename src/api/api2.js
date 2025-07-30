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

export const handleLogin = async (formData) => {
  try {
    const response = await api.post(`/api/v1/users/login`, formData);
    return { authToken: response.data.token, loggedInUser: response.data.user };
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("Login error:", error.response.data.error.message);
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Login error:", error.message);
      throw new Error(error.message || "Login failed. Please try again.");
    }
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post(`/api/v1/users/forgot-password`, { email });
    if (response.status !== 200) {
      throw new Error("Failed to send OTP. Please check your email.");
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Forgot password error:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Forgot password error:", error.message);
      throw new Error(error.message || "Failed to send OTP. Please try again.");
    }
  }
};

export const fetchSystemWideLogs = async (page, filters) => {
  try {
    const query = new URLSearchParams({ ...filters, page }).toString();
    const response = await api.get(`/api/v1/system-logs?${query}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error fetching system-wide logs:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Error fetching system-wide logs:", error.message);
      throw new Error(
        error.message || "Failed to fetch logs. Please try again."
      );
    }
  }
};

export const editProfile = async (data) => {
  try {
    const response = await api.put("/api/v1/members/profile-edit", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error editing profile:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Error editing profile:", error.message);
      throw new Error(
        error.message || "Failed to edit profile. Please try again."
      );
    }
  }
};

export const fetchUsersWithPaymentStatus = async () => {
  try {
    const response = await api.get("/api/v1/admin/users-with-payment-status");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error fetching users with payment status:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Error fetching users with payment status:", error.message);
      throw new Error(
        error.message || "Failed to fetch users. Please try again."
      );
    }
  }
};

export const confirmPackagePayment = async (userId, packageId) => {
  try {
    const response = await api.post("/api/v1/purchase", { userId, packageId });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error confirming payment:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Error confirming payment:", error.message);
      throw new Error(
        error.message || "Failed to confirm payment. Please try again."
      );
    }
  }
};

export const fetchUserPaymentSummary = async (userId) => {
  try {
    const response = await api.get(`/api/v1/users/${userId}/payment-summary`);
    return response?.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        `Error fetching payment summary for user ${userId}:`,
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error(
        `Error fetching payment summary for user ${userId}:`,
        error.message
      );
      throw new Error(
        error.message || "Failed to fetch payment summary. Please try again."
      );
    }
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
    if (error.response && error.response.data) {
      console.error(
        "Error fetching products:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Error fetching products:", error.message);
      throw new Error(
        error.message || "Failed to fetch products. Please try again."
      );
    }
  }
};

export const fetchProductCategories = async () => {
  try {
    const response = await api.get("/api/v1/products/categories");
    return response.data.categories;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error fetching product categories:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Error fetching product categories:", error.message);
      throw new Error(
        error.message || "Failed to fetch product categories. Please try again."
      );
    }
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
    if (error.response && error.response.data) {
      console.error(
        "Error tracking product view:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message);
    } else {
      console.error("Error tracking product view:", error.message);
      throw new Error(
        error.message || "Failed to track product view. Please try again."
      );
    }
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
    if (!clean || clean.length === 0) {
      return [];
    }

    return clean;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Fetch error:",
        error.response.data.error.message || error.message
      );
      throw new Error(error.response.data.error.message || error.message);
    } else {
      console.error("Fetch error:", error.message);
      throw new Error(
        error.message || "Failed to fetch user interactions. Please try again."
      );
    }
  }
}

export const fetchUserData = async () => {
  try {
    const response = await api.get("/api/v1/users/verify-token");
    return response.data.user;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error verifying user token:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message || error.message);
    } else {
      console.error("Error verifying user token:", error.message);
      throw new Error(
        error.message || "Failed to verify user token. Please try again."
      );
    }
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
    if (error.response && error.response.data) {
      console.error(
        "Error changing password:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message || error.message);
    } else {
      console.error("Error changing password:", error.message);
      throw new Error(
        error.message || "Failed to change password. Please try again."
      );
    }
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
    if (error.response && error.response.data) {
      console.error(
        "Error submitting package payment:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message || error.message);
    } else {
      console.error("Error submitting package payment:", error.message);
      throw new Error(
        error.message || "Failed to submit package payment. Please try again."
      );
    }
  }
};

export const getPaymentForVerification = async (paymentId) => {
  try {
    const response = await api.get(
      `/api/v1/payments/verification/${paymentId}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error fetching payment details:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message || error.message);
    } else {
      console.error("Error fetching payment details:", error.message);
      throw new Error(
        error.message || "Failed to fetch payment details. Please try again."
      );
    }
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
    if (error.response && error.response.data) {
      console.error(
        "Error verifying payment:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message || error.message);
    } else {
      console.error("Error verifying payment:", error.message);
      throw new Error(
        error.message || "Failed to verify payment. Please try again."
      );
    }
  }
};

export const getPendingPayments = async (limit = 50, offset = 0) => {
  try {
    const params = new URLSearchParams({ limit, offset }).toString();
    const response = await api.get(`/api/v1/payments/pending?${params}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error fetching pending payments:",
        error.response.data.error.message
      );
      throw new Error(error.response.data.error.message || error.message);
    } else {
      console.error("Error fetching pending payments:", error.message);
      throw new Error(
        error.message || "Failed to fetch pending payments. Please try again."
      );
    }
  }
};

export default api;
