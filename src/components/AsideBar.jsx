import React, { useContext } from "react";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextWrapper";
import { Wallet } from "lucide-react";

const AsideBar = () => {
  const { disconnect } = useContext(AuthContext);
  return (
    <aside
      className={`sidebar fixed md:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] md:h-auto transform  md:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto px-4 hidden md:block`}
    >
      <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <HiHome className="mr-2" />
          Dashboard
          <IoIosArrowForward className="ml-auto" />
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
        <Link
          href=""
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
  );
};

export default AsideBar;
