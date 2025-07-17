import React, { useContext, useEffect } from "react";
import { LogsContext } from "../context/LogsContextWrapper";
import { AuthContext } from "../context/AuthContextWrapper";
import { UsersContext } from "../context/UsersContextWrapper";
// import LastCard from "./LastCard";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductsComponent from "../components/ProductsComponent";

const Dashboard = () => {
  const { retrieveLogs } = useContext(LogsContext);
  const { disconnect, user } = useContext(AuthContext);
  const { fetchUsers } = useContext(UsersContext);

  useEffect(() => {
    fetchUsers();
    retrieveLogs();
  }, [fetchUsers, retrieveLogs]);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden  md:pt-16 pt-8">
      <div className="pt-16 max-w-7xl mx-auto flex">
        <aside
          className={`sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform  lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4 hidden md:block`}
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
              to={user.role === "admin" ? "/admin/users" : "#"}
              className={`flex items-center text-gray-600 ${
                user.role === "admin"
                  ? "hover:text-indigo-800"
                  : "cursor-not-allowed opacity-50"
              } py-4 transition-all duration-300 ${
                user.role === "admin" ? "hover:translate-x-1" : ""
              }`}
            >
              <span className="material-icons-outlined mr-2">
                <MdAdminPanelSettings />
              </span>
              Admin Panel
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

        <main className="flex-1 p-4">
          {/* <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl text-blue-900 flex gap-2 flex-col">
                <span>
                  Welcome <br />
                </span>
                <span>
                  <strong>{user.name}</strong>
                </span>
              </h2>
            </div>

            <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl text-blue-900">
                Total Logs <br />
                <strong>{totalLogs}</strong>
              </h2>
              <Link
                to="/logs"
                className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105"
              >
                See logs
              </Link>
            </div>
          </div> */}

          <ProductsComponent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
