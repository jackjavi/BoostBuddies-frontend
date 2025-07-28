import { createContext, useState, useEffect } from "react";
import { fetchUserData, apiChangePassword } from "../api/api2";

export const AuthContext = createContext();

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token) => localStorage.setItem("authToken", token);
  const removeToken = () => localStorage.removeItem("authToken");

  useEffect(() => {
    authenticateUser();
  }, []);

  async function authenticateUser() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }

      const userData = await fetchUserData();
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function disconnect() {
    removeToken();
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
