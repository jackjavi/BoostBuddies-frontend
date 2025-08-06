import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import BoostBuddiesLogo from "../components/BoostBuddiesLogo";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  TrendingUp,
  Users,
  Gift,
  Coins,
  Award,
} from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { storeToken, storeUserData, authenticateUser } =
    useContext(AuthContext);
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
        storeUserData(response.data.user);
        await authenticateUser();
        navigate(from, { replace: true });
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
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/reset-password`,
        { email, otp, newPassword }
      );

      if (res.status === 200) {
        alert("Password reset successful. You can now log in.");
        setSuccessMessage("Password reset successful. You can now log in.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
      setShowResetModal(false);
    } catch (error) {
      setTimeout(() => {
        setSuccessMessage("Reset failed. Check OTP and try again.");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  const { email, password } = formData;

  return (
    <main className="min-h-screen  flex items-center justify-center pt-24 md:py-28 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-15 animate-bounce"></div>
      </div>

      {/* Left Side - Illustration & Branding (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-white/20 rounded-full blur-lg"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-4 w-full">
          {/* Logo/Brand */}
          <div className="mb-12 text-center">
            <div className="flex-shrink-0 flex items-center justify-center mb-2">
              <BoostBuddiesLogo size="small" hideText={true} />
            </div>
            {/*<h1 className="text-4xl font-lilita mb-4">BoostBuddies</h1>*/}
            <p className="text-lg text-indigo-100 max-w-md mx-auto leading-relaxed">
              Where every view, every referral, and every interaction turns into
              real earnings
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 gap-4 max-w-md w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <Coins className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <h3 className="font-lilita text-lg">Earn Daily</h3>
                  <p className="text-indigo-100 text-sm">
                    View products and earn KSH for every interaction
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-lilita text-lg">Refer & Grow</h3>
                  <p className="text-indigo-100 text-sm">
                    Earn KSH 150 for each friend who joins your network
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-lilita text-lg">Win Rewards</h3>
                  <p className="text-indigo-100 text-sm">
                    Unlock bonuses and special packages as you level up
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-indigo-200">Active Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold">KSH 50K+</div>
              <div className="text-sm text-indigo-200">Paid Out</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm text-indigo-200">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Header (Visible only on mobile) */}
          <div className="md:hidden text-center mb-8">
            <div className="flex-shrink-0 flex items-center justify-center mb-4">
              <BoostBuddiesLogo size="small" hideText={false} />
            </div>
            {/*<h1 className="text-xl md:text-3xl font-lilita text-gray-900 mb-2">
              Welcome Back!
            </h1>*/}
            <p className="text-gray-600 max-w-[75vw] mx-auto text-md md:text-base">
              Sign in to continue earning and growing your network
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block text-center mb-8">
            <h1 className="text-3xl font-lilita text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Sign in to continue your earning journey
            </p>
          </div>

          {/* Quick Stats for Mobile */}
          <div className="md:hidden grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm text-center">
              <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Earn</div>
              <div className="text-sm font-bold text-gray-900">Daily</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm text-center">
              <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Refer</div>
              <div className="text-sm font-bold text-gray-900">Friends</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm text-center">
              <Gift className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Win</div>
              <div className="text-sm font-bold text-gray-900">Rewards</div>
            </div>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
          >
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-lilita text-md transition-all duration-200 transform ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                } text-white`}
              >
                {isLoading ? <Spinner /> : "Sign In"}
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
                  >
                    Sign up and start earning
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-white/20">
            <h2 className="text-xl font-lilita text-gray-900 mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email to receive a reset code
            </p>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>

            {forgotPassError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-600">{forgotPassError}</p>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors duration-200"
                onClick={() => setShowForgotModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-medium transition-all duration-200"
                onClick={handleForgotPassword}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-white/20">
            <h2 className="text-xl font-lilita text-indigo-800 mb-2">
              Create New Password
            </h2>
            <p className="text-sm text-indigo-600 mb-6">
              A One Time Password (OTP) has been sent to your email. Expires
              after 15 minutes.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={resetData.otp}
                onChange={(e) =>
                  setResetData((prev) => ({ ...prev, otp: e.target.value }))
                }
              />

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full p-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={resetData.newPassword}
                  onChange={(e) =>
                    setResetData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="w-full p-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={resetData.confirmPassword}
                  onChange={(e) =>
                    setResetData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {resetPassError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-red-600">{resetPassError}</p>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors duration-200"
                onClick={() => setShowResetModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-medium transition-all duration-200"
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default LoginPage;
