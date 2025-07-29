import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { UsersContext } from "../context/UsersContextWrapper";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { User, Trophy, Star, Crown } from "lucide-react";
import HomePageComponent from "../components/HomePageComponent";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineLeaderboard } from "react-icons/md";
import { fetchUserPaymentSummary } from "../api/api2";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { disconnect, user } = useContext(AuthContext);
  const { fetchUsers } = useContext(UsersContext);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    fetchUsers();
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
  }, [fetchUsers, user]);

  // Get rank icon and styling based on global rank
  const getRankInfo = (rank) => {
    if (rank <= 3) {
      return {
        icon: <Crown className="w-8 h-8 text-yellow-500" />,
        gradient: "from-yellow-400 to-amber-500",
        textColor: "text-yellow-800",
        bgColor: "bg-gradient-to-br",
        description: "Elite Performer",
      };
    } else if (rank <= 10) {
      return {
        icon: <Trophy className="w-8 h-8 text-orange-500" />,
        gradient: "from-orange-400 to-red-500",
        textColor: "text-orange-800",
        bgColor: "bg-gradient-to-br",
        description: "Top Performer",
      };
    } else if (rank <= 50) {
      return {
        icon: <Star className="w-8 h-8 text-blue-500" />,
        gradient: "from-blue-400 to-indigo-500",
        textColor: "text-blue-800",
        bgColor: "bg-gradient-to-br",
        description: "Rising Star",
      };
    } else {
      return {
        icon: <User className="w-8 h-8 text-gray-500" />,
        gradient: "from-gray-400 to-gray-500",
        textColor: "text-gray-800",
        bgColor: "bg-gradient-to-br",
        description: "Keep Growing",
      };
    }
  };

  const rankInfo = paymentSummary
    ? getRankInfo(paymentSummary.globalRank)
    : null;

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden py-24">
      <div className="max-w-7xl mx-auto flex">
        <aside
          className={`sidebar fixed md:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] md:h-auto transform md:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4 hidden md:block`}
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
          <div className="flex-1 flex-col">
            <div className="flex flex-col lg:flex-row gap-6 mb-8 mx-auto">
              {/* Welcome Card */}
              <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white bg-opacity-40 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-white bg-opacity-60 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white bg-opacity-80 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white text-opacity-90 mb-2">
                    Welcome Back
                  </h3>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {user.name}
                  </h2>
                  <p className="text-sm text-white text-opacity-80">
                    Ready to boost your earnings today?
                  </p>
                </div>
              </div>

              {/* Global Rank Card */}
              <div
                className={`flex-1 ${rankInfo ? `${rankInfo.bgColor} ${rankInfo.gradient}` : "bg-gradient-to-br from-gray-400 to-gray-500"} rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    {rankInfo ? (
                      rankInfo.icon
                    ) : (
                      <Trophy className="w-6 h-6 text-white" />
                    )}
                  </div>
                  {paymentSummary && paymentSummary.globalRank <= 10 && (
                    <div className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
                      <span className="text-xs font-semibold text-white">
                        TOP {paymentSummary.globalRank <= 3 ? "3" : "10"}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white text-opacity-90 mb-2">
                    Global Rank
                  </h3>
                  <div className="flex items-baseline space-x-2 mb-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {paymentSummary ? (
                        `#${paymentSummary.globalRank}`
                      ) : (
                        <div className="flex items-center">
                          <Spinner />
                        </div>
                      )}
                    </h2>
                    {paymentSummary && paymentSummary.globalRank <= 50 && (
                      <div className="flex">
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-white text-opacity-80">
                    {rankInfo ? rankInfo.description : "Loading your status..."}
                  </p>
                </div>
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
