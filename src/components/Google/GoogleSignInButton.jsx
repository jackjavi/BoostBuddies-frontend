import React from "react";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../Spinner";

const GoogleSignInButton = ({ onClick, isLoading }) => {
  return (
    <>
      <button
        onClick={onClick}
        type="submit"
        disabled={isLoading}
        className={`w-full p-4 rounded-xl text-sm md:text-md transition-all duration-200 transform ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
        } text-white`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <Spinner size="sm" />
            <span>Signing In...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <FcGoogle />
            <span>Sign In with Google</span>
          </div>
        )}
      </button>
    </>
  );
};

export default GoogleSignInButton;
