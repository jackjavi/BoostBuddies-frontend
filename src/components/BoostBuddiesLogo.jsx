import React from "react";
import { Zap, Coins } from "lucide-react";

const BoostBuddiesLogo = ({ size = "normal" }) => {
  const isSmall = size === "small";

  return (
    <div className="flex items-center space-x-2">
      {/* Logo Icon with animated elements */}
      <div className="relative">
        <div
          className={`${isSmall ? "w-8 h-8" : "w-10 h-10"} bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg`}
        >
          <Zap
            className={`${isSmall ? "w-4 h-4" : "w-5 h-5"} text-yellow-300 fill-current`}
          />
        </div>

        {/* Floating coins animation */}
        <div className="absolute -top-1 -right-1">
          <Coins
            className="w-3 h-3 text-yellow-500 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Connecting dots */}
        <div className="absolute -bottom-1 -left-1">
          <div className="flex space-x-0.5">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            <div
              className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span
          className={`${isSmall ? "text-md" : "text-lg md:text-xl"} font-monumentBold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}
        >
          BoostBuddies
        </span>
        {!isSmall && (
          <span className="text-xs text-gray-500 font-medium -mt-1 hidden sm:block">
            Earn • Refer • Grow
          </span>
        )}
      </div>
    </div>
  );
};

export default BoostBuddiesLogo;
