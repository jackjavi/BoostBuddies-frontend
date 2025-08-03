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
} from "lucide-react";

const WithdrawalComponent = ({
  user,
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
  const maxWithdrawal = availableBalance;
  const canWithdraw = user?.hasPaid && availableBalance >= minWithdrawal;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || isNaN(formData.amount)) {
      newErrors.amount = "Please enter a valid amount";
    } else {
      const amount = parseFloat(formData.amount);
      if (amount < minWithdrawal) {
        newErrors.amount = `Minimum withdrawal is KSH ${minWithdrawal.toLocaleString()}`;
      } else if (amount > maxWithdrawal) {
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
      setErrors({
        submit: error.message || "Failed to submit withdrawal request",
      });
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

  if (!isVisible) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
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
              <p className="text-sm text-gray-600">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
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

        {/* Content */}
        <div className="p-6">
          {!canWithdraw ? (
            // Ineligible State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Withdrawal Not Available
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                {!user?.hasPaid && (
                  <p className="flex items-center justify-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span>Please complete package payment first</span>
                  </p>
                )}
                {availableBalance < minWithdrawal && (
                  <p className="flex items-center justify-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span>
                      Minimum balance required: {formatCurrency(minWithdrawal)}
                    </span>
                  </p>
                )}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Current Balance:</strong>{" "}
                  {formatCurrency(availableBalance)}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Keep earning to reach the minimum withdrawal amount!
                </p>
              </div>
            </div>
          ) : step === 1 ? (
            // Step 1: Form
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
                    placeholder={`Min. ${minWithdrawal}`}
                    min={minWithdrawal}
                    max={maxWithdrawal}
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
                        amount: maxWithdrawal.toString(),
                      }))
                    }
                    className="text-xs text-green-600 hover:text-green-700"
                  >
                    Max ({formatCurrency(maxWithdrawal)})
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
                      Withdrawals are processed within 24-48 hours after admin
                      verification.
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
            // Step 2: Confirmation
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

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-700 text-sm">{errors.submit}</p>
                  </div>
                </div>
              )}

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
            // Step 3: Success
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
                      <li>• Admin team reviews your request</li>
                      <li>• You'll receive email updates</li>
                      <li>• Processing time: 24-48 hours</li>
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
