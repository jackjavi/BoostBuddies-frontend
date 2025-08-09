import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertCircle,
  X,
  User,
  Mail,
  ArrowRight,
} from "lucide-react";

const GoogleAuthHandler = () => {
  const [showModal, setShowModal] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);
  const [errorReason, setErrorReason] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const googleAuthSuccess = urlParams.get("gAuthSuccess");
    const googleAuthFailure = urlParams.get("gAuthFailure");
    const errorType = urlParams.get("error");

    if (googleAuthSuccess === "true") {
      setAuthStatus("success");
      setShowModal(true);
      cleanUpUrl();
    } else if (googleAuthFailure === "true") {
      setAuthStatus("failure");
      setShowModal(true);

      if (errorType === "email_exists") {
        setErrorReason(
          "An account with this email already exists. Please log in with your email and password instead."
        );
      } else if (errorType === "google_auth_error") {
        setErrorReason(
          "There was an error with Google authentication. Please try again or sign up with email."
        );
      } else {
        setErrorReason(
          "Authentication failed. This could be due to Google authentication issues or the email might already be registered. Please try logging in normally with your email and password."
        );
      }

      cleanUpUrl();
    }
  }, [location.search]);

  const cleanUpUrl = () => {
    // Remove query parameters from URL without triggering navigation
    const url = new URL(window.location);
    url.searchParams.delete("gAuthSuccess");
    url.searchParams.delete("gAuthFailure");
    url.searchParams.delete("error");
    window.history.replaceState({}, "", url);
  };

  const handleSuccessRedirect = () => {
    setShowModal(false);
    // Add a delay to show the success animation before redirecting
    setTimeout(() => {
      navigate("/login", {
        state: {
          message: "Account created successfully! Please log in to continue.",
          type: "success",
        },
      });
    }, 1000);
  };

  const handleFailureRedirect = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate("/login", {
        state: {
          message: "Please log in with your existing credentials.",
          type: "info",
        },
      });
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Modal Content */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Modal Header */}
          <div
            className={`px-6 py-4 ${authStatus === "success" ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-rose-500"} text-white relative`}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

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
                    ? "Welcome to BoostBuddies!"
                    : "Authentication Failed"}
                </h3>
                <p className="text-white/80 text-sm">
                  {authStatus === "success"
                    ? "Your account has been created successfully"
                    : "Unable to complete registration"}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {authStatus === "success" ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-8 h-8 text-green-600" />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Account Created Successfully!
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Your Google account has been successfully linked and your
                    BoostBuddies account is ready to use.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Ready to start earning
                    </span>
                  </div>
                  <p className="text-green-700 text-xs mt-1">
                    You can now log in and begin your earning journey
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-red-600" />
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Registration Unsuccessful
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">{errorReason}</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      What to do next?
                    </span>
                  </div>
                  <p className="text-red-700 text-xs mt-1">
                    Try logging in with your existing credentials or contact
                    support if you need help.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex space-x-3">
              {authStatus === "success" ? (
                <>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Stay Here
                  </button>
                  <button
                    onClick={handleSuccessRedirect}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <span>Continue to Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleFailureRedirect}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <span>Go to Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleAuthHandler;
