import React from "react";
import MobileNavBottom from "../components/MobileNavBottomPackages";
import packagesData from "../lib/packagesData";
import { Link } from "react-router-dom";
import {
  Trophy,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const PackagesArray = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-15 animate-bounce"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-8">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-lilita text-gray-900 my-4">
            Choose Your Package
          </h1>
          <p className="text-md md:text-xl text-gray-600 max-w-[75vw] mx-auto leading-relaxed">
            Select the perfect package to maximize your earnings and unlock
            exclusive opportunities
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Instant Activation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">
                Money Back Guarantee
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16 px-4">
          {packagesData.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.popular ? "ring-2 ring-amber-400 scale-105" : ""
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 z-10">
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-center py-2 px-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">MOST POPULAR</span>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
              )}

              {/* Background Pattern */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pkg.bgPattern} opacity-50`}
              ></div>

              {/* Content */}
              <div
                className={`relative z-10 p-8 ${pkg.popular ? "py-16" : "pt-8"}`}
              >
                {/* Package Header */}
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${pkg.iconBg} rounded-2xl mb-4 shadow-lg`}
                  >
                    <div className={pkg.iconColor}>{pkg.icon}</div>
                  </div>

                  <h3 className="text-2xl font-lilita text-gray-900 mb-2">
                    {pkg.name}
                  </h3>

                  {/* Badge */}
                  <div
                    className={`inline-block ${pkg.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold mb-4`}
                  >
                    {pkg.badge}
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-3xl font-bold text-gray-900">
                        KSH {pkg.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Save KSH{" "}
                      {parseInt(pkg.originalPrice.replace(",", "")) -
                        parseInt(pkg.price.replace(",", ""))}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                    What's Included:
                  </h4>
                  <ul className="space-y-3">
                    {pkg.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/packages/${pkg.id}`}
                  className={`group w-full bg-gradient-to-r ${pkg.gradient} text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105`}
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Money Back Guarantee */}
                <p className="text-center text-xs text-gray-500 mt-3">
                  30-day money back guarantee
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-lilita text-gray-900 mb-4">
              Why Choose BoostBuddies?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who are already earning daily through our
              proven platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-lilita text-gray-900 mb-3">
                Daily Earnings
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Earn money every day by viewing products and referring friends
                to grow your income consistently
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-lilita text-gray-900 mb-3">
                Build Network
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Grow your referral network and earn up to 40% bonus share for
                each friend who joins through your unique link
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-lilita text-gray-900 mb-3">
                Premium Access
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get access to exclusive products, priority listings, and higher
                earning opportunities with premium packages
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-md md:text-lg font-medium mb-6 leading-relaxed">
                "BoostBuddies has completely changed my financial situation. I'm
                earning consistently every day and my referral network keeps
                growing."
              </blockquote>
              <div className="text-indigo-200">
                <p className="font-semibold">Joash M.</p>
                <p className="text-sm">Genz Package Member</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavBottom />
    </div>
  );
};

export default PackagesArray;
