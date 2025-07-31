import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center pt-20">
      <div className="max-w-2xl w-full mx-4 text-center">
        {/* 404 Animation/Illustration */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl p-8 shadow-lg border">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-lilita">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            The page you're looking for seems to have wandered off into the
            digital wilderness. Don't worry, it happens to the best of us!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Looking for something specific? Try these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
              >
                Products
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/packages"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
              >
                Packages
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/leaderboard"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
              >
                Leaderboard
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/profile"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Error Code: 404 • Page Not Found</p>
          <p className="mt-1">
            "Not all those who wander are lost, but this page definitely is." 🧭
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
