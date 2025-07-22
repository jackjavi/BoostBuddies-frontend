import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
// import AsideBar from "../components/AsideBar";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLeaderboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { AuthContext } from "../context/AuthContextWrapper";

const Profile = () => {
  const { user, isLoading } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const { disconnect } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-red-500">
          Failed to load profile data.
        </p>
      </div>
    );
  }

  const { name, email, role, profilePicture, dateOfBirth } = user;
  const showCompleteProfileButton = !profilePicture || !dateOfBirth;

  return (
    <div className="bg-indigo-50 overflow-x-hidden min-h-screen lg:h-full ">
      <div className="pt-24 md:pt-32 pb-8 max-w-7xl flex md:gap-8 mx-auto">
        <aside
          className={`sidebar fixed md:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] md:h-auto transform  md:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto px-4 hidden md:block`}
        >
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
              to="/leaderboard"
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
            <Link
              href="#"
              className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <button onClick={disconnect} className="flex w-full items-center">
                <span className="material-icons-outlined mr-2">
                  <MdPowerSettingsNew />
                </span>
                Log out
                <span className="material-icons-outlined ml-auto">
                  <IoIosArrowForward />
                </span>
              </button>
            </Link>
          </div>
        </aside>
        <main className="flex-1 px-4 ">
          <div className="flex-1 mx-auto ">
            <div className="flex flex-col flex-auto   ">
              <h2 className="text-3xl font-semibold hidden lg:block text-gray-800">
                My Profile
              </h2>
              <p className="mt-2 hidden md:block text-bold text-gray-900 text-sm">
                Account details and preferences.
              </p>

              <div className="md:mt-8 bg-white md:rounded-xl shadow-lg p-8 flex flex-1 flex-col md:flex-row gap-12">
                {/* Left Section: Profile Details */}
                <div className="md:flex-1 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="mt-1 text-lg md:text-xl text-indigo-800 font-bold">
                      {name || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="mt-1 text-lg md:text-xl text-indigo-800 font-bold">
                      {email || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Role
                    </label>
                    <p className="mt-1 text-lg md:text-xl text-indigo-800 font-bold">
                      {role || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Date of Birth
                    </label>
                    <p className="mt-1 text-lg md:text-xl text-indigo-800 font-bold">
                      {dateOfBirth || "N/A"}
                    </p>
                  </div>

                  {showCompleteProfileButton && (
                    <div className="mt-6">
                      <p className="text-sm text-red-500 mb-2">
                        Your profile is incomplete. Please complete it for a
                        better experience.
                      </p>
                      <Link
                        to="/profile/add"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <AiOutlineCamera size={20} />
                        Complete Profile
                      </Link>
                    </div>
                  )}
                </div>

                {/* Right Section: Profile Picture */}
                <div className="flex-shrink-0 md:w-48 flex flex-col md:justify-between gap-8 items-center h-full">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                    {profilePicture ? (
                      <img
                        src={
                          profilePicture.includes("githubusercontent.com")
                            ? profilePicture
                            : `${process.env.REACT_APP_BACKEND_URL}/${profilePicture}`
                        }
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                        <CgProfile size={64} />
                      </div>
                    )}
                  </div>
                  {/* Edit Profile */}
                  <Link
                    to="/profile/edit"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg shadow hover:bg-indigo-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <MdEdit size={20} />
                    Edit Profile
                  </Link>

                  {/* Admin Actions */}
                  {isAdmin && (
                    <Link
                      to="/admin/users"
                      className="mt-6 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <BsShieldLock size={20} />
                      Manage Users
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
