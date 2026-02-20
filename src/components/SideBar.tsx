import React from "react";
import Navbar from "./Navbar";

const SideBar = () => {
  return (
    <div>
      <div className="h-16 flex items-center px-6 border-b">
        <h2 className="text-xl font-bold tracking-wide text-gray-800">
          Admin Panel
        </h2>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default SideBar;
