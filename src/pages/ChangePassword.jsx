import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { changePassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const { oldPassword, newPassword } = passwordData;
      if (!oldPassword || !newPassword) {
        alert("Please fill in both fields.");
        return;
      }

      await changePassword(oldPassword, newPassword);
      setPasswordData({ oldPassword: "", newPassword: "" });
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-indigo-50">
      <div className="pt-32 max-w-7xl mx-auto flex flex-col px-4 min-h-screen">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Edit Profile
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your account information or change your password below.
        </p>

        {/* Form for changing password */}
        <form className="mt-6 space-y-6" onSubmit={handlePasswordSubmit}>
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="text"
              name="oldPassword"
              id="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="text"
              name="newPassword"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
