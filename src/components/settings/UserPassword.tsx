"use client";
import React from "react";
import PageChange from "@/components/authentication/PageChange";
import AuthBtn from "@/components/button/AuthBtn";
import TextInput from "@/components/authentication/TextInput";
import useChangePassword from "@/hooks/useChangePassword";

const UserPassword = () => {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    localError,
    loading,
    handlePasswordChange,
  } = useChangePassword();

  return (
    <>
      <div className="flex justify-center py-7 mx-3">
        <div className="max-w-[506px] w-full">
          <PageChange title="Change Your Password!" />

          <form onSubmit={handlePasswordChange}>
            <div
              className={`flex flex-col space-y-4 w-full h-auto p-8 bg-white shadow-lg  rounded-[10px] dark:bg-jet_black transition-all duration-300`}
            >
              <TextInput
                value={oldPassword}
                onChange={setOldPassword}
                title="Old Password"
                placeholder="Enter your email"
                type="password"
              />
              <TextInput
                value={newPassword}
                onChange={setNewPassword}
                title="New Password"
                placeholder="Enter your email"
                type="password"
              />
              <TextInput
                value={confirmPassword}
                onChange={setConfirmPassword}
                title="Confirm Password"
                placeholder="Enter your email"
                type="password"
              />
              {localError && <p className="text-red-600">{localError}</p>}
            </div>
            <div className="mt-10">
              <AuthBtn loading={loading} title="Reset Password" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserPassword;
