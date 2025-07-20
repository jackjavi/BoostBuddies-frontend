import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import AsideBar from "../components/AsideBar";
import { AuthContext } from "../context/AuthContextWrapper";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isLoading } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

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
    <div className="bg-indigo-50 min-h-screen md:h-full flex ">
      <div className="md:pt-24 pt-24 pb-8 max-w-7xl flex md:gap-8 mx-auto md:px-16">
        <AsideBar />
        <main className="flex-1 px-4 max-w-4xl w-full">
          <div className="flex flex-col flex-auto  md:px-12 ">
            <h2 className="text-3xl font-semibold hidden md:block text-gray-800">
              My Profile
            </h2>
            <p className="mt-2 hidden md:block text-gray-500 text-sm">
              Account details and preferences.
            </p>

            <div className="md:mt-8 bg-white min-h-screen md:h-full rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-12">
              {/* Left Section: Profile Details */}
              <div className="md:flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="mt-1 text-lg md:text-xl text-gray-800 font-bold">
                    {name || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="mt-1 text-lg md:text-xl text-gray-800 font-bold">
                    {email || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Role
                  </label>
                  <p className="mt-1 text-lg md:text-xl text-gray-800 font-bold">
                    {role || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Date of Birth
                  </label>
                  <p className="mt-1 text-lg md:text-xl text-gray-800 font-bold">
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
              <div className="flex-shrink-0 md:w-48 flex flex-col md:justify-between gap-8 md:gap-0 items-center">
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
        </main>
      </div>
    </div>
  );
};

export default Profile;
