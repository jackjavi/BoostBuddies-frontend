import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Trophy,
  Zap,
  Users,
  TrendingUp,
  ArrowLeft,
  Check,
  X,
  CreditCard,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { submitPackagePayment } from "../api/api2";
import MobileNavBottom from "../components/MobileNavBottomPackages";

// Mock package data - to replace later with actual data from props/API
const packageData = {
  genz: {
    id: 1,
    name: "Genz Package",
    price: "Ksh 1,500",
    priceValue: 1500,
    description:
      "This is the top-tier package for the go-getters. Genz users enjoy access to premium, high-earning products and featured listings daily.",
    longDescription:
      "The Genz Package is designed for ambitious individuals who want to maximize their earning potential. With premium access to high-paying products, priority positioning in referral chains, and exclusive features, this package delivers the highest returns on your investment.",
    benefits: [
      "View up to 15 products daily",
      "Earn from high-paying, priority products",
      "Access to featured & exclusive offers",
      "Top-tier referral bonuses (Ksh 200 per referral)",
      "Priority in chain payouts",
      "Early access to new products",
      "Premium customer support",
      "Monthly performance bonuses",
    ],
    gradient: "from-yellow-400 to-yellow-500",
    icon: <Zap className="w-8 h-8 text-yellow-200" />,
    features: [
      {
        title: "Daily Views",
        value: "15 products",
        desc: "Maximum daily earning opportunities",
      },
      {
        title: "Referral Bonus",
        value: "Ksh 200",
        desc: "Per successful referral",
      },
      {
        title: "Priority Level",
        value: "Tier 1",
        desc: "Highest priority in chains",
      },
      { title: "Support", value: "Premium", desc: "Dedicated support channel" },
    ],
  },
  mbogi: {
    id: 2,
    name: "Mbogi Package",
    price: "Ksh 1,000",
    priceValue: 1000,
    description:
      "For the squad that hustles together. Mbogi gives you more firepower with boosted earnings and the ability to view more products daily.",
    longDescription:
      "The Mbogi Package is perfect for teams and individuals who want to build their network strategically. With enhanced daily view limits and better positioning in referral chains, this package offers excellent value for growing your earning potential.",
    benefits: [
      "View up to 10 products daily",
      "Eligible for higher-paying listings",
      "Better position in referral chain",
      "Daily rotation advantage",
      "Enhanced referral bonuses (Ksh 150 per referral)",
      "Priority customer support",
      "Access to group challenges",
      "Weekly performance tracking",
    ],
    gradient: "from-gray-500 to-gray-600",
    icon: <Users className="w-8 h-8 text-gray-200" />,
    features: [
      {
        title: "Daily Views",
        value: "10 products",
        desc: "Solid daily earning opportunities",
      },
      {
        title: "Referral Bonus",
        value: "Ksh 150",
        desc: "Per successful referral",
      },
      {
        title: "Priority Level",
        value: "Tier 2",
        desc: "High priority in chains",
      },
      { title: "Support", value: "Priority", desc: "Enhanced support access" },
    ],
  },
  baller: {
    id: 3,
    name: "Baller Package",
    price: "Ksh 750",
    priceValue: 750,
    description:
      "Step up your game. Baller users get daily earning opportunities from multiple listings and a boost in chain earnings.",
    longDescription:
      "The Baller Package is ideal for those testing the waters before going full throttle. With access to medium-tier rewards and decent daily view limits, it's perfect for building momentum and understanding the system.",
    benefits: [
      "View up to 7 products daily",
      "Access to medium-tier rewards",
      "Referrals earn you more",
      "Basic featured listing access",
      "Standard referral bonuses (Ksh 100 per referral)",
      "Regular customer support",
      "Weekly earning reports",
      "Upgrade incentives",
    ],
    gradient: "from-orange-500 to-orange-600",
    icon: <TrendingUp className="w-8 h-8 text-orange-200" />,
    features: [
      {
        title: "Daily Views",
        value: "7 products",
        desc: "Good daily earning potential",
      },
      {
        title: "Referral Bonus",
        value: "Ksh 100",
        desc: "Per successful referral",
      },
      {
        title: "Priority Level",
        value: "Tier 3",
        desc: "Medium priority in chains",
      },
      { title: "Support", value: "Standard", desc: "Regular support access" },
    ],
  },
  comrade: {
    id: 4,
    name: "Comrade Package",
    price: "Ksh 500",
    priceValue: 500,
    description:
      "Just getting started? Comrade is your starter pack. You'll get daily view earnings and a chance to build your chain.",
    longDescription:
      "The Comrade Package is perfect for students and beginners trying out the system. With entry-level earnings and the flexibility to upgrade anytime, it's the ideal starting point for your earning journey.",
    benefits: [
      "View up to 4 products daily",
      "Entry-level earnings",
      "Join referral chain",
      "Upgrade anytime",
      "Basic referral bonuses (Ksh 50 per referral)",
      "Community support access",
      "Learning resources included",
      "No long-term commitment",
    ],
    gradient: "from-purple-500 to-purple-600",
    icon: <Trophy className="w-8 h-8 text-purple-200" />,
    features: [
      {
        title: "Daily Views",
        value: "4 products",
        desc: "Entry-level earning opportunities",
      },
      {
        title: "Referral Bonus",
        value: "Ksh 50",
        desc: "Per successful referral",
      },
      {
        title: "Priority Level",
        value: "Tier 4",
        desc: "Basic priority in chains",
      },
      { title: "Support", value: "Community", desc: "Community support forum" },
    ],
  },
};

