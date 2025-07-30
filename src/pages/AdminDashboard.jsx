import React from "react";
import AsideBar from "../components/AsideBar";
import { Link } from "react-router-dom";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa6";

const AdminDashboard = () => {
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden md:pt-32 pt-16">
      <div className="max-w-7xl mx-auto flex">
        <AsideBar />

        <div className="bg-gray-50 flex-1 p-4 rounded-xl min-h-screen overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-indigo-800">
                ADMIN DASHBOARD
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div>
                <Link to="/admin/manage-users">
                  <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl p-4 sm:p-6 text-center text-white">
                    <FaUserShield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                    <div className="font-semibold text-sm sm:text-base">
                      Manage Users
                    </div>
                  </div>
                </Link>
              </div>
              {/* <div>
                <Link to="/admin/manage-payments">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 sm:p-6 text-center text-white">
                    <RiSecurePaymentFill className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                    <div className="font-semibold text-sm sm:text-base">
                      Manage User Payments
                    </div>
                  </div>
                </Link>
              </div> */}
              <div>
                <Link to="/admin/payment/verification">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 sm:p-6 text-center text-white">
                    <RiSecurePaymentFill className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                    <div className="font-semibold text-sm sm:text-base">
                      Payments Verification
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
