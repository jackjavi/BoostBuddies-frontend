import React from "react";
import { Trophy, Zap, Users, TrendingUp } from "lucide-react";
import MobileNavBottom from "./MobileNavBottomPackages";
import { Link } from "react-router-dom";

const packages = [
  {
    id: "genz",
    name: "Genz Package",
    price: "Ksh 1500",
    description:
      "This is the top-tier package for the go-getters. Genz users enjoy access to premium, high-earning products and featured listings daily. With the highest daily view limits, early access to new products, and boosted referral earnings, Genz is for those playing to win.",
    benefits: [
      "View up to 15 products daily",
      "Earn from high-paying, priority products",
      "Access to featured & exclusive offers",
      "Top-tier referral bonuses",
      "Priority in chain payouts",
    ],
    gradient: "from-purple-500 to-purple-600",
    icon: <Zap className="w-6 h-6 text-purple-200" />,
  },
  {
    id: "mbogi",
    name: "Mbogi Package",
    price: "Ksh 1000",
    description:
      "For the squad that hustles together. Mbogi gives you more firepower with boosted earnings and the ability to view more products daily. Great for building your network and maximizing daily gains.",
    benefits: [
      "View up to 10 products daily",
      "Eligible for higher-paying listings",
      "Better position in referral chain",
      "Daily rotation advantage",
    ],
    gradient: "from-gray-500 to-gray-600",
    icon: <Users className="w-6 h-6 text-gray-200" />,
  },
  {
    id: "baller",
    name: "Baller Package",
    price: "Ksh 750",
    description:
      "Step up your game. Baller users get daily earning opportunities from multiple listings and a boost in chain earnings. Ideal for those testing the waters before going full throttle.",
    benefits: [
      "View up to 7 products daily",
      "Access to medium-tier rewards",
      "Referrals earn you more",
      "Basic featured listing access",
    ],
    gradient: "from-orange-500 to-orange-600",
    icon: <TrendingUp className="w-6 h-6 text-orange-200" />,
  },
  {
    id: "comrade",
    name: "Comrade Package",
    price: "Ksh 500",
    description:
      "Just getting started? Comrade is your starter pack. You'll get daily view earnings and a chance to build your chain. Great for students or beginners trying out the system.",
    benefits: [
      "View up to 4 products daily",
      "Entry-level earnings",
      "Join referral chain",
      "Upgrade anytime",
    ],
    gradient: "from-green-500 to-green-600",
    icon: <Trophy className="w-6 h-6 text-green-200" />,
  },
];

const Packages = () => {
  return (
    <div className="min-h-screen mt-8 ">
      <main className="mx-auto">
        <div className="py-4">
          <h1 className="text-xl text-center font-lilita text-gray-900">
            Choose Your Package
          </h1>
          <p className="text-gray-600 text-center max-w-[75vw] mx-auto">
            Select the perfect package to maximize your earnings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-gradient-to-br ${pkg.gradient} rounded-xl p-6 text-white shadow-sm flex flex-col h-full`}
            >
              {/* Header with icon and price */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {pkg.icon}
                  <span className="text-white text-sm font-medium opacity-90">
                    {pkg.name}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold mb-4">{pkg.price}</div>

              {/* Description */}
              <p className="text-sm text-white opacity-90 mb-4 leading-relaxed">
                {pkg.description}
              </p>

              {/* Benefits */}
              <div className="mb-6 flex-grow">
                <h3 className="text-sm font-semibold mb-2 text-white opacity-95">
                  Package Benefits:
                </h3>
                <ul className="space-y-1">
                  {pkg.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="text-xs text-white opacity-90 flex items-start"
                    >
                      <span className="mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button - Updated to use Link */}
              <Link
                to={`/packages/${pkg.id}`}
                className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg font-monumentBold hover:bg-gray-100 transition-colors text-sm mt-auto text-center block"
              >
                Make Payment
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl text-center font-lilita text-gray-900 mb-4">
            Why Choose BoostBuddies?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Daily Earnings
              </h3>
              <p className="text-sm text-gray-600">
                Earn money every day by viewing products and referring friends
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Build Network
              </h3>
              <p className="text-sm text-gray-600">
                Grow your referral network and earn from your connections
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Premium Access
              </h3>
              <p className="text-sm text-gray-600">
                Get access to exclusive products and higher earning
                opportunities
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavBottom />
    </div>
  );
};

export default Packages;
