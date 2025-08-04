import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Gift,
  Sparkles,
  Users,
  Coins,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    referredBy: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - replace with actual implementation
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 201,
            data: { message: "User created successfully" },
          });
        }, 1000);
      });

      if (response.status === 201) {
        setTimeout(() => {
          // Navigate to login - replace with actual navigation
          console.log("Navigating to login...");
        }, 200);
      }
    } catch (error) {
      console.log(
        `Signup error log ${error?.response?.data?.error?.message} || ${error.message}`
      );
      setErrorMessage(error?.response?.data?.error?.message || error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  const { username, email, password, confirmPassword, referredBy } = formData;

  return (
    <main className="min-h-screen flex py-24 max-w-7xl mx-auto relative overflow-hidden">
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

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          {/* Logo/Brand */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-lilita mb-4">Join BoostBuddies</h1>
            <p className="text-xl text-indigo-100 max-w-md mx-auto leading-relaxed">
              Start your earning journey today and build a network that pays you
              back
            </p>
          </div>

          {/* Getting Started Steps */}
          <div className="grid grid-cols-1 gap-6 max-w-md w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <h3 className="font-lilita text-lg">Step 1: Sign Up</h3>
                  <p className="text-indigo-100 text-sm">
                    Create your free account in under 2 minutes
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-lilita text-lg">Step 2: Start Earning</h3>
                  <p className="text-indigo-100 text-sm">
                    View products and complete tasks to earn KSH daily
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-lilita text-lg">
                    Step 3: Invite Friends
                  </h3>
                  <p className="text-indigo-100 text-sm">
                    Earn KSH 100 for each friend who joins your network
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-indigo-200">Members Earning</div>
            </div>
            <div>
              <div className="text-2xl font-bold">Up to 40% Share</div>
              <div className="text-sm text-indigo-200">Per Referral</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-indigo-200">Earning Potential</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Header (Visible only on mobile) */}
          <div className="md:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-lilita text-gray-900 mb-2">
              Start Earning Today!
            </h1>
            <p className="text-gray-600">
              Join thousands earning KSH daily through our platform
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block text-center mb-8">
            <h1 className="text-3xl font-lilita text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Start your earning journey with BoostBuddies
            </p>
          </div>

          {/* Quick Benefits for Mobile */}
          <div className="md:hidden grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm text-center">
              <Coins className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Earn</div>
              <div className="text-sm font-bold text-gray-900">Daily</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm text-center">
              <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">KSH 150</div>
              <div className="text-sm font-bold text-gray-900">
                Per Referral
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm text-center">
              <Award className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Win</div>
              <div className="text-sm font-bold text-gray-900">Rewards</div>
            </div>
          </div>

          {/* Signup Form */}
          <div
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
          >
            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    id="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Referral Code Field */}
              <div>
                <label
                  htmlFor="referredBy"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Referral Code{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Gift className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    id="referredBy"
                    placeholder="Enter referral code (optional)"
                    value={referredBy}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Have a referral code? Enter it to get bonus rewards!
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              )}

              {/* Terms and Privacy */}
              <div className="text-xs text-gray-600 text-center">
                By creating an account, you agree to our{" "}
                <a href="/" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </div>

              {/* Signup Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-lilita text-lg transition-all duration-200 transform ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                } text-white`}
              >
                {isLoading ? <Spinner /> : "Create Account & Start Earning"}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
