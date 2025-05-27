"use client";
import UserPassword from "@/components/settings/UserPassword";
import UserProfile from "@/components/settings/UserProfile";
import { useState } from "react";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");

  return (
    <div
      className={`w-full mx-auto p-6 bg-pure_white shadow-lg dark:bg-charcoal_black transition-all duration-300`}
    >
      <h1 className="text-2xl font-bold dark:text-pure_white transition-all duration-300">
        Settings
      </h1>

      <div className="flex space-x-4 border-b mt-4 dark:border-b-onyx_gray transition-all duration-300">
        {["Profile", "Password"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 ${
              selectedTab === tab
                ? "border-b-2 border-purple-500 text-purple-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {selectedTab === "Profile" && <UserProfile />}
        {selectedTab === "Password" && <UserPassword />}
      </div>
    </div>
  );
};

export default Settings;