const CheckoutModal = ({ isOpen, onClose, packageInfo, onPaymentSubmit }) => {
  const [paymentCode, setPaymentCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Instructions, 2: Payment Code Entry, 3: Success
  const [submitError, setSubmitError] = useState("");
  const [paymentId, setPaymentId] = useState(null);

  const tillNumber = "5872036";

  const handlePaymentSubmit = async () => {
    if (!paymentCode.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await onPaymentSubmit({
        packageId: packageInfo.id,
        paymentCode: paymentCode.trim().toUpperCase(),
        phoneNumber: phoneNumber.trim(),
        tillNumber: tillNumber,
      });

      if (result.success) {
        setPaymentId(result.paymentId);
        setStep(3); // Move to success step
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      setSubmitError(error || "Failed to submit payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setPaymentCode("");
    setPhoneNumber("");
    setSubmitError("");
    setPaymentId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {step === 3 ? "Payment Submitted!" : "Complete Payment"}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <>
              {/* Package Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {packageInfo.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {packageInfo.price}
                </p>
              </div>

              {/* Payment Instructions */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  M-Pesa Payment Instructions
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-medium text-green-800 mb-2">
                      Step 1: Send Money
                    </p>
                    <p className="text-green-700">
                      Go to M-Pesa → Lipa na M-Pesa → Buy Goods and Services
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-blue-800 mb-2">
                      Step 2: Enter Till Number
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Till Number:</span>
                      <span className="font-mono font-bold text-blue-900 text-lg">
                        {tillNumber}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="font-medium text-orange-800 mb-2">
                      Step 3: Enter Amount
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-700">Amount:</span>
                      <span className="font-bold text-orange-900">
                        Ksh {packageInfo.priceValue}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="font-medium text-purple-800 mb-2">
                      Step 4: Get Confirmation
                    </p>
                    <p className="text-purple-700">
                      You'll receive an SMS with a payment code (e.g.,
                      TGS0WJVOZS)
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                I've Made the Payment
              </button>
            </>
          ) : step === 2 ? (
            <>
              {/* Payment Code Entry */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0712345678"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    M-Pesa Payment Code
                  </label>
                  <input
                    type="text"
                    value={paymentCode}
                    onChange={(e) => setPaymentCode(e.target.value)}
                    placeholder="e.g., TGS0WJVOZS"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the payment code from your M-Pesa confirmation SMS
                  </p>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200 flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-800">
                      <p className="font-medium mb-1">Error:</p>
                      <p>{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Please note:</p>
                    <p>
                      Your payment will be verified by our agents within 2-4
                      hours. You'll receive an email confirmation once approved.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={
                      isSubmitting || !paymentCode.trim() || !phoneNumber.trim()
                    }
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Payment"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Success Step */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  Payment Submitted Successfully!
                </h3>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Payment ID:</p>
                  <p className="font-mono font-bold text-gray-900">
                    #{paymentId}
                  </p>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>Your payment proof has been submitted for verification.</p>
                  <p>Our agents will verify your payment within 2-4 hours.</p>
                  <p>You'll receive an email confirmation once approved.</p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const pkg = packageData[packageId];

  const getCurrentUserId = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData.id || 1;
  };

  const handlePaymentSubmit = async (paymentData) => {
    const userId = getCurrentUserId();

    if (!userId) {
      throw new Error("Please log in to make a payment");
    }

    try {
      const result = await submitPackagePayment({
        userId: userId,
        packageId: paymentData.packageId,
        paymentCode: paymentData.paymentCode,
        tillNumber: paymentData.tillNumber,
        phoneNumber: paymentData.phoneNumber,
      });

      return result;
    } catch (error) {
      console.error("Payment submission failed:", error);
      throw error;
    }
  };

  const handleBackClick = () => {
    navigate("/packages");
  };

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Package Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The package you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBackClick}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Packages
        </button>

        {/* Hero Section */}
        <div
          className={`bg-gradient-to-br ${pkg.gradient} rounded-xl p-8 text-white mb-8`}
        >
          <div className="flex items-center mb-4">
            {pkg.icon}
            <h1 className="text-3xl font-bold ml-4">{pkg.name}</h1>
          </div>
          <p className="text-xl opacity-90 mb-6">{pkg.longDescription}</p>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold">{pkg.price}</div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Buy Now
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pkg.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {feature.value}
              </div>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Package Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pkg.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Purchase Package
              </h3>
              <p className="text-sm text-gray-600">
                Complete your payment via M-Pesa and get instant access
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Start Earning
              </h3>
              <p className="text-sm text-gray-600">
                View products daily and earn money for each interaction
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Refer & Grow</h3>
              <p className="text-sm text-gray-600">
                Build your network and earn from referral bonuses
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="bg-gray-900 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
          >
            <CreditCard className="w-6 h-6 mr-3" />
            Get {pkg.name} - {pkg.price}
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Secure payment via M-Pesa • Instant activation • 24/7 support
          </p>
        </div>
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        packageInfo={pkg}
        onPaymentSubmit={handlePaymentSubmit}
      />

      {/* Mobile Navigation */}
      <MobileNavBottom />
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default PackageDetails;
