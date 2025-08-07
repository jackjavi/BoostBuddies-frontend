import { createContext, useState, useEffect, useCallback } from "react";
import { fetchUserData, apiChangePassword } from "../api/api2";

export const AuthContext = createContext();

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const storeToken = (token) => localStorage.setItem("authToken", token);
  const removeToken = () => localStorage.removeItem("authToken");
  const storeUserData = (userData) =>
    localStorage.setItem("userData", JSON.stringify(userData));
  const removeUserData = () => localStorage.removeItem("userData");

  const checkAdminStatus = (userData) => {
    return userData?.role === "admin";
  };

  // Helper function to check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      // Decode JWT without verification to check expiration
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      return payload.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Treat malformed tokens as expired
    }
  };

  // Clear all authentication data
  const clearAuthData = useCallback(() => {
    removeToken();
    removeUserData();
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, []);

  const authenticateUser = useCallback(async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("authToken");

      // First check: Does token exist?
      if (!token) {
        setIsLoading(false);
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      // Second check: Is token expired (client-side check)?
      if (isTokenExpired(token)) {
        console.log("Token expired, clearing auth data");
        clearAuthData();
        setIsLoading(false);
        return;
      }

      // Third check: Verify token with backend and get fresh user data
      try {
        const freshUserData = await fetchUserData();

        if (freshUserData) {
          // Token is valid, update everything
          setUser(freshUserData);
          setIsAdmin(checkAdminStatus(freshUserData));
          storeUserData(freshUserData);
          setIsLoggedIn(true);
        } else {
          throw new Error("No user data received");
        }
      } catch (fetchError) {
        console.error("Token verification failed:", fetchError);

        // If backend says token is invalid (401) or any other auth error
        if (
          fetchError.response?.status === 401 ||
          fetchError.response?.status === 403
        ) {
          clearAuthData();
        } else {
          // For network errors, you might want to use cached data temporarily
          // but this is risky - consider your security requirements
          const cachedUserData = localStorage.getItem("userData");
          if (cachedUserData) {
            try {
              const userData = JSON.parse(cachedUserData);
              setUser(userData);
              setIsLoggedIn(true);
              setIsAdmin(checkAdminStatus(userData));
              console.warn("Using cached user data due to network error");
            } catch (parseError) {
              console.error("Error parsing cached user data:", parseError);
              clearAuthData();
            }
          } else {
            clearAuthData();
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error during authentication:", error);
      clearAuthData();
      setIsLoading(false);
    }
  }, [clearAuthData]);

  // Auto-refresh token before it expires (optional enhancement)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || isTokenExpired(token)) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;

      // Refresh 5 minutes before expiration
      const refreshTime = timeUntilExpiry - 5 * 60 * 1000;

      if (refreshTime > 0) {
        const refreshTimer = setTimeout(() => {
          authenticateUser(); // Re-authenticate to refresh token
        }, refreshTime);

        return () => clearTimeout(refreshTimer);
      }
    } catch (error) {
      console.error("Error setting up token refresh:", error);
    }
  }, [authenticateUser, isLoggedIn]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  function disconnect() {
    clearAuthData();
    setIsLoading(false);
  }

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const result = await apiChangePassword(oldPassword, newPassword);
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const contextValues = {
    user,
    storeToken,
    removeToken,
    storeUserData,
    removeUserData,
    authenticateUser,
    isLoading,
    isLoggedIn,
    isAdmin,
    disconnect,
    changePassword,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
