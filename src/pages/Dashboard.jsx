import React, { useContext, useEffect, useState } from "react";
import { LogsContext } from "../context/LogsContextWrapper";
import { AuthContext } from "../context/AuthContextWrapper";
import { UsersContext } from "../context/UsersContextWrapper";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import HomePageComponent from "../components/HomePageComponent";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineLeaderboard } from "react-icons/md";
import { fetchUserPaymentSummary } from "../api/api2";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { retrieveLogs } = useContext(LogsContext);
  const { disconnect, user } = useContext(AuthContext);
  const { fetchUsers } = useContext(UsersContext);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    fetchUsers();
    retrieveLogs();
    // Fetch payment summary
    const loadPaymentSummary = async () => {
      try {
        const data = await fetchUserPaymentSummary(user.id);
        setPaymentSummary(data.user);
      } catch (err) {
        console.error("Failed to load payment summary:", err);
      }
    };

    if (user?.id) {
      loadPaymentSummary();
    }
  }, [fetchUsers, retrieveLogs, user]);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden  pt-16 md:pt-32">
      <div className=" max-w-7xl mx-auto flex">
        <aside
          className={`sidebar fixed md:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] md:h-auto transform  md:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4 hidden md:block`}
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

        <main className="flex-1 p-4">
          <div className=" flex-1 flex-col">
            <div className="flex flex-col lg:flex-row gap-4 mb-6  mx-auto">
              <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
                <h2 className="text-2xl lg:text-3xl text-blue-900 flex gap-2 flex-col ">
                  <span>
                    Welcome <br />
                  </span>
                  <span>
                    <strong>{user.name}</strong>
                  </span>
                </h2>
              </div>

              <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
                <h2 className="text-2xl lg:text-3xl text-blue-900">
                  Global Rank <br />
                  {paymentSummary ? (
                    <strong>{paymentSummary.globalRank}</strong>
                  ) : (
                    <Spinner />
                  )}
                </h2>
                <Link
                  to="/leaderboard"
                  className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105"
                >
                  See your stats
                </Link>
              </div>
            </div>

            <HomePageComponent user={user} paymentSummary={paymentSummary} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
