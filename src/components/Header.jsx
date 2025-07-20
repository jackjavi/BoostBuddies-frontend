import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import Sidebar from "./Sidebar.jsx";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
// import mmmLogo from "../assets/images/MMM-Logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
        <button
          className={`mobile-menu-button p-2 md:hidden ${
            mobileMenuOpen ? "text-indigo-800" : ""
          }`}
          onClick={toggleMobileMenu}
        >
          <span className="material-icons-outlined text-2xl">menu</span>
        </button>
        <div className="text-xl font-bold text-blue-900">
          <Link to="/">
            {/* <img src={mmmLogo} alt="logo" className="h-16 w-16 object-cover" /> */}
            <span className="text-2xl">BoostBuddies</span>
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <Link to="/logs">
              <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">
                Logs
              </span>
            </Link>
            <Link to="/profile/edit">
              <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">
                Settings
              </span>
            </Link>

            {user.profilePicture ? (
              <Link to="/profile">
                <img
                  src={
                    user.profilePicture.includes("githubusercontent.com")
                      ? user.profilePicture
                      : `${process.env.REACT_APP_BACKEND_URL}/${user.profilePicture}`
                  }
                  alt={user.name}
                  className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
                />
              </Link>
            ) : (
              <Link to="/profile">
                <CgProfile className="w-10 h-10" />
              </Link>
            )}
          </div>
        ) : (
          <div className="flex gap-4 items-center justify-center">
            <Link to="/login" className="text-indigo-800 font-semibold">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-800 text-white font-semibold px-4 py-1 rounded-md"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Overlay and Sidebar */}
      {mobileMenuOpen && (
        <div
          className="overlay fixed inset-0 bg-indigo-900/50 z-40"
          onClick={toggleMobileMenu}
        />
      )}
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        disconnect={disconnect}
        user={user}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
};

export default Header;
