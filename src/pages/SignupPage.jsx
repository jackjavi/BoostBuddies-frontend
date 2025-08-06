import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Gift,
  Users,
  Coins,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Check,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BoostBuddiesLogo from "../components/BoostBuddiesLogo";
import EmailVerificationModal from "../components/EmailVerificationModal";

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [validationState, setValidationState] = useState({
    username: { isValid: false, errors: [] },
    email: { isValid: false, errors: [] },
    password: { isValid: false, errors: [] },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) return false;
    if (email.length > 254) return false;
    if (email.startsWith(".") || email.endsWith(".")) return false;
    if (email.includes("..")) return false;

    const [localPart, domain] = email.split("@");
    if (localPart.length > 64) return false;
    if (domain.length > 253) return false;

    return true;
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Must be at least 8 characters long");
    }
    if (password.length > 128) {
      errors.push("Must not exceed 128 characters");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Must contain at least one lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Must contain at least one uppercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("Must contain at least one number");
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push("Must contain at least one special character");
    }

    const commonPatterns = [
      /(.)\1{2,}/,
      /123456|654321|abcdef|fedcba/i,
      /password|123456|qwerty|admin|user|login/i,
    ];

    for (const pattern of commonPatterns) {
      if (pattern.test(password)) {
        errors.push("Contains common weak patterns or sequences");
        break;
      }
    }

    if (password.trim() !== password) {
      errors.push("Cannot start or end with whitespace");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const validateUsername = (username) => {
    const errors = [];

    if (username.length < 3) {
      errors.push("Must be at least 3 characters long");
    }
    if (username.length > 30) {
      errors.push("Must not exceed 30 characters");
    }
    if (!/^[a-zA-Z0-9]/.test(username)) {
      errors.push("Must start with a letter or number");
    }
    if (/[_-]$/.test(username)) {
      errors.push("Cannot end with underscore or hyphen");
    }
    if (/[_-]{2,}/.test(username)) {
      errors.push("Cannot contain consecutive underscores or hyphens");
    }

    const reservedUsernames = [
      "admin",
      "administrator",
      "root",
      "system",
      "api",
      "www",
      "mail",
      "email",
      "support",
      "help",
      "info",
      "contact",
      "service",
      "team",
      "staff",
      "mod",
      "moderator",
      "null",
      "undefined",
      "test",
      "demo",
      "guest",
      "anonymous",
    ];

    if (reservedUsernames.includes(username.toLowerCase())) {
      errors.push("Username is reserved and cannot be used");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const refCode = urlParams.get("ref");

    if (refCode) {
      setFormData((prevData) => ({
        ...prevData,
        referredBy: refCode.toUpperCase(),
      }));
    }
  }, [location.search]);

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;

    setFormData({ ...formData, [key]: value });

    // Clear field-specific errors when user starts typing
    if (fieldErrors[key]) {
      setFieldErrors({ ...fieldErrors, [key]: null });
    }

    // Real-time validation
    let validation = { isValid: true, errors: [] };

    switch (key) {
      case "username":
        if (value.trim()) {
          validation = validateUsername(value.trim());
        }
        break;
      case "email":
        if (value.trim()) {
          validation = {
            isValid: validateEmail(value.trim().toLowerCase()),
            errors: validateEmail(value.trim().toLowerCase())
              ? []
              : ["Invalid email format"],
          };
        }
        break;
      case "password":
        if (value) {
          validation = validatePassword(value);
        }
        break;
      default:
        break;
    }

    setValidationState((prev) => ({
      ...prev,
      [key]: validation,
    }));
  };

  const sendEmailVerification = async (email) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/send-email-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message ||
            data.message ||
            "Failed to send verification email"
        );
      }

      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Send email verification error:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous errors
    setErrorMessage("");
    setFieldErrors({});

    // Validate all fields
    const usernameValidation = validateUsername(formData.username.trim());
    const emailValidation = {
      isValid: validateEmail(formData.email.trim().toLowerCase()),
      errors: validateEmail(formData.email.trim().toLowerCase())
        ? []
        : ["Invalid email format"],
    };
    const passwordValidation = validatePassword(formData.password);

    const newFieldErrors = {};

    if (!usernameValidation.isValid) {
      newFieldErrors.username = usernameValidation.errors;
    }
    if (!emailValidation.isValid) {
      newFieldErrors.email = emailValidation.errors;
    }
    if (!passwordValidation.isValid) {
      newFieldErrors.password = passwordValidation.errors;
    }

    if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = ["Passwords do not match"];
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            referredBy: formData.referredBy?.toUpperCase() || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || data.message || "Registration failed"
        );
      }

      console.log("User registered successfully!");

      // Set the registered email and send verification email
      const registeredEmailAddress = formData.email.trim().toLowerCase();
      setRegisteredEmail(registeredEmailAddress);

      // Send verification email
      await sendEmailVerification(registeredEmailAddress);

      // Show email verification modal
      setShowEmailVerification(true);
    } catch (error) {
      console.log(`Signup error: ${error.message}`);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailVerificationSuccess = () => {
    navigate("/login");
  };

  const handleCloseEmailVerification = () => {
    setShowEmailVerification(false);
    // Optionally redirect to login even without verification
    // navigate("/login");
  };

  const getFieldValidationIcon = (fieldName) => {
    const validation = validationState[fieldName];
    if (!formData[fieldName]) return null;

    return validation.isValid ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    );
  };

  const { username, email, password, confirmPassword, referredBy } = formData;

  return (
    <>
      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showEmailVerification}
        onClose={handleCloseEmailVerification}
        email={registeredEmail}
        onVerificationSuccess={handleEmailVerificationSuccess}
      />

      <main className=" flex h-screen items-center justify-center pt-24 max-w-7xl mx-auto relative overflow-scroll">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-15 animate-bounce"></div>
        </div>

        {/* Left Side - Illustration & Branding (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 md:py-8 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 right-16 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-white/20 rounded-full blur-lg"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
            {/* Logo/Brand */}
            <div className="mb-12 text-center">
              <div className="flex-shrink-0 flex items-center justify-center mb-4">
                <BoostBuddiesLogo hideText={true} className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-bold mb-4 font-lilita">
                Join BoostBuddies
              </h1>
              <p className="text-xl text-indigo-100 max-w-md mx-auto leading-relaxed">
                Start your earning journey today and build a network that pays
                you back
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
                    <h3 className="font-bold text-lg">Step 1: Sign Up</h3>
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
                    <h3 className="font-bold text-lg">Step 2: Start Earning</h3>
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
                    <h3 className="font-bold text-lg">
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
        <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 relative z-10">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="md:hidden text-center mb-2">
              <div className="flex-shrink-0 flex items-center justify-center mb-4">
                <BoostBuddiesLogo className="w-12 h-12" />
              </div>
              <p className="text-gray-600 max-w-[75vw] mx-auto text-md">
                Join thousands earning KSH daily through our platform
              </p>
              {/* <h1 className="text-xl md:text-3xl font-bold text-gray-900 my-2 font-lilita">
                Start Earning Today!
              </h1> */}
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block text-center mb-2">
              <h1 className="text-xl font-bold text-gray-900 mb-2 font-lilita">
                Create Your Account
              </h1>
              <p className="text-gray-600 text-md max-w-[75%] text-center mx-auto">
                Start your earning journey with BoostBuddies
              </p>
            </div>

            {/* Quick Benefits for Mobile */}
            <div className="md:hidden grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm text-center">
                <Coins className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Earn</div>
                <div className="text-sm font-bold text-gray-900">Daily</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-sm text-center">
                <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Up to 40% share</div>
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
            <form
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
            >
              <div className="space-y-4">
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
                      className={`w-full pl-10 pr-10 py-2 text-sm border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        fieldErrors.username
                          ? "border-red-300 focus:ring-red-500 focus:border-transparent"
                          : validationState.username.isValid && username
                            ? "border-green-300 focus:ring-indigo-500 focus:border-transparent"
                            : "border-gray-200 focus:ring-indigo-500 focus:border-transparent"
                      }`}
                      type="text"
                      id="username"
                      placeholder="Choose a username"
                      value={username}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {getFieldValidationIcon("username")}
                    </div>
                  </div>
                  {fieldErrors.username && (
                    <div className="mt-2 text-sm text-red-600">
                      <ul className="list-disc list-inside space-y-1">
                        {fieldErrors.username.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {username &&
                    !fieldErrors.username &&
                    validationState.username.errors.length > 0 && (
                      <div className="mt-2 text-sm text-red-600">
                        <ul className="list-disc list-inside space-y-1">
                          {validationState.username.errors.map(
                            (error, index) => (
                              <li key={index}>{error}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
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
                      className={`w-full pl-10 pr-10 py-2 text-sm border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        fieldErrors.email
                          ? "border-red-300 focus:ring-red-500 focus:border-transparent"
                          : validationState.email.isValid && email
                            ? "border-green-300 focus:ring-indigo-500 focus:border-transparent"
                            : "border-gray-200 focus:ring-indigo-500 focus:border-transparent"
                      }`}
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {getFieldValidationIcon("email")}
                    </div>
                  </div>
                  {fieldErrors.email && (
                    <div className="mt-2 text-sm text-red-600">
                      <ul className="list-disc list-inside">
                        {fieldErrors.email.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                      className={`w-full pl-10 pr-12 py-2 text-sm border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        fieldErrors.password
                          ? "border-red-300 focus:ring-red-500 focus:border-transparent"
                          : validationState.password.isValid && password
                            ? "border-green-300 focus:ring-indigo-500 focus:border-transparent"
                            : "border-gray-200 focus:ring-indigo-500 focus:border-transparent"
                      }`}
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

                  {/* Password Requirements */}
                  {password && (
                    <div className="mt-3 space-y-2">
                      <div className="text-xs text-gray-600 mb-2">
                        Password Requirements:
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div
                          className={`flex items-center space-x-2 ${password.length >= 8 ? "text-green-600" : "text-gray-500"}`}
                        >
                          {password.length >= 8 ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <div className="h-3 w-3 border border-gray-300 rounded-full"></div>
                          )}
                          <span>At least 8 characters</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${/[a-z]/.test(password) ? "text-green-600" : "text-gray-500"}`}
                        >
                          {/[a-z]/.test(password) ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <div className="h-3 w-3 border border-gray-300 rounded-full"></div>
                          )}
                          <span>One lowercase letter</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${/[A-Z]/.test(password) ? "text-green-600" : "text-gray-500"}`}
                        >
                          {/[A-Z]/.test(password) ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <div className="h-3 w-3 border border-gray-300 rounded-full"></div>
                          )}
                          <span>One uppercase letter</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${/\d/.test(password) ? "text-green-600" : "text-gray-500"}`}
                        >
                          {/\d/.test(password) ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <div className="h-3 w-3 border border-gray-300 rounded-full"></div>
                          )}
                          <span>One number</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? "text-green-600" : "text-gray-500"}`}
                        >
                          {/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
                            password
                          ) ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <div className="h-3 w-3 border border-gray-300 rounded-full"></div>
                          )}
                          <span>One special character</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {fieldErrors.password && (
                    <div className="mt-2 text-sm text-red-600">
                      <ul className="list-disc list-inside space-y-1">
                        {fieldErrors.password.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                      className={`w-full pl-10 pr-12 py-2 text-sm border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        fieldErrors.confirmPassword
                          ? "border-red-300 focus:ring-red-500 focus:border-transparent"
                          : confirmPassword && confirmPassword === password
                            ? "border-green-300 focus:ring-indigo-500 focus:border-transparent"
                            : "border-gray-200 focus:ring-indigo-500 focus:border-transparent"
                      }`}
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <div className="mt-2 text-sm text-red-600">
                      {fieldErrors.confirmPassword.join(", ")}
                    </div>
                  )}
                  {confirmPassword && confirmPassword === password && (
                    <div className="mt-2 text-sm text-green-600 flex items-center space-x-1">
                      <Check className="h-4 w-4" />
                      <span>Passwords match</span>
                    </div>
                  )}
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
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
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
                  {referredBy && (
                    <p className="text-xs text-green-600 mt-1 flex items-center space-x-1">
                      <Check className="h-3 w-3" />
                      <span>Referral code applied!</span>
                    </p>
                  )}
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
                  <Link
                    to="/terms"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Privacy Policy
                  </Link>
                </div>

                {/* Signup Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 px-4 rounded-xl font-bold text-lg transition-all duration-200 transform ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  } text-white`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Spinner size="sm" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <span className="text-md font-lilita">
                      Create Account & Start Earning
                    </span>
                  )}
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
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignupPage;
