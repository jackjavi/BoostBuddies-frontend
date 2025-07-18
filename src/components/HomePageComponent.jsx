import React from "react";
import { TrendingUp, Users, Eye, Trophy, Share2, Copy } from "lucide-react";
import MobileNavBottom from "./MobileNavBottomDashboard";

const HomePageComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John Doe! 👋
          </h1> */}
          <p className="text-gray-600">
            Track your earnings and grow your network
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Earnings */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-100 text-sm font-medium">
                Total Earnings
              </span>
              <TrendingUp className="w-5 h-5 text-purple-200" />
            </div>
            <div className="text-2xl font-bold">Ksh 2450</div>
          </div>

          {/* Referral Earnings */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100 text-sm font-medium">
                Referral Earnings
              </span>
              <Users className="w-5 h-5 text-blue-200" />
            </div>
            <div className="text-2xl font-bold">Ksh 1800</div>
          </div>

          {/* View Earnings */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100 text-sm font-medium">
                View Earnings
              </span>
              <Eye className="w-5 h-5 text-green-200" />
            </div>
            <div className="text-2xl font-bold">Ksh 650</div>
          </div>

          {/* Global Rank */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-100 text-sm font-medium">
                Global Rank
              </span>
              <Trophy className="w-5 h-5 text-orange-200" />
            </div>
            <div className="text-2xl font-bold">#3</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Your Referral Link */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <Share2 className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Referral Link
                </h2>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your referral code:
                </label>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-50 border rounded-lg px-3 py-2 text-gray-900 font-mono text-sm flex-1">
                    REF123ABC
                  </div>
                  <button className="p-2 text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share Link</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                Earn $50 for each friend who signs up using your link!
              </p>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Performance Overview
              </h2>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    12
                  </div>
                  <div className="text-gray-600">Total Referrals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    324
                  </div>
                  <div className="text-gray-600">Products Viewed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      New user signed up
                    </div>
                    <div className="text-sm text-gray-600">2 hours ago</div>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">+$50</div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Product viewed: iPhone 15
                    </div>
                    <div className="text-sm text-gray-600">5 hours ago</div>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">+$2</div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      New user signed up
                    </div>
                    <div className="text-sm text-gray-600">1 day ago</div>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">+$50</div>
              </div>

              {/* Activity Item 4 */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Product viewed: MacBook Pro
                    </div>
                    <div className="text-sm text-gray-600">1 day ago</div>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">+$2</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavBottom />

      {/* Mobile bottom padding to account for fixed nav */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default HomePageComponent;
