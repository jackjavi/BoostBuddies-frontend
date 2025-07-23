import React from "react";
import AsideBar from "../components/AsideBar";
import AdminPackagePayments from "../components/AdminPackagePayments";

const AdminManagePayments = () => {
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden md:pt-32 pt-16">
      <div className="max-w-7xl mx-auto flex">
        <AsideBar />

        <div className="bg-gray-50 flex-1 p-4 rounded-xl min-h-screen overflow-y-auto">
          <AdminPackagePayments />
        </div>
      </div>
    </div>
  );
};

export default AdminManagePayments;
