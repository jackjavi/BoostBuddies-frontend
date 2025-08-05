import { useState, useEffect } from "react";
import {
  Mail,
  X,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import Spinner from "./Spinner";

function EmailVerificationModal({
  isOpen,
  onClose,
  email,
  onVerificationSuccess,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setErrorMessage("");
      setSuccessMessage("");
      setTimeLeft(15 * 60);
      setCanResend(false);
    }
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Clear errors when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    // Focus the last filled input or first empty
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    document.getElementById(`otp-${lastFilledIndex}`)?.focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setErrorMessage("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otpString,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || data.message || "Verification failed"
        );
      }

      setSuccessMessage("Email verified successfully!");

      // Wait a moment to show success message, then redirect
      setTimeout(() => {
        onVerificationSuccess();
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Email verification error:", error);
      setErrorMessage(
        error.message || "Verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/resend-email-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || data.message || "Failed to resend code"
        );
      }

      setSuccessMessage("New verification code sent!");
      setTimeLeft(15 * 60); // Reset timer
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]); // Clear current OTP

      // Focus first input
      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 100);
    } catch (error) {
      console.error("Resend OTP error:", error);
      setErrorMessage(
        error.message || "Failed to resend code. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Verify Your Email
              </h2>
              <p className="text-sm text-gray-500">Almost there!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">
              We've sent a 6-digit verification code to:
            </p>
            <p className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-lg inline-block">
              {email}
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {timeLeft > 0 ? (
                <>
                  Code expires in{" "}
                  <span className="font-medium text-red-500">
                    {formatTime(timeLeft)}
                  </span>
                </>
              ) : (
                <span className="text-red-500">Code expired</span>
              )}
            </span>
          </div>

          {/* OTP Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter Verification Code
              </label>
              <div className="flex justify-center space-x-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-lg font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.join("").length !== 6}
              className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 ${
                isLoading || otp.join("").length !== 6
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Spinner size="sm" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
          </div>

          {/* Resend Section */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOtp}
              disabled={!canResend || isResending || isLoading}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                canResend && !isResending && !isLoading
                  ? "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              {isResending ? (
                <>
                  <Spinner size="sm" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Resend Code</span>
                </>
              )}
            </button>

            {!canResend && timeLeft > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                You can request a new code in {formatTime(timeLeft)}
              </p>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Check your spam folder if you don't see the email.
              <br />
              Still having trouble? Contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationModal;
