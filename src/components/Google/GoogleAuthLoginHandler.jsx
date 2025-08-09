import { useState, useEffect, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import {
  CheckCircle,
  AlertCircle,
  X,
  Shield,
  Lock,
  ArrowRight,
} from "lucide-react";

const GoogleAuthLoginHandler = () => {
  const [showModal, setShowModal] = useState(false);
  const [authStatus, setAuthStatus] = useState(null); // 'success' or 'failure'
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { storeToken, storeUserData, authenticateUser } =
    useContext(AuthContext);

  const cleanUpUrl = useCallback(() => {
    // Remove query parameters from URL without triggering navigation
    const url = new URL(window.location);
    url.searchParams.delete("gAuthSuccess");
    url.searchParams.delete("gAuthFailure");
    url.searchParams.delete("token");
    url.searchParams.delete("user");
    window.history.replaceState({}, "", url);
  }, []);

  const handleFailedAuth = useCallback(
    (failureReason) => {
      setAuthStatus("failure");

      // Determine error message based on the failure reason
      if (typeof failureReason === "string" && failureReason !== "true") {
        if (failureReason.includes("User exists with password")) {
          setErrorMessage(
            "An account with this email already exists. Please log in using your email and password instead of Google Sign-In."
          );
        } else {
          setErrorMessage(failureReason);
        }
      } else {
        setErrorMessage(
          "Google authentication failed. Please try logging in with your email and password."
        );
      }

      setShowModal(true);
      cleanUpUrl();
    },
    [cleanUpUrl]
  );

  const handleSuccessfulAuth = useCallback(
    async (token, userParam) => {
      try {
        // Parse user data
        const userData = decodeURIComponent(userParam);
        console.log(`User Data googled, ${userData}`);

        // Store authentication data
        storeToken(token);
        storeUserData(userData);

        // Authenticate user
        await authenticateUser();

        // Clean up URL
        cleanUpUrl();

        // Show success modal briefly then redirect
        setAuthStatus("success");
        setShowModal(true);

        // Auto redirect after showing success
        setTimeout(() => {
          setShowModal(false);
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        }, 2000);
      } catch (error) {
        console.error("Error processing Google auth success:", error);
        handleFailedAuth("Failed to process authentication data");
      }
    },
    [
      storeToken,
      storeUserData,
      authenticateUser,
      location.state,
      navigate,
      cleanUpUrl,
      handleFailedAuth,
    ]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const googleAuthSuccess = urlParams.get("gAuthSuccess");
    const googleAuthFailure = urlParams.get("gAuthFailure");
    const token = urlParams.get("token");
    const userParam = urlParams.get("user");

    if (googleAuthSuccess === "true" && token && userParam) {
      handleSuccessfulAuth(token, userParam);
    } else if (googleAuthFailure === "true" || googleAuthFailure) {
      handleFailedAuth(googleAuthFailure);
    }
  }, [location.search, handleSuccessfulAuth, handleFailedAuth]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTryRegularLogin = () => {
    setShowModal(false);
    // Focus on email input if it exists
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.focus();
    }
  };

  if (!showModal) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Modal Content */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Modal Header */}
          <div
            className={`px-6 py-4 ${authStatus === "success" ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-rose-500"} text-white relative`}
          >
            {authStatus === "failure" && (
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center space-x-3">
              {authStatus === "success" ? (
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-7 h-7" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-7 h-7" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold">
                  {authStatus === "success"
                    ? "Welcome Back!"
                    : "Sign-In Failed"}
                </h3>
                <p className="text-white/90 text-sm">
                  {authStatus === "success"
                    ? "Successfully signed in with Google"
                    : "Unable to complete Google sign-in"}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {authStatus === "success" ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Authentication Successful!
                  </h4>
                  <p className="text-gray-600 text-sm">
                    You've been successfully logged in. Redirecting you to your
                    dashboard...
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">
                      Taking you to your dashboard
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-red-600" />
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Google Sign-In Failed
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">{errorMessage}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-800 mb-2">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      What to do next:
                    </span>
                  </div>
                  <p className="text-blue-700 text-xs">
                    Use the login form below with your registered email and
                    password to access your account.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer - Only show for failure */}
          {authStatus === "failure" && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={handleTryRegularLogin}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <span>Try Regular Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GoogleAuthLoginHandler;
