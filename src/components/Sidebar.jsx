import React from "react";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { Package, Wallet } from "lucide-react";

const Sidebar = ({
  mobileMenuOpen,
  toggleMobileMenu,
  user,
  setMobileMenuOpen,
}) => {
  return (
    <aside
      className={`fixed top-0 left-0 w-[240px] h-full bg-indigo-50 transform ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50 mt-20 shadow-lg`}
    >
      <div className="p-4">
        <button
          className="text-gray-500 hover:text-indigo-800 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          <FaWindowClose className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
          >
            <HiHome className="mr-2 w-5 h-5" />
            Dashboard
            <IoIosArrowForward className="ml-auto w-4 h-4" />
          </Link>

          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
          >
            <AiOutlineProduct className="mr-2 w-5 h-5" />
            Products
            <IoIosArrowForward className="ml-auto w-4 h-4" />
          </Link>

          <Link
            to="/packages"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
          >
            <Package className="mr-2 w-5 h-5" />
            Packages
            <IoIosArrowForward className="ml-auto w-4 h-4" />
          </Link>

          <Link
            to="/payments"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
          >
            <Wallet className="mr-2 w-5 h-5" />
            Payments
            <IoIosArrowForward className="ml-auto w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
          >
            <CiFaceSmile className="mr-2 w-5 h-5" />
            Profile
            <IoIosArrowForward className="ml-auto w-4 h-4" />
          </Link>

          <Link
            to="/profile/edit"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
          >
            <CiSettings className="mr-2 w-5 h-5" />
            Settings
            <IoIosArrowForward className="ml-auto w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* User Info Footer */}
      {user && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-3 text-white text-center">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs opacity-80 capitalize">{user.role}</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
