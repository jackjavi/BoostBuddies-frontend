import React, { useContext, useEffect } from "react";
import { UsersContext } from "../context/UsersContextWrapper";
import ProductsComponent from "../components/ProductsComponent";
import Aside from "../components/AsideComponent";

const Dashboard = () => {
  const { fetchUsers } = useContext(UsersContext);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden py-24 md:py-28">
      <div className="max-w-7xl mx-auto flex">
        <Aside activeTab="products" />

        <main className="flex-1 px-4">
          <ProductsComponent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
