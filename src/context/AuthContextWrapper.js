import { createContext, useState, useEffect } from "react";
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
  const removeUserData = () => localStorage.removeItem("userData");

  useEffect(() => {
    authenticateUser();
  }, []);

  async function authenticateUser() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUser(null);
        setIsLoggedIn(false);
        removeUserData();
        return;
      }

      const userData = await fetchUserData();
      setUser(userData);
      setIsLoggedIn(true);
      storeUserData(userData);
    } catch (error) {
      console.error("Authentication error:", error);
      setUser(null);
      setIsLoggedIn(false);
      removeUserData();
    } finally {
      setIsLoading(false);
    }
  }

  function disconnect() {
    removeToken();
    removeUserData();
    authenticateUser();
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
