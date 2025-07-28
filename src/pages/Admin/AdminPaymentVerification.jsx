import React, { useState, useEffect } from "react";
import {
  Check,
  X,
  Clock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AdminPaymentVerificationPage = ({ paymentId }) => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [notes, setNotes] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null); // 'approve' | 'reject'

  useEffect(() => {
    fetchPaymentDetails();
  }, [paymentId]);

  const fetchPaymentDetails = async () => {
    try {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy data
      const dummyData = {
        payment: {
          packageName: "Gold Package",
          amount: 1500,
          paymentCode: "MPESA123XYZ",
          tillNumber: "654321",
          phoneNumber: "+254712345678",
          submittedAt: new Date().toISOString(),
          status: "pending", // "approved" or "rejected" also valid
          verifiedAt: null,
          verificationNotes: "",
          user: {
            name: "Jane Doe",
            email: "jane@example.com",
            referralCode: "REF456",
          },
        },
      };

      setPayment(dummyData.payment);
    } catch (error) {
      console.error("Error fetching payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (status) => {
    setProcessing(true);
    try {
      const response = await fetch(`/api/payments/verify/${paymentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          agentId: 1, // Replace with actual agent ID from auth
          notes: notes.trim(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setPayment((prev) => ({ ...prev, status, verificationNotes: notes }));
        setShowConfirmModal(false);
        setNotes("");
      } else {
        alert("Error processing verification");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Error processing verification");
    } finally {
      setProcessing(false);
    }
  };

  const openConfirmModal = (type) => {
    setActionType(type);
    setShowConfirmModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Not Found
          </h2>
          <p className="text-gray-600">
            The requested payment could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 md:px-4 pt-20 md:pt-32 pb-20 md:pb-32">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payment Verification
              </h1>
              <p className="text-gray-600 mt-2">
                Verify M-Pesa payment details and approve or reject the
                transaction
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {payment.status === "pending" && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Pending
                </span>
              )}
              {payment.status === "approved" && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approved
                </span>
              )}
              {payment.status === "rejected" && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  Rejected
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Details Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {payment.packageName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    Ksh {payment.amount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Code
                  </label>
                  <p className="text-lg font-mono font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                    {payment.paymentCode}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Till Number
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {payment.tillNumber}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <p className="text-lg font-semibold text-gray-900 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    {payment.phoneNumber}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submitted At
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(payment.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* User Information Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                User Information
              </h2>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {payment.user?.name || "N/A"}
                  </h3>
                  <p className="text-gray-600">
                    {payment.user?.email || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Referral Code: {payment.user?.referralCode || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Instructions */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Verification Instructions
                  </h3>
                  <div className="text-blue-800 space-y-2">
                    <p>
                      1. Check your M-Pesa messages for confirmation with code:{" "}
                      <strong>{payment.paymentCode}</strong>
                    </p>
                    <p>
                      2. Verify the amount matches:{" "}
                      <strong>Ksh {payment.amount.toLocaleString()}</strong>
                    </p>
                    <p>
                      3. Confirm the sender's phone number:{" "}
                      <strong>{payment.phoneNumber}</strong>
                    </p>
                    <p>
                      4. Ensure payment was made to till:{" "}
                      <strong>{payment.tillNumber}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Panel */}
            {payment.status === "pending" && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Verification Action
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add verification notes..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => openConfirmModal("approve")}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => openConfirmModal("reject")}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Status
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-semibold ${
                      payment.status === "approved"
                        ? "text-green-600"
                        : payment.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </span>
                </div>

                {payment.verifiedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Verified:</span>
                    <span className="text-gray-900">
                      {new Date(payment.verifiedAt).toLocaleString()}
                    </span>
                  </div>
                )}

                {payment.verificationNotes && (
                  <div className="pt-3 border-t">
                    <span className="text-gray-600 text-sm">Notes:</span>
                    <p className="text-gray-900 text-sm mt-1">
                      {payment.verificationNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm {actionType === "approve" ? "Approval" : "Rejection"}
            </h3>

            <p className="text-gray-600 mb-6">
              Are you sure you want to {actionType} this payment for{" "}
              <strong>{payment.packageName}</strong> worth{" "}
              <strong>Ksh {payment.amount.toLocaleString()}</strong>?
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleVerification(
                    actionType === "approve" ? "approved" : "rejected"
                  )
                }
                disabled={processing}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                  actionType === "approve"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {processing
                  ? "Processing..."
                  : `Confirm ${actionType === "approve" ? "Approval" : "Rejection"}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentVerificationPage;
