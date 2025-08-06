import React from "react";
import BoostBuddiesLogo from "./BoostBuddiesLogo";

function Spinner({ fullScreen = false, message = "Loading..." }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className="mb-6">
          <BoostBuddiesLogo size="normal" />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-indigo-500"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-indigo-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium text-center max-w-xs">
            {message}
          </p>
        </div>
        <div className="mt-8 flex space-x-1">
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-indigo-100 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-gray-600 text-sm text-center">{message}</p>
      </div>
    </div>
  );
}

export default Spinner;
