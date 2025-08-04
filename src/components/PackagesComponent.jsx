import React from "react";
import { Trophy, Zap, Users, TrendingUp } from "lucide-react";
import MobileNavBottom from "./MobileNavBottomPackages";
import { Link } from "react-router-dom";

const packages = [
  {
    id: 1,
    name: "Genz Package",
    price: "Ksh 1500",
    description:
      "The ultimate package for serious earners. Genz users get the highest daily view limits, priority access to all products, and exclusive featured listings. Perfect for maximizing your daily earnings potential.",
    benefits: [
      "View up to 8 products daily",
      "Priority access to all products",
      "Access to featured & exclusive offers",
      "Access to highest priority products (priority 0+)",
      "Ksh 100 registration bonus",
    ],
    gradient: "from-yellow-400 to-yellow-500",
    icon: <Zap className="w-6 h-6 text-yellow-200" />,
  },
  {
    id: 2,
    name: "Mbogi Package",
    price: "Ksh 1000",
    description:
      "For the squad that hustles smart. Mbogi gives you solid daily earning opportunities with priority access and featured listings. Great balance of features and value.",
    benefits: [
      "View up to 6 products daily",
      "Priority access to products",
      "Access to featured listings",
      "Access to priority 1+ products",
      "Ksh 100 registration bonus",
    ],
    gradient: "from-gray-500 to-gray-600",
    icon: <Users className="w-6 h-6 text-gray-200" />,
  },
  {
    id: 3,
    name: "Baller Package",
    price: "Ksh 750",
    description:
      "Step up your earnings game. Baller users get priority access to products with decent daily view limits. Perfect for consistent daily income without the premium cost.",
    benefits: [
      "View up to 4 products daily",
      "Priority access to products",
      "Access to priority 2+ products",
      "Ksh 100 registration bonus",
      "Upgrade anytime",
    ],
    gradient: "from-orange-500 to-orange-600",
    icon: <TrendingUp className="w-6 h-6 text-orange-200" />,
  },
  {
    id: 4,
    name: "Comrade Package",
    price: "Ksh 500",
    description:
      "Your entry point to consistent earnings. Comrade gives you reliable daily views with access to standard products. Perfect for beginners or those testing the platform.",
    benefits: [
      "View up to 3 products daily",
      "Access to priority 3+ products",
      "Ksh 100 registration bonus",
      "Perfect starter package",
      "Upgrade anytime",
    ],
    gradient: "from-purple-500 to-purple-600",
    icon: <Trophy className="w-6 h-6 text-purple-200" />,
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
