import { createContext, useState, useEffect, useCallback } from "react";
import { fetchUserData, apiChangePassword } from "../api/api2";

export const AuthContext = createContext();

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token) => localStorage.setItem("authToken", token);
  const removeToken = () => localStorage.removeItem("authToken");
  const storeUserData = (userData) =>
    localStorage.setItem("userData", JSON.stringify(userData));
  const removeUserData = () => JSON.parse(localStorage.removeItem("userData"));

  const authenticateUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }

      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        throw new Error("User data not found");
      }

      await fetchUserData();
      setUser(userData);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during authentication:", error);
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
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
