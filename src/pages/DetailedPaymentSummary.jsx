import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { useNavigate } from "react-router-dom";
import {
  fetchDetailedPaymentSummary,
  submitWithdrawalRequest,
  getUserWithdrawals,
} from "../api/api2";
import MobileNavBottom from "../components/MobileNavBottomPayments";
import WithdrawalComponent from "../components/WithdawalComponent";
import NotificationModal from "../components/NotificationModal";
import {
  Wallet,
  TrendingUp,
  Users,
  Eye,
  Gift,
  Clock,
  Star,
  Crown,
  Trophy,
  ChevronRight,
  DollarSign,
  Activity,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Spinner from "../components/Spinner";

const DetailedPaymentSummary = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Withdrawal component state
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

  // Notification modal state
  const [notification, setNotification] = useState({
    isVisible: false,
    type: "info",
    title: "",
    message: "",
    actionButton: null,
  });

  useEffect(() => {
    const loadPaymentData = async () => {
      try {
        setLoading(true);
        const data = await fetchDetailedPaymentSummary(user.id);
        setPaymentData(data);

        // Also load withdrawal history
        try {
          const withdrawals = await getUserWithdrawals(user.id);
          setWithdrawalHistory(withdrawals.withdrawals || []);
        } catch (withdrawalError) {
          console.error("Failed to load withdrawal history:", withdrawalError);
          setWithdrawalHistory([]);
        }
      } catch (error) {
        console.error("Failed to load detailed payment data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadPaymentData();
    }
  }, [user]);

  // Handle withdrawal request submission
  const handleWithdrawalRequest = async (withdrawalData) => {
    try {
      const response = await submitWithdrawalRequest(withdrawalData);

      // Show success notification
      setNotification({
        isVisible: true,
        type: "success",
        title: "Withdrawal Request Submitted",
        message:
          response.message ||
          "Your withdrawal request has been submitted successfully and will be reviewed within 3 hours.",
        actionButton: null,
      });

      // Refresh payment data to reflect any changes
      if (user?.id) {
        const updatedData = await fetchDetailedPaymentSummary(user.id);
        setPaymentData(updatedData);

        // Refresh withdrawal history
        const updatedWithdrawals = await getUserWithdrawals(user.id);
        setWithdrawalHistory(updatedWithdrawals.withdrawals || []);
      }

      return response;
    } catch (error) {
      console.error("Withdrawal request failed:", error);

      // Show error notification with backend message
      setNotification({
        isVisible: true,
        type: "error",
        title: "Withdrawal Request Failed",
        message:
          error.message ||
          "An unexpected error occurred while processing your withdrawal request. Please try again.",
        actionButton: {
          text: "Try Again",
          onClick: () => {
            setNotification({ ...notification, isVisible: false });
            setShowWithdrawal(true); // Reopen withdrawal modal
          },
        },
      });

      throw error;
    }
  };

  // Handle withdrawal button click with eligibility check
  const handleWithdrawalClick = () => {
    // If eligible, show withdrawal modal
    setShowWithdrawal(true);
  };

  // Close notification modal
  const closeNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const getRankInfo = (rank) => {
    if (rank <= 3) {
      return {
        icon: <Crown className="w-6 h-6 text-yellow-500" />,
        gradient: "from-yellow-400 to-amber-500",
        textColor: "text-yellow-800",
        bgColor: "bg-gradient-to-br",
        description: "Elite Performer",
      };
    } else if (rank <= 10) {
      return {
        icon: <Trophy className="w-6 h-6 text-orange-500" />,
        gradient: "from-orange-400 to-red-500",
        textColor: "text-orange-800",
        bgColor: "bg-gradient-to-br",
        description: "Top Performer",
      };
    } else if (rank <= 50) {
      return {
        icon: <Star className="w-6 h-6 text-blue-500" />,
        gradient: "from-blue-400 to-indigo-500",
        textColor: "text-blue-800",
        bgColor: "bg-gradient-to-br",
        description: "Rising Star",
      };
    } else {
      return {
        icon: <Activity className="w-6 h-6 text-gray-500" />,
        gradient: "from-gray-400 to-gray-500",
        textColor: "text-gray-800",
        bgColor: "bg-gradient-to-br",
        description: "Keep Growing",
      };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to Load Data
          </h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const {
    user: userData,
    stats,
    transactions,
    pendingBonuses,
    chainMemberships,
    monthlyEarnings,
    payments,
  } = paymentData;
  const rankInfo = getRankInfo(userData.globalRank);

  const pieData = [
    {
      name: "Registration Bonus",
      value: stats.registrationBonus,
      color: COLORS[0],
    },
    {
      name: "Referral Earnings",
      value: stats.referralEarnings,
      color: COLORS[1],
    },
    { name: "View Earnings", value: stats.viewEarnings, color: COLORS[2] },
    { name: "Pending Bonuses", value: stats.pendingAmount, color: COLORS[3] },
  ].filter((item) => item.value > 0);

  return (
    <div>
      <div>
        {/* Header Section */}
        <div>
          <div className="flex flex-col md:flex-row items-center md:justify-between px-4 md:px-8">
            <div className="">
              <h1 className="text-3xl font-lilita text-gray-900 mb-2 text-center">
                Payment Summary
              </h1>
              <p className="text-gray-600 mt-1 text-center">
                Detailed breakdown of your earnings and transactions
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-end py-4 w-full space-x-4">
              {/* Withdrawal Button */}
              <div>
                <button
                  onClick={handleWithdrawalClick}
                  className="px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors bg-green-600 hover:bg-green-700 text-white"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Request Withdrawal</span>
                </button>
              </div>

              {/* Rank Badge */}
              <div
                className={`${rankInfo.bgColor} ${rankInfo.gradient} rounded-xl p-4 text-white shadow-lg`}
              >
                <div className="flex items-center space-x-2">
                  {rankInfo.icon}
                  <div>
                    <p className="text-sm opacity-90">Global Rank</p>
                    <p className="text-2xl font-bold text-md">
                      #{userData.globalRank}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalEarnings)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Active earner</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Referral Earnings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.referralEarnings)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <span>{stats.referralCount} successful referrals</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  View Earnings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.viewEarnings)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <span>{stats.viewCount} product views</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Bonuses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.pendingAmount)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Pay for package to unlock</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-col md:flex-row space-x-8 px-6">
              {[
                { id: "overview", name: "Overview", icon: TrendingUp },
                { id: "transactions", name: "Transactions", icon: Activity },
                { id: "chains", name: "Referral Chains", icon: Users },
                { id: "pending", name: "Pending Bonuses", icon: Gift },
                { id: "withdrawals", name: "Withdrawals", icon: Wallet },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Monthly Earnings Chart */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Monthly Earnings Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyEarnings}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#3B82F6"
                          strokeWidth={3}
                        />
                        <Line
                          type="monotone"
                          dataKey="referral"
                          stroke="#10B981"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="view"
                          stroke="#F59E0B"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Earnings Distribution */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Earnings Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Earnings by Type */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Earnings Breakdown
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyEarnings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="registration" stackId="a" fill="#3B82F6" />
                      <Bar dataKey="referral" stackId="a" fill="#10B981" />
                      <Bar dataKey="view" stackId="a" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-6">
                {/* Transaction Types */}
                {Object.entries(transactions).map(([type, transactionList]) => (
                  <div key={type} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                      {type} Transactions ({transactionList.length})
                    </h3>
                    <div className="space-y-3">
                      {transactionList.slice(0, 5).map((transaction, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                type === "registration"
                                  ? "bg-blue-100"
                                  : type === "referral"
                                    ? "bg-green-100"
                                    : "bg-yellow-100"
                              }`}
                            >
                              {type === "registration" ? (
                                <Gift className="w-5 h-5 text-blue-600" />
                              ) : type === "referral" ? (
                                <Users className="w-5 h-5 text-green-600" />
                              ) : (
                                <Eye className="w-5 h-5 text-yellow-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {transaction.description ||
                                  `${type.charAt(0).toUpperCase() + type.slice(1)} earning`}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(transaction.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">
                              +{formatCurrency(transaction.amount)}
                            </p>
                            {transaction.sourceUser && (
                              <p className="text-sm text-gray-600">
                                from {transaction.sourceUser.name}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      {transactionList.length > 5 && (
                        <p className="text-center text-gray-600 text-sm">
                          And {transactionList.length - 5} more transactions...
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "chains" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-indigo-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                      {stats.chainsJoined}
                    </p>
                    <p className="text-sm text-gray-600">Chains Joined</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {stats.averagePosition.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600">Average Position</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {stats.referralCount}
                    </p>
                    <p className="text-sm text-gray-600">Total Referrals</p>
                  </div>
                </div>

                {chainMemberships.map((membership, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {membership.referralChain?.name ||
                          `Chain ${membership.referralChainId}`}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                          Position {membership.position}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {membership.referralChain?.memberships?.length || 0}{" "}
                          members
                        </span>
                      </div>
                    </div>

                    {membership.referralChain?.memberships && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700 mb-3">
                          Chain Members:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {membership.referralChain.memberships
                            .sort((a, b) => a.position - b.position)
                            .slice(0, 6)
                            .map((member, memberIndex) => (
                              <div
                                key={memberIndex}
                                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  {member.user?.member?.profilePicture ? (
                                    <img
                                      src={member.user.member.profilePicture}
                                      alt={member.user.name}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm font-medium text-indigo-600">
                                      {member.user?.name?.charAt(0) || "?"}
                                    </span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {member.user?.name || "Unknown"}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    Position {member.position}
                                  </p>
                                </div>
                                {member.userId === userData.id && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    You
                                  </span>
                                )}
                              </div>
                            ))}
                        </div>
                        {membership.referralChain.memberships.length > 6 && (
                          <p className="text-center text-gray-600 text-sm mt-3">
                            And{" "}
                            {membership.referralChain.memberships.length - 6}{" "}
                            more members...
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {chainMemberships.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Referral Chains Yet
                    </h3>
                    <p className="text-gray-600">
                      You haven't joined any referral chains yet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "pending" && (
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                    <p className="text-orange-800 font-medium">
                      You have {formatCurrency(stats.pendingAmount)} in pending
                      bonuses
                    </p>
                  </div>
                  <p className="text-orange-700 text-sm mt-1">
                    Pay for a package to unlock these bonuses and start
                    withdrawing your earnings.
                  </p>
                </div>

                <div className="space-y-4">
                  {pendingBonuses.map((bonus, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Gift className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Bonus from{" "}
                              {bonus.sourceUser?.name || "Unknown User"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Package:{" "}
                              {bonus.package?.name || "Unknown Package"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Received: {formatDate(bonus.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">
                            {formatCurrency(bonus.amount)}
                          </p>
                          <p className="text-sm text-gray-600">Pending</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {pendingBonuses.length === 0 && (
                    <div className="text-center py-12">
                      <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Pending Bonuses
                      </h3>
                      <p className="text-gray-600">
                        You don't have any pending bonuses at the moment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "withdrawals" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Withdrawal History
                  </h3>
                  <button
                    onClick={handleWithdrawalClick}
                    className="px-4 py-2 rounded-lg font-medium flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>New Withdrawal</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {withdrawalHistory.map((withdrawal, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              withdrawal.status === "processed"
                                ? "bg-green-100"
                                : withdrawal.status === "approved"
                                  ? "bg-blue-100"
                                  : withdrawal.status === "pending"
                                    ? "bg-yellow-100"
                                    : "bg-red-100"
                            }`}
                          >
                            <Wallet
                              className={`w-6 h-6 ${
                                withdrawal.status === "processed"
                                  ? "text-green-600"
                                  : withdrawal.status === "approved"
                                    ? "text-blue-600"
                                    : withdrawal.status === "pending"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Withdrawal Request #{withdrawal.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Phone: {withdrawal.phoneNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                              Reason: {withdrawal.reason}
                            </p>
                            <p className="text-xs text-gray-500">
                              Submitted: {formatDate(withdrawal.submittedAt)}
                            </p>
                            {withdrawal.verifiedAt && (
                              <p className="text-xs text-gray-500">
                                Verified: {formatDate(withdrawal.verifiedAt)}
                              </p>
                            )}
                            {withdrawal.transactionCode && (
                              <p className="text-xs text-blue-600 font-medium">
                                Transaction Code: {withdrawal.transactionCode}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(withdrawal.amount)}
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              withdrawal.status === "processed"
                                ? "bg-green-100 text-green-800"
                                : withdrawal.status === "approved"
                                  ? "bg-blue-100 text-blue-800"
                                  : withdrawal.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {withdrawal.status.charAt(0).toUpperCase() +
                              withdrawal.status.slice(1)}
                          </span>
                          {withdrawal.verificationNotes && (
                            <p className="text-xs text-gray-600 mt-1">
                              Note: {withdrawal.verificationNotes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {withdrawalHistory.length === 0 && (
                    <div className="text-center py-12">
                      <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Withdrawal History
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You haven't made any withdrawal requests yet.
                      </p>
                      {userData.hasPaid && stats.totalEarnings >= 500 && (
                        <button
                          onClick={handleWithdrawalClick}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                        >
                          Make Your First Withdrawal
                        </button>
                      )}
                      {(!userData.hasPaid || stats.totalEarnings < 500) && (
                        <button
                          onClick={handleWithdrawalClick}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                        >
                          Learn About Withdrawals
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/make-payment")}
              className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-indigo-900">
                  Make Payment
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-indigo-600" />
            </button>

            <button className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">
                  Refer Friends
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-green-600" />
            </button>

            <button
              onClick={() => navigate("/view-products")}
              className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-900">
                  View Products
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-yellow-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Withdrawal Component */}
      <WithdrawalComponent
        user={userData}
        payments={payments}
        stats={stats}
        onWithdrawalRequest={handleWithdrawalRequest}
        isVisible={showWithdrawal}
        onClose={() => setShowWithdrawal(false)}
      />

      {/* Notification Modal */}
      <NotificationModal
        isVisible={notification.isVisible}
        onClose={closeNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        actionButton={notification.actionButton}
      />

      <MobileNavBottom />
    </div>
  );
};

export default DetailedPaymentSummary;
