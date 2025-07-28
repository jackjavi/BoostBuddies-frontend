import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { editProfile } from "../api/api2";
import { useNavigate, Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLeaderboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";

const EditProfile = () => {
  const { disconnect } = useContext(AuthContext);
  const { user, authenticateUser } = useContext(AuthContext);
  const id = user.id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: user.id,
    name: user?.name || "",
    email: user?.email || "",
    dateOfBirth: user?.dateOfBirth || "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", formData.userId);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("file", formData.profilePicture);

    try {
      await editProfile(data);
      await authenticateUser();

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Your account has been deleted successfully.");
        navigate("/signup");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete the profile.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert(
        "An error occurred while deleting your profile. Please try again later."
      );
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden  md:pt-16 pt-8">
      <div className="pt-16 max-w-7xl mx-auto flex">
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
              Home
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
        <main className="mx-auto flex-1 flex-col px-4 h-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
            <div className="flex-1 flex justify-between ">
              <div className="flex flex-col  ">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Edit Profile
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your account information below.
                </p>
              </div>
              <div>
                <Link to="/profile/change-password">
                  <button className="inline-flex  justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                    Change Password
                  </button>
                </Link>
              </div>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 text-md  text-indigo-800"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 text-md text-indigo-800"
                />
              </div>

              {user.profilePIcture ||
                (user.dateOfBirth && (
                  /* Date of Birth */
                  <>
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm text-indigo-800"
                      />
                    </div>

                    {/* Profile Picture */}
                    <div>
                      <label
                        htmlFor="profilePicture"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:text-indigo-800 file:font-semibold file:bg-sky-100 hover:file:bg-sky-200"
                      />
                      {formData.profilePicture &&
                        typeof formData.profilePicture === "string" && (
                          <img
                            src={formData.profilePicture}
                            alt="Profile"
                            className="mt-2 h-20 w-20 rounded-full"
                          />
                        )}
                    </div>
                  </>
                ))}

              <div className="flex items-center justify-between ">
                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex  justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
                {/* Delete Profile Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={deleteUser}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
