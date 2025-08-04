import React from "react";
import { Trophy, Users, TrendingUp, Star, ArrowRight, Zap } from "lucide-react";
import MobileNavBottom from "./MobileNavBottomPackages";
import { Link } from "react-router-dom";
import packagesData from "../lib/packagesData";

const Packages = () => {
  // Get the most popular package and top 4 packages for summary
  const popularPackage = packagesData.find((pkg) => pkg.popular);
  const topPackages = packagesData.slice(0, 4); // Show top 4 packages

  return (
    <div className="min-h-screen">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-10 animate-bounce"></div>
      </div>

      <main className="relative z-10 mx-auto px-4">
        {/* Header Section - Compact */}
        <div className="py-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Zap className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-lilita text-gray-900">
              Choose Your Package
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Select the perfect package to maximize your earnings
          </p>
        </div>

        {/* Featured Package Highlight - Compact */}
        {popularPackage && (
          <div className="mb-8">
            <div className="relative bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 opacity-20"></div>

              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-sm rounded-bl-xl px-3 py-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current text-white" />
                  <span className="text-xs font-bold">MOST POPULAR</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      {popularPackage.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-lilita">
                        {popularPackage.name}
                      </h3>
                      <p className="text-xs opacity-90">Most chosen by users</p>
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-2xl font-bold">
                      KSH {popularPackage.price}
                    </span>
                    <span className="text-sm opacity-70 line-through">
                      {popularPackage.originalPrice}
                    </span>
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">
                    {popularPackage.description.length > 80
                      ? popularPackage.description.substring(0, 80) + "..."
                      : popularPackage.description}
                  </p>
                </div>
                <Link
                  to={`/packages/${popularPackage.id}`}
                  className="ml-4 bg-white text-amber-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors flex items-center space-x-1 group"
                >
                  <span>Get Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Packages Grid - Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {topPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border"
            >
              {/* Background Pattern */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pkg.bgPattern} opacity-30`}
              ></div>

              <div className="relative z-10 p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`${pkg.iconBg} p-2 rounded-lg`}>
                      <div className={`${pkg.iconColor} scale-75`}>
                        {pkg.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-lilita text-gray-900 text-sm">
                        {pkg.name}
                      </h3>
                      <span
                        className={`inline-block ${pkg.badgeColor} text-white text-xs px-2 py-0.5 rounded-full`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl font-bold text-gray-900">
                      KSH {pkg.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {pkg.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Key Benefits - Show only first 3 */}
                <ul className="space-y-1 mb-4">
                  {pkg.benefits.slice(0, 3).map((benefit, index) => (
                    <li
                      key={index}
                      className="text-xs text-gray-600 flex items-start"
                    >
                      <span className="text-green-500 mr-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                  {pkg.benefits.length > 3 && (
                    <li className="text-xs text-gray-500 italic">
                      +{pkg.benefits.length - 3} more benefits
                    </li>
                  )}
                </ul>

                {/* CTA Button */}
                <Link
                  to={`/packages/${pkg.id}`}
                  className={`group w-full bg-gradient-to-r ${pkg.gradient} text-white px-4 py-2 rounded-lg font-bold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1 transform hover:scale-105`}
                >
                  <span>Choose Plan</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Section - Compact */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Daily Earnings
              </h3>
              <p className="text-xs text-gray-600">View products & earn</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Build Network
              </h3>
              <p className="text-xs text-gray-600">Refer friends & grow</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Premium Access
              </h3>
              <p className="text-xs text-gray-600">Exclusive products</p>
            </div>
          </div>
        </div>

        {/* View All Packages Link */}
        <div className="text-center">
          <Link
            to="/packages"
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors group"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-xs text-gray-500 mt-2">
            Compare all packages and find your perfect match
          </p>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavBottom />
    </div>
  );
};

export default Packages;
