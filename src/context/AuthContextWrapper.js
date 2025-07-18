import { createContext, useState, useEffect } from "react";
import axios from "axios";

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
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/verify-token`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`User authenticated:`, response.data.user);
      setUser(response.data.user);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);

      console.log(error);
    }
  }
  function disconnect() {
    removeToken();
    authenticateUser();
  }

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("User not authenticated");

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/change-password`,
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully!");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.error || "Failed to change password");
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
