import React, { useContext, useState } from "react";
import { Boxes, Wallet } from "lucide-react";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { AuthContext } from "../context/AuthContextWrapper";
import { Link } from "react-router-dom";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

const Aside = ({ activeTab = "" }) => {
  const { disconnect } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    disconnect();
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/",
      icon: HiHome,
      section: "main",
    },
    {
      id: "products",
      label: "Products",
      path: "/products",
      icon: AiOutlineProduct,
      section: "main",
    },
    {
      id: "packages",
      label: "Packages",
      path: "/packages",
      icon: Boxes,
      section: "main",
    },
    {
      id: "payments",
      label: "Payments",
      path: "/payments",
      icon: Wallet,
      section: "account",
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: CiFaceSmile,
      section: "account",
    },
  ];

  // Get active link styles
  const getLinkStyles = (itemId) => {
    const isActive = activeTab === itemId;
    return `flex items-center py-4 transition-all duration-300 hover:translate-x-1 ${
      isActive
        ? "text-purple-600 font-semibold rounded-lg px-3 -mx-1"
        : "text-gray-600 hover:text-indigo-800"
    }`;
  };

  // Get icon styles
  const getIconStyles = (itemId) => {
    const isActive = activeTab === itemId;
    return `mr-2 ${isActive ? "text-purple-600" : ""}`;
  };

  // Get arrow styles
  const getArrowStyles = (itemId) => {
    const isActive = activeTab === itemId;
    return `ml-auto transition-transform duration-300 ${
      isActive ? "text-purple-600 transform translate-x-1" : ""
    }`;
  };

  // Render navigation items by section
  const renderNavigationItems = (section) => {
    return navigationItems
      .filter((item) => item.section === section)
      .map((item) => {
        const IconComponent = item.icon;
        return (
          <Link key={item.id} to={item.path} className={getLinkStyles(item.id)}>
            <span className={getIconStyles(item.id)}>
              <IconComponent />
            </span>
            {item.label}
            <span className={getArrowStyles(item.id)}>
              <IoIosArrowForward />
            </span>
          </Link>
        );
      });
  };

  return (
    <>
      <aside className="sidebar fixed md:static w-[240px] h-[calc(100vh-4rem)] md:h-auto transform md:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto px-4 hidden md:block">
        {/* Main Navigation Section */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {renderNavigationItems("main")}
        </div>

        {/* Account & Settings Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {renderNavigationItems("account")}

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="flex w-full items-center text-gray-600 hover:text-red-600 py-4 transition-all duration-300 hover:translate-x-1"
          >
            <span className="mr-2">
              <MdPowerSettingsNew />
            </span>
            Log out
            <span className="ml-auto">
              <IoIosArrowForward />
            </span>
          </button>
        </div>

        {/* Additional Info Card (Optional) */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg mt-6 p-4 text-white">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-sm mb-2">Earning Summary</h3>
            <p className="text-xs opacity-90 mb-3">
              Track your daily progress and referral earnings
            </p>
            <a
              href="/payments"
              className="inline-block bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200"
            >
              View Details
            </a>
          </div>
        </div>
      </aside>

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Aside;
