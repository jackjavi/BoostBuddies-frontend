import React from "react";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLeaderboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";

const Sidebar = ({
  mobileMenuOpen,
  toggleMobileMenu,
  disconnect,
  user,
  setMobileMenuOpen,
}) => {
  const isAdmin = user && user.role === "admin";
  return (
    <aside
      className={`fixed top-0 left-0 w-[240px] h-full bg-indigo-50 transform ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50 mt-20 shadow-lg`}
    >
      <div className="p-4">
        <button
          className="text-gray-500 hover:text-indigo-800 transition-transform duration-300"
          onClick={toggleMobileMenu}
        >
          <span className="material-icons-outlined">
            <FaWindowClose />
          </span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <HiHome className="mr-2" />
          Dashboard
          <IoIosArrowForward className="ml-auto" />
        </Link>
        <Link
          to="/products"
          onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        >
          <span className="material-icons-outlined mr-2">
            <AiOutlineProduct />
          </span>
          Products
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link>
        {/* <Link
          to={isAdmin ? "/admin/users" : "#"}
          onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
          className={`flex items-center text-gray-600 ${
            isAdmin ? "hover:text-indigo-800" : "cursor-not-allowed opacity-50"
          } py-4 transition-all duration-300 ${
            isAdmin ? "hover:translate-x-1" : ""
          }`}
        >
          <span className="material-icons-outlined mr-2">
            <MdAdminPanelSettings />
          </span>
          Admin Panel
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link> */}
        <Link
          to="/leaderboard"
          onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        >
          <span className="material-icons-outlined mr-2">
            <MdOutlineLeaderboard />
          </span>
          Leaderboard
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-4">
        <Link
          to="/profile"
          onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <span className="material-icons-outlined mr-2">
            <CiFaceSmile />
          </span>
          Profile
          <IoIosArrowForward className="ml-auto" />
        </Link>
        <Link
          to="/profile/edit"
          onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <span className="material-icons-outlined mr-2">
            <CiSettings />
          </span>
          Settings
          <IoIosArrowForward className="ml-auto" />
        </Link>
        <Link
          href="#"
          onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <button onClick={disconnect} className="flex w-full items-center">
            <MdPowerSettingsNew className="mr-2" />
            Log out
            <IoIosArrowForward className="ml-auto" />
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
