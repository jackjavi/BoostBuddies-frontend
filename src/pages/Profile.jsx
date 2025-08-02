import React, { useContext } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Edit3,
  Camera,
  ShieldCheck,
  LogOut,
  AlertCircle,
  CheckCircle,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { AuthContext } from "../context/AuthContextWrapper";
import MobileNavBottom from "../components/MobileNavBottomProfile";

const Profile = () => {
  const { user, isLoading, disconnect } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-red-500">
            Failed to load profile data.
          </p>
        </div>
      </div>
    );
  }

  const { name, email, role, profilePicture, dateOfBirth } = user;
  const showCompleteProfileButton = !profilePicture || !dateOfBirth;
  const profileCompleteness = calculateProfileCompleteness(user);

  function calculateProfileCompleteness(user) {
    const fields = ["name", "email", "profilePicture", "dateOfBirth"];
    const completedFields = fields.filter((field) => user[field]);
    return Math.round((completedFields.length / fields.length) * 100);
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      disconnect();
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 overflow-x-hidden min-h-screen pb-16">
      <div className="py-24 pb-8 max-w-7xl flex md:gap-8 mx-auto">
        <aside className="sidebar fixed md:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] md:h-auto transform md:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto px-4 hidden md:block">
          <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">
                <HiHome />
              </span>
              Dashboard
              <span className="material-icons-outlined ml-auto">
                <IoIosArrowForward />
              </span>
            </Link>
            <Link
              to="/products"
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
            <Link
              to="/payments"
              className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">
                <Wallet />
              </span>
              Payments
              <span className="material-icons-outlined ml-auto">
                <IoIosArrowForward />
              </span>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link
              to="/profile"
              className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">
                <CiFaceSmile />
              </span>
              Profile
              <span className="material-icons-outlined ml-auto">
                <IoIosArrowForward />
              </span>
            </Link>
            <Link
              to="/profile/edit"
              className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">
                <CiSettings />
              </span>
              Settings
              <span className="material-icons-outlined ml-auto">
                <IoIosArrowForward />
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center text-gray-600 hover:text-red-600 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">
                <MdPowerSettingsNew />
              </span>
              Log out
              <span className="material-icons-outlined ml-auto">
                <IoIosArrowForward />
              </span>
            </button>
          </div>
        </aside>

        <main className="flex-1 px-4">
          <div className="flex-1 mx-auto">
            <div className="flex flex-col flex-auto">
              {/* Header Section */}
              {/* <div className="mb-8">
                <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-2">
                  My Profile
                </h1>
                <p className="text-gray-600 text-center">
                  Manage your account details and preferences
                </p>
              </div> */}

              {/* Profile Completeness Banner */}
              {profileCompleteness < 100 && (
                <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-amber-800">
                        Profile {profileCompleteness}% Complete
                      </h3>
                      <p className="text-xs text-amber-700">
                        Complete your profile for better experience
                      </p>
                    </div>
                    <div className="w-16 h-2 bg-amber-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${profileCompleteness}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Profile Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Profile Picture */}
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        {profilePicture ? (
                          <img
                            src={profilePicture}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500">
                            <User size={48} />
                          </div>
                        )}
                      </div>
                      {!profilePicture && (
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="text-center md:text-left text-white">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        {name || "User Name"}
                      </h2>
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        {role === "admin" ? (
                          <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Administrator
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium capitalize">
                              {role}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>Email Address</span>
                      </label>
                      <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {email || "Not provided"}
                      </p>
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Date of Birth</span>
                      </label>
                      <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {dateOfBirth || "Not provided"}
                      </p>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <Shield className="w-4 h-4" />
                        <span>Account Role</span>
                      </label>
                      <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-4 py-3 rounded-lg capitalize">
                        {role || "User"}
                      </p>
                    </div>

                    {/* Profile Status */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <CheckCircle className="w-4 h-4" />
                        <span>Profile Status</span>
                      </label>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${profileCompleteness === 100 ? "bg-green-500" : "bg-amber-500"}`}
                          ></div>
                          <span className="text-lg font-semibold text-gray-900">
                            {profileCompleteness === 100
                              ? "Complete"
                              : `${profileCompleteness}% Complete`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Edit Profile Button */}
                    <Link
                      to="/profile/edit"
                      className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Edit3 className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </Link>

                    {/* Complete Profile Button */}
                    {showCompleteProfileButton && (
                      <Link
                        to="/profile/add"
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <Camera className="w-5 h-5" />
                        <span>Complete Profile</span>
                      </Link>
                    )}

                    {/* Admin Dashboard Button */}
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    {/* Mobile Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="md:hidden flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Log Out</span>
                    </button>
                  </div>

                  {/* Incomplete Profile Warning */}
                  {showCompleteProfileButton && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-semibold text-red-800 mb-1">
                            Incomplete Profile
                          </h3>
                          <p className="text-sm text-red-700">
                            Your profile is missing some important information.
                            Please complete your profile to unlock all features
                            and have a better experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <MobileNavBottom />
      </div>
    </div>
  );
};

export default Profile;
