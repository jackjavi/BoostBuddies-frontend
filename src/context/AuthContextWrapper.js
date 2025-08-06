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

  const authenticateUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoading(false);
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      setIsLoading(true);

      // Try to get cached user data first for faster initial load
      const cachedUserData = localStorage.getItem("userData");
      if (cachedUserData) {
        try {
          const userData = JSON.parse(cachedUserData);
          setUser(userData);
          setIsLoggedIn(true);
          setIsAdmin(checkAdminStatus(userData));
        } catch (error) {
          console.error("Error parsing cached user data:", error);
          removeUserData();
        }
      }

      // Always try to fetch fresh user data
      try {
        const freshUserData = await fetchUserData();
        if (freshUserData) {
          setUser(freshUserData);
          setIsAdmin(checkAdminStatus(freshUserData));
          storeUserData(freshUserData);
          setIsLoggedIn(true);
        } else {
          throw new Error("No user data received");
        }
      } catch (fetchError) {
        console.error("Error fetching fresh user data:", fetchError);

        // If we have cached data and fetch fails, continue with cached data
        if (!cachedUserData) {
          throw fetchError;
        }
        // Otherwise, we already set the cached data above
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error during authentication:", error);

      // Clear everything on authentication error
      removeToken();
      removeUserData();
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  function disconnect() {
    removeToken();
    removeUserData();
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
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
