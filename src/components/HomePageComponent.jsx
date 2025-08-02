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
    const url = `${window.location.origin}/register?ref=${user.referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: "Join BoostBuddies!",
        text: "Sign up and earn together 🚀",
        url,
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserInteractions(user.id).then(setInteractions);
    }
  }, [user?.id]);

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className=" mx-auto ">
        <div className="p-6">
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
                Earn 150 KSH for each friend who signs up using your link!
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
