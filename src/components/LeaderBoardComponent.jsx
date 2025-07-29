import { Trophy, TrendingUp, Users, Eye } from "lucide-react";
import React from "react";
import MobileNavBottom from "./MobileNavBottomLeaderboard";

export default function LeaderboardComponent() {
  const fullRankings = [
    {
      rank: 1,
      initials: "SJ",
      name: "Sarah Johnson",
      referrals: 34,
      views: 1240,
      earnings: "$5420",
      verified: true,
      rankColor: "bg-yellow-500",
    },
    {
      rank: 2,
      initials: "MC",
      name: "Mike Chen",
      referrals: 26,
      views: 1150,
      earnings: "$4890",
      rankColor: "bg-gray-400",
    },
    {
      rank: 3,
      initials: "ED",
      name: "Emily Davis",
      referrals: 21,
      views: 980,
      earnings: "$4320",
      verified: true,
      rankColor: "bg-orange-500",
    },
    {
      rank: 4,
      initials: "AR",
      name: "Alex Rodriguez",
      referrals: 19,
      views: 890,
      earnings: "$3950",
      rankColor: "bg-gray-300",
    },
    {
      rank: 5,
      initials: "LW",
      name: "Lisa Wang",
      referrals: 18,
      views: 820,
      earnings: "$3680",
      rankColor: "bg-gray-300",
    },
    {
      rank: 6,
      initials: "DB",
      name: "David Brown",
      referrals: 16,
      views: 760,
      earnings: "$3420",
      rankColor: "bg-gray-300",
    },
    {
      rank: 7,
      initials: "JM",
      name: "Jessica Miller",
      referrals: 15,
      views: 640,
      earnings: "$3180",
      rankColor: "bg-gray-300",
    },
    {
      rank: 8,
      initials: "TW",
      name: "Tom Wilson",
      referrals: 14,
      views: 620,
      earnings: "$2950",
      rankColor: "bg-gray-300",
    },
    {
      rank: 9,
      initials: "RG",
      name: "Rachel Green",
      referrals: 13,
      views: 580,
      earnings: "$2750",
      rankColor: "bg-gray-300",
    },
    {
      rank: 10,
      initials: "JD",
      name: "John Doe",
      referrals: 12,
      views: 324,
      earnings: "$2450",
      isCurrentUser: true,
      rankColor: "bg-gray-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Leaderboard
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            See how you rank against other top earners
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12">
          {/* Second Place */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">
              2
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm border w-24 sm:w-32">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm mx-auto mb-1 sm:mb-2">
                MC
              </div>
              <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                Mike Chen
              </div>
              <div className="text-sm sm:text-base font-bold text-green-600 mb-1 sm:mb-2">
                $4890
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>26</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>1150</span>
                </div>
              </div>
            </div>
          </div>

          {/* First Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-2 sm:mb-3">
              1
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm border w-28 sm:w-36">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700 font-semibold text-sm mx-auto mb-1 sm:mb-2">
                SJ
              </div>
              <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                Sarah Johnson
              </div>
              <div className="text-sm sm:text-lg font-bold text-green-600 mb-1 sm:mb-2">
                $5420
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>34</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>1240</span>
                </div>
              </div>
            </div>
          </div>

          {/* Third Place */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">
              3
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm border w-24 sm:w-32">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-semibold text-sm mx-auto mb-1 sm:mb-2">
                ED
              </div>
              <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                Emily Davis
              </div>
              <div className="text-sm sm:text-base font-bold text-green-600 mb-1 sm:mb-2">
                $4320
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>21</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>980</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Rankings */}
        <div className="bg-white rounded-xl shadow-sm border mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Full Rankings
              </h2>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {fullRankings.map((user) => (
              <div
                key={user.rank}
                className={`p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 ${
                  user.isCurrentUser ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    {user.rank <= 3 ? (
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${user.rankColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {user.rank}
                      </div>
                    ) : (
                      <span className="text-gray-600 font-medium text-sm sm:text-base">
                        {user.rank}
                      </span>
                    )}
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-700 font-semibold text-xs sm:text-sm">
                      {user.initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {user.name}
                      </span>
                      {user.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      {user.isCurrentUser && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{user.referrals} referrals</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{user.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base sm:text-lg font-semibold text-green-600">
                    {user.earnings}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavBottom />

      {/* Mobile bottom padding to account for fixed nav */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}
