import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import axios from "axios";
import { Link } from "react-router-dom";
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

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassError, setForgotPassError] = useState("");
  const [resetPassError, setResetPassError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  function handleChange(event) {
    const { id, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,
        formData
      );
      if (response.status === 200) {
        storeToken(response.data.token);
        await authenticateUser();
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.error?.message || error.message);
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
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/forgot-password`,
        { email: forgotEmail }
      );
      setShowForgotModal(false);
      setResetData((prev) => ({ ...prev, email: forgotEmail }));
      if (response.status === 200) {
      }
      setShowResetModal(true);
    } catch (error) {
      setForgotPassError("Failed to send email. Check address and try again.");
      setTimeout(() => {
        setForgotPassError("");
        setForgotEmail("");
      }, 3000);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setForgotPassError("");
        setForgotEmail("");
      }, 3000);
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
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/reset-password`,
        { email, otp, newPassword }
      );
      setSuccessMessage("Password reset successful. You can now log in.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setShowResetModal(false);
    } catch (error) {
      setResetPassError("Reset failed. Check OTP and try again.");
    }
  }

  const { email, password } = formData;

  return (
    <main className="bg-indigo-50 p-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center h-screen w-full"
      >
        <div className="w-full">
          <label htmlFor="email">Email:</label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
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
          />
        </div>

        <p
          onClick={() => setShowForgotModal(true)}
          className="text-sm text-blue-600 cursor-pointer hover:underline -mt-2 mb-4 self-start"
        >
          Forgot password?
        </p>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="text-center">
            <p className="error text-[tomato]">{errorMessage}</p>
            <p>
              Don’t have an account?{" "}
              <Link to="/signup">
                <span className="underline text-indigo-600">Sign up</span>
              </Link>
            </p>
          </div>
        )}

        <button
          className={`w-full p-2 rounded font-bold transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-purple-500"
          }`}
          disabled={isLoading}
        >
          Login
        </button>
      </form>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-4"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            {forgotPassError && (
              <p className="error text-[tomato]">{forgotPassError}</p>
            )}
            {successMessage && (
              <p className="error text-indigo-600">{successMessage}</p>
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
                  onClick={() => setShowForgotModal(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </form>
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
            />
            {resetPassError && (
              <p className=" text-[tomato]">{resetPassError}</p>
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
                  onClick={() => setShowResetModal(false)}
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
