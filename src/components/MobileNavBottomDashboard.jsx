import React from "react";
import { Home, Package, BarChart3, User } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNavBottom = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-4 py-2">
        <Link
          to="/"
          className="flex flex-col items-center py-2 text-purple-600"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link
          to="/products"
          className="flex flex-col items-center py-2 text-gray-600"
        >
          <Package className="w-5 h-5" />
          <span className="text-xs mt-1">Products</span>
        </Link>
        <Link
          to="/leaderboard"
          className="flex flex-col items-center py-2 text-gray-600"
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-xs mt-1">Leaderboard</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center py-2 text-gray-600"
        >
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavBottom;
