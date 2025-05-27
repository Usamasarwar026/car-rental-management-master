"use client";
import PageChange from "@/components/authentication/PageChange";
import AuthBtn from "@/components/button/AuthBtn";
import TextInput from "@/components/authentication/TextInput";
import useForgetPassword from "@/hooks/useForgetPassword";
import React from "react";

const ForgetPassword = () => {
  const { email, setEmail, loading, forgetError, handleForgetPass } =
    useForgetPassword();

  return (
    <div className="flex justify-center items-center h-screen py-7 mx-3">
      <div className="max-w-[506px] w-full">
        <PageChange
          title="Reset Your Password"
          link="/auth/login"
          signUp="Login"
          para="Remember your password?"
        />

        <form onSubmit={handleForgetPass}>
          <div
            className={`w-full h-auto p-8 bg-pure_white shadow-lg border border-gainsboro_gray rounded-[10px]`}
          >
            <TextInput
              value={email}
              onChange={setEmail}
              title="Email"
              placeholder="Enter your email"
              type="email"
            />
            {forgetError && <p className="text-red-600">{forgetError}</p>}
          </div>
          <div className="mt-10">
            <AuthBtn loading={loading} title="Reset Password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
