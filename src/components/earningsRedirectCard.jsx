import React from "react";
import { Wallet, Eye, ArrowRight, Lock } from "lucide-react";

const EarningsRedirectCard = ({ paymentSummary }) => {
  const handleRedirectToPayments = () => {
    window.location.href = "/payments";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-4 my-12 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Wallet className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Your Earnings
            </h3>
            <p className="text-sm text-gray-600">
              View detailed payment summary
            </p>
          </div>
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Lock className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Summary Stats (without showing actual amounts) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Referrals</span>
            <Eye className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-lg font-bold text-gray-400">••••</p>
          <p className="text-xs text-gray-500">
            {paymentSummary?.payments?.referrals?.count || 0} earned
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Views</span>
            <Eye className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-lg font-bold text-gray-400">••••</p>
          <p className="text-xs text-gray-500">
            {paymentSummary?.payments?.views?.count || 0} earned
          </p>
        </div>
      </div>

      {/* Pending Bonuses Alert */}
      {paymentSummary?.payments?.pendingBonuses?.count > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-orange-800">
              {paymentSummary.payments.pendingBonuses.count} pending bonus
              {paymentSummary.payments.pendingBonuses.count !== 1 ? "es" : ""}
            </span>
          </div>
          <p className="text-xs text-orange-700 mt-1">
            Unlock by purchasing a package
          </p>
        </div>
      )}

      {/* Call to Action */}
      <button
        onClick={handleRedirectToPayments}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-4 flex items-center justify-between hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
      >
        <div className="text-left">
          <p className="font-semibold">View Full Payment Details</p>
          <p className="text-sm text-indigo-100">
            See earnings, transactions & more
          </p>
        </div>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Features Preview */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="py-2">
          <p className="text-xs text-gray-600">Earnings</p>
          <p className="text-xs text-gray-500">History</p>
        </div>
        <div className="py-2">
          <p className="text-xs text-gray-600">Chain</p>
          <p className="text-xs text-gray-500">Members</p>
        </div>
        <div className="py-2">
          <p className="text-xs text-gray-600">Analytics</p>
          <p className="text-xs text-gray-500">Charts</p>
        </div>
      </div>
    </div>
  );
};

export default EarningsRedirectCard;
