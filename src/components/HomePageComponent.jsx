import React, { useState, useEffect } from "react";
import { Share2, Copy } from "lucide-react";
import MobileNavBottom from "./MobileNavBottomDashboard";
import { fetchUserInteractions } from "../api/api2";
import UserInteractions from "./UserInteractions";
import Packages from "../components/PackagesComponent";
import EarningsRedirectCard from "../components/earningsRedirectCard";

const HomePageComponent = ({ user, paymentSummary }) => {
  const [copied, setCopied] = useState(false);
  const [interactions, setInteractions] = useState([]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}/signup?ref=${user.referralCode}`;
    const title = "Join BoostBuddies!";
    const text = "Sign up and earn together 🚀";

    // Check if Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: url,
        })
        .catch((error) => {
          console.log("Error sharing:", error);
          // Fallback to manual sharing if Web Share API fails
          fallbackShare(url, title, text);
        });
    } else {
      // Fallback for browsers that don't support Web Share API
      fallbackShare(url, title, text);
    }
  };

  const fallbackShare = (url, title, text) => {
    // Create a share modal/menu
    const shareOptions = [
      {
        name: "WhatsApp",
        url: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
        color: "#25D366",
      },
      {
        name: "Telegram",
        url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        color: "#0088cc",
      },
      {
        name: "Facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
        color: "#1877f2",
      },
      {
        name: "Twitter",
        url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        color: "#1da1f2",
      },
      {
        name: "LinkedIn",
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        color: "#0077b5",
      },
      {
        name: "Copy Link",
        action: () => {
          navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        },
        color: "#6b7280",
      },
    ];

    // Create and show share modal
    showShareModal(shareOptions);
  };

  const showShareModal = (shareOptions) => {
    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modalOverlay.onclick = () => document.body.removeChild(modalOverlay);

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.className = "bg-white rounded-xl p-6 m-4 max-w-sm w-full";
    modalContent.onclick = (e) => e.stopPropagation();

    // Modal header
    const header = document.createElement("h3");
    header.className = "text-lg font-semibold text-gray-900 mb-4 text-center";
    header.textContent = "Share Your Referral Link";

    // Share options container
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "grid grid-cols-2 gap-3";

    shareOptions.forEach((option) => {
      const button = document.createElement("button");
      button.className =
        "flex flex-col items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors";
      button.style.borderColor = option.color;

      const icon = document.createElement("div");
      icon.className =
        "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-2";
      icon.style.backgroundColor = option.color;
      icon.textContent = option.name.charAt(0);

      const label = document.createElement("span");
      label.className = "text-sm font-medium text-gray-700";
      label.textContent = option.name;

      button.appendChild(icon);
      button.appendChild(label);

      button.onclick = () => {
        if (option.action) {
          option.action();
        } else {
          window.open(option.url, "_blank", "width=600,height=400");
        }
        document.body.removeChild(modalOverlay);
      };

      optionsContainer.appendChild(button);
    });

    // Close button
    const closeButton = document.createElement("button");
    closeButton.className =
      "w-full mt-4 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors";
    closeButton.textContent = "Cancel";
    closeButton.onclick = () => document.body.removeChild(modalOverlay);

    modalContent.appendChild(header);
    modalContent.appendChild(optionsContainer);
    modalContent.appendChild(closeButton);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserInteractions(user.id).then(setInteractions);
    }
  }, [user?.id]);

  return (
    <div className="">
      {/* Main Content */}
      <main className=" mx-auto ">
        <div className="pt-6">
          <p className="text-gray-600 text-center text-xl font-lilita max-w-[75vw] mx-auto">
            Track your earnings and grow your network
          </p>
        </div>

        {/* Earnings Redirect Card */}
        <EarningsRedirectCard paymentSummary={paymentSummary} />

        {/* Earnings Summary Section */}

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl py-6 px-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100 text-sm font-medium">
                Registration Earnings
              </span>
              <Milestone className="w-5 h-5 text-green-200" />
            </div>
            {paymentSummary ? (
              <div className="text-xl font-bold">
                Ksh{" "}
                {new Intl.NumberFormat("en-KE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(paymentSummary?.payments?.registration?.amount)}
              </div>
            ) : (
              <Spinner />
            )}
          </div>


          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl py-6 px-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100 text-sm font-medium">
                Referral Earnings
              </span>
              <Users className="w-5 h-5 text-blue-200" />
            </div>
            {paymentSummary ? (
              <div className="text-xl font-bold">
                Ksh{" "}
                {new Intl.NumberFormat("en-KE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(paymentSummary.payments?.referrals?.amount)}
              </div>
            ) : (
              <Spinner />
            )}
          </div>

       
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl py-6 px-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100 text-sm font-medium">
                View Earnings
              </span>
              <Eye className="w-5 h-5 text-green-200" />
            </div>
            {paymentSummary ? (
              <div className="text-xl font-bold">
                Ksh{" "}
                {new Intl.NumberFormat("en-KE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(paymentSummary?.payments?.views?.amount)}
              </div>
            ) : (
              <Spinner />
            )}
          </div>

       
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl py-6 px-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-100 text-sm font-medium">
                Total Earnings
              </span>
              <TrendingUp className="w-5 h-5 text-purple-200" />
            </div>
            {paymentSummary ? (
              <div className="text-xl font-bold">
                Ksh{" "}
                {new Intl.NumberFormat("en-KE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(paymentSummary.payments.totalAmount)}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Your Referral Link */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <Share2 className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl text-center font-lilita text-gray-900">
                  Your Referral Link
                </h2>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your referral code:
                </label>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-50 border rounded-lg px-3 py-2 text-gray-900 font-mono text-sm flex-1">
                    {user.referralCode}
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copied && (
                    <span className="text-sm text-green-600 ml-2">Copied!</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleShareLink}
                  className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Link</span>
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                Earn up to 40% bonus share for each friend who signs up using
                your link!
              </p>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-lilita text-gray-900 mb-6">
                Performance Overview
              </h2>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {paymentSummary?.payments?.referrals?.count}
                  </div>
                  <div className="text-gray-600">Total Referrals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {paymentSummary?.payments?.views?.count}
                  </div>
                  <div className="text-gray-600">Products Viewed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl text-center  text-gray-900 mb-6 font-lilita">
              Recent Activity
            </h2>

            <UserInteractions interactions={interactions} />
          </div>
        </div>
        {/* Packages Section */}
        <Packages />
      </main>

      {/* Mobile Navigation */}
      <MobileNavBottom />
    </div>
  );
};

export default HomePageComponent;
