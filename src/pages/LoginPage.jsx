import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { handleLogin, forgotPassword } from "../api/api2";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const {
    storeToken,
    authenticateUser,
    isLoading: authLoading,
    isLoggedIn,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassError, setForgotPassError] = useState("");
  const [resetPassError, setResetPassError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, authLoading, navigate, from]);

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <main className="bg-indigo-50 p-10 pt-24 h-screen flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  // Don't render login form if user is logged in
  if (isLoggedIn) {
    return null;
  }

  function handleChange(event) {
    const { id, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const { authToken } = await handleLogin(formData);
      if (!authToken) {
        setErrorMessage("Login failed. Please check your credentials.");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }
      storeToken(authToken);
      await authenticateUser();
      navigate(from, { replace: true });
    } catch (error) {
      console.log(`Login error:`, error.message);
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(event) {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!forgotEmail || !emailRegex.test(forgotEmail)) {
      setForgotPassError("Please enter a valid email address.");
      setTimeout(() => {
        setForgotPassError("");
        setForgotEmail("");
      }, 3000);
      return;
    }

    try {
      setIsLoading(true);
      setForgotPassError("");
      await forgotPassword(forgotEmail);
      setShowForgotModal(false);
      setResetData((prev) => ({ ...prev, email: forgotEmail }));
      setShowResetModal(true);
      setForgotEmail("");
    } catch (error) {
      setForgotPassError(error.message);
      console.error("Error sending OTP:", error);
      setTimeout(() => {
        setForgotPassError("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword() {
    const { email, otp, newPassword, confirmPassword } = resetData;
    if (!email || !otp || !newPassword || !confirmPassword) {
      setResetPassError("Missing required fields.");
      setTimeout(() => {
        setResetPassError("");
      }, 3000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetPassError("Passwords do not match.");
      setTimeout(() => {
        setResetPassError("");
      }, 3000);
      return;
    }
    try {
      setIsLoading(true);
      setResetPassError("");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/reset-password`,
        { email, otp, newPassword }
      );

      if (res.status === 200) {
        setSuccessMessage("Password reset successful. You can now log in.");
        setTimeout(() => {
          setSuccessMessage("");
          setShowResetModal(false);

          setResetData({
            email: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
          });
        }, 2000);
      }
    } catch (error) {
      setResetPassError(
        error.response?.data?.error?.message ||
          "Reset failed. Check OTP and try again."
      );
      setTimeout(() => {
        setResetPassError("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  const { email, password } = formData;

  return (
    <main className="bg-indigo-50 p-10 pt-24 h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center w-full"
      >
        <div className="w-full">
          <label htmlFor="email">Email:</label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password:</label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <p
          onClick={() => !isLoading && setShowForgotModal(true)}
          className={`text-sm text-blue-600 hover:underline -mt-2 mb-4 self-start ${
            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          Forgot password?
        </p>

        {errorMessage && (
          <p className="error text-[tomato] text-center">{errorMessage}</p>
        )}

        {!isLoading && (
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="underline text-indigo-600">Sign up</span>
              </Link>
            </p>
          </div>
        )}

        {isLoading && <Spinner />}

        <button
          type="submit"
          className={`w-full p-2 rounded font-lilita transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-purple-500"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-4"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              disabled={isLoading}
            />
            {forgotPassError && (
              <p className="error text-[tomato] mb-4">{forgotPassError}</p>
            )}
            {successMessage && (
              <p className="text-green-600 mb-4">{successMessage}</p>
            )}
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <button
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-blue-700"
                  onClick={handleForgotPassword}
                >
                  Send OTP
                </button>
                <button
                  className="mt-3 w-full bg-gray-300 hover:bg-gray-400 py-2 rounded"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotEmail("");
                    setForgotPassError("");
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 space-y-3">
            <h2 className="text-md text-indigo-800 font-bold">
              Reset Password
            </h2>
            <span className="text-xs text-indigo-500">
              A One Time Password (OTP) has been sent to your email. Expires
              after 15 minutes.
            </span>
            <input
              type="text"
              placeholder="OTP"
              className="w-full text-sm p-2 border rounded"
              value={resetData.otp}
              onChange={(e) =>
                setResetData((prev) => ({ ...prev, otp: e.target.value }))
              }
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full text-sm p-2 border rounded"
              value={resetData.newPassword}
              onChange={(e) =>
                setResetData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full text-sm p-2 border rounded"
              value={resetData.confirmPassword}
              onChange={(e) =>
                setResetData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              disabled={isLoading}
            />
            {resetPassError && (
              <p className="text-[tomato]">{resetPassError}</p>
            )}
            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <button
                  className="w-full text-md bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
                <button
                  className="mt-3 w-full text-md bg-gray-300 hover:bg-gray-400 py-2 rounded"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetData({
                      email: "",
                      otp: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setResetPassError("");
                    setSuccessMessage("");
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default LoginPage;
