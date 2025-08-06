import React, { useState } from "react";
import {
  DollarSign,
  Wallet,
  AlertCircle,
  CheckCircle,
  Loader2,
  Shield,
  Clock,
  ArrowRight,
  X,
  Gift,
  TrendingUp,
} from "lucide-react";

const WithdrawalComponent = ({
  user,
  payments,
  stats,
  onWithdrawalRequest,
  isVisible,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    phoneNumber: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Form, 2: Confirmation, 3: Success

  const availableBalance = stats.totalEarnings || 0;
  const minWithdrawal = 500;

  // Helper function - moved to top to avoid hoisting issues
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  };

  // Payment validation logic
  const getPaymentStatus = () => {
    // First check: Balance must be above 500 regardless of payment status
    if (availableBalance < minWithdrawal) {
      return {
        canWithdraw: false,
        type: "insufficient_balance",
        title: "Insufficient Balance",
        message: `You need at least ${formatCurrency(minWithdrawal)} to make a withdrawal. Your current balance is ${formatCurrency(availableBalance)}. Keep earning by referring friends and viewing products to reach the minimum withdrawal amount.`,
        actionText: "View Products",
        actionHint:
          "Purchase a package to grow faster and unlock more earning opportunities!",
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100",
      };
    }

    // Find package payment in the payments array
    const packagePayment = payments?.find(
      (payment) => payment.type === "package_payment"
    );

    // Second check: No package payment exists
    if (!packagePayment) {
      return {
        canWithdraw: false,
        type: "no_package_payment",
        title: "Package Payment Required",
        message: `You need to purchase a package before you can request withdrawals. Your balance of ${formatCurrency(availableBalance)} will be available for withdrawal once you complete your package payment.`,
        actionText: "View Packages",
        actionHint:
          "Choose a package that suits your goals and start earning more!",
        iconColor: "text-orange-600",
        bgColor: "bg-orange-100",
      };
    }

    // Third check: Package payment is pending
    if (packagePayment.status === "pending") {
      return {
        canWithdraw: false,
        type: "payment_pending",
        title: "Payment Processing",
        message: `We are currently processing your package payment. Please wait for the payment to be approved before requesting withdrawals. You'll receive an email confirmation once your payment is processed.`,
        actionText: "Check Email",
        actionHint: "Processing usually takes 1-3 hours during business hours.",
        iconColor: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    }

    // Fourth check: Package payment approved - can withdraw
    if (packagePayment.status === "approved") {
      return {
        canWithdraw: true,
        type: "eligible",
        title: "Withdrawal Available",
        message: `Great! You can now request withdrawals. Your available balance is ${formatCurrency(availableBalance)}.`,
      };
    }

    // Fifth check: Package payment failed or other status
    return {
      canWithdraw: false,
      type: "payment_failed",
      title: "Payment Issue",
      message: `There's an issue with your package payment (Status: ${packagePayment.status}). Please contact support or try making a new payment to unlock withdrawals.`,
      actionText: "Contact Support",
      actionHint: "Our support team will help resolve this quickly.",
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
    };
  };

  const paymentStatus = getPaymentStatus();
  const canWithdraw = paymentStatus.canWithdraw;

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.amount ||
      isNaN(formData.amount) ||
      parseFloat(formData.amount) <= 0
    ) {
      newErrors.amount = "Please enter a valid amount";
    } else {
      const amount = parseFloat(formData.amount);
      if (amount < minWithdrawal) {
        newErrors.amount = `Minimum withdrawal is ${formatCurrency(minWithdrawal)}`;
      } else if (amount > availableBalance) {
        newErrors.amount = `Amount exceeds available balance`;
      }
    }

    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please provide a reason for withdrawal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onWithdrawalRequest({
        userId: user.id,
        amount: parseFloat(formData.amount),
        phoneNumber: formData.phoneNumber,
        reason: formData.reason,
      });
      setStep(3);
    } catch (error) {
      // Error will be handled by parent component through NotificationModal
      console.error("Withdrawal submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      phoneNumber: "",
      reason: "",
    });
    setErrors({});
    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleActionClick = () => {
    const { type } = paymentStatus;

    switch (type) {
      case "insufficient_balance":
        window.location.href = "/products";
        break;
      case "no_package_payment":
        window.location.href = "/packages";
        break;
      case "payment_pending":
        // Maybe open email client or show more info
        break;
      case "payment_failed":
        window.location.href = "/support";
        break;
      default:
        break;
    }

    onClose();
  };

  if (!isVisible) return null;

  const getStatusIcon = () => {
    const { type, iconColor, bgColor } = paymentStatus;

    const iconProps = {
      className: `w-8 h-8 ${iconColor || "text-red-600"}`,
    };

    switch (type) {
      case "insufficient_balance":
        return {
          icon: <TrendingUp {...iconProps} />,
          bgColor: bgColor || "bg-blue-100",
        };
      case "no_package_payment":
        return {
          icon: <Gift {...iconProps} />,
          bgColor: bgColor || "bg-orange-100",
        };
      case "payment_pending":
        return {
          icon: <Clock {...iconProps} />,
          bgColor: bgColor || "bg-yellow-100",
        };
      case "payment_failed":
        return {
          icon: <AlertCircle {...iconProps} />,
          bgColor: bgColor || "bg-red-100",
        };
      default:
        return { icon: <Shield {...iconProps} />, bgColor: "bg-red-100" };
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Request Withdrawal
              </h3>
              <p className="text-sm text-gray-600">
                {canWithdraw ? `Step ${step} of 3` : "Requirements Check"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar - only show if eligible */}
        {canWithdraw && (
          <div className="px-6 py-2">
            <div className="flex space-x-2">
              {[1, 2, 3].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`flex-1 h-2 rounded-full ${
                    stepNum <= step ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {!canWithdraw ? (
            // Ineligible State with specific messages
            <div className="text-center py-8">
              <div
                className={`w-16 h-16 ${getStatusIcon().bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {getStatusIcon().icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {paymentStatus.title}
              </h4>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {paymentStatus.message}
              </p>

              {/* Current Balance Display */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(availableBalance)}
                </p>
                {paymentStatus.type === "insufficient_balance" && (
                  <div className="mt-2 text-xs text-gray-500">
                    Need: {formatCurrency(minWithdrawal - availableBalance)}{" "}
                    more
                  </div>
                )}
              </div>

              {/* Action Hint */}
              {paymentStatus.actionHint && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700 italic">
                    💡 {paymentStatus.actionHint}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {paymentStatus.actionText && (
                  <button
                    onClick={handleActionClick}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {paymentStatus.actionText}
                  </button>
                )}
              </div>
            </div>
          ) : step === 1 ? (
            // Step 1: Form (same as before but simplified)
            <div className="space-y-6">
              {/* Balance Info */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Available Balance</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(availableBalance)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Min. Withdrawal</p>
                    <p className="text-sm font-medium text-gray-700">
                      {formatCurrency(minWithdrawal)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Amount (KSH)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.amount ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: minWithdrawal.toString(),
                      }))
                    }
                    className="text-xs text-green-600 hover:text-green-700"
                  >
                    Min ({formatCurrency(minWithdrawal)})
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: availableBalance.toString(),
                      }))
                    }
                    className="text-xs text-green-600 hover:text-green-700"
                  >
                    Max ({formatCurrency(availableBalance)})
                  </button>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="254XXXXXXXXX"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.phoneNumber ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Withdrawal
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="E.g., Personal expenses, Business investment..."
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none ${
                    errors.reason ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
                )}
              </div>

              {/* Processing Info */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Processing Time
                    </p>
                    <p className="text-sm text-yellow-700">
                      Withdrawals are reviewed within 3 hours and processed
                      within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            // Step 2: Confirmation (same as before)
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Confirm Your Withdrawal
                </h4>
                <p className="text-gray-600">
                  Please review your withdrawal details carefully
                </p>
              </div>

              {/* Confirmation Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(parseFloat(formData.amount))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone Number:</span>
                  <span className="font-semibold text-gray-900">
                    {formData.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reason:</span>
                  <span className="font-semibold text-gray-900 text-right max-w-48">
                    {formData.reason}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-gray-600">Remaining Balance:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(
                      availableBalance - parseFloat(formData.amount)
                    )}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            // Step 3: Success (same as before)
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Withdrawal Request Submitted!
              </h4>
              <p className="text-gray-600 mb-6">
                Your withdrawal request has been sent to our admin team for
                review.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-800">
                      What happens next?
                    </p>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Admin team reviews your request within 3 hours</li>
                      <li>• You'll receive email updates</li>
                      <li>• Processing time: 24-48 hours after approval</li>
                      <li>• Money sent to your M-Pesa</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalComponent;
