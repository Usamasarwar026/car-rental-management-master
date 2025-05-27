import React from "react";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="sm:ml-[250px] ml-[50px] flex flex-col w-full h-screen">
        <Navbar />

        <div
          className={`flex-1 overflow-auto mt-[70px] p-8 bg-gray-100 dark:bg-jet_black transition-all duration-300`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
