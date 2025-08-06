import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Users, TrendingUp } from "lucide-react";
import BoostBuddiesLogo from "./BoostBuddiesLogo";

const Header = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm text-indigo-800   z-50 shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center h-16 md:h-20 justify-between">
        {/* Logo - now takes full left space on mobile */}
        <div className="flex-shrink-0">
          <Link to="/" className="block">
            <BoostBuddiesLogo size="small" />
          </Link>
        </div>

        {/* Right side content */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            {/* Desktop Navigation Links */}
            <Link
              to="/packages"
              className="hidden md:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Packages</span>
            </Link>

            <Link
              to="/profile/edit"
              className="hidden md:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              <Users className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            {/* Profile Picture/Icon */}
            <Link to="/profile" className="relative group">
              {user.profilePicture ? (
                <div className="relative">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition-all duration-200 object-cover shadow-sm"
                  />
                  {/* Online indicator */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition-all duration-200 flex items-center justify-center shadow-sm">
                  <CgProfile className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              )}
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 items-center text-sm md:text-base">
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
