import React from "react";
import PackagesArray from "./PackagesArray";
import Aside from "../components/AsideComponent";

const Packages = () => {
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden py-24 md:py-28">
      <div className="max-w-7xl mx-auto flex">
        <Aside activeTab="packages" />

        <main className="flex-1 px-4">
          <PackagesArray />
        </main>
      </div>
    </div>
  );
};

export default Packages;
