"use client";
import AuthBtn from "@/components/button/AuthBtn";
import LoginWithSocialMedia from "@/components/button/LoginWithSocialMedia";
import ForgetPassWithCheckBox from "@/components/authentication/ForgetPassWithCheckBox";
import OrSec from "@/components/authentication/OrSec";
import PageChange from "@/components/authentication/PageChange";
import TextInput from "@/components/authentication/TextInput";
import useLogin from "@/hooks/useLogin";
import React from "react";
import { signIn } from "next-auth/react";

const LoginComp = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginError,
    loading,
    handleSubmit,
  } = useLogin();
  const InputsArray = [
    {
      value: email,
      onChange: setEmail,
      type: "email",
      title: "Email",
      placeholder: "abcd@example.com",
    },
    {
      value: password,
      onChange: setPassword,
      type: "password",
      title: "Password",
      placeholder: "******",
    },
  ];

  return (
    <div className="flex justify-center h-full py-7 mx-3">
      <div>
        <PageChange
          title="Login Welcome Back!"
          link="/auth/signUp"
          signUp="SignUp"
          para="Don't have an account!"
        />

        {/* <div className="flex flex-wrap justify-center gap-4">
          <LoginWithSocialMedia
            signIn={() => signIn("google")}
            title="Sign in with Google"
            className="bg-pure_white text-black"
          />
          <LoginWithSocialMedia
            title="Sign in with Facebook"
            signIn={() => signIn("facebook")}
            className="bg-vivid_blue text-pure_white"
          />
        </div>

        <OrSec /> */}

        <form onSubmit={handleSubmit}>
          <div
            className={`w-full max-w-[506px] h-auto p-8 bg-pure_white shadow-lg border border-gainsboro_gray rounded-[10px]`}
          >
            <div className="space-y-[14px]">
              {InputsArray?.map((textInput, index) => (
                <TextInput
                  key={index}
                  value={textInput.value}
                  onChange={textInput.onChange}
                  title={textInput?.title}
                  placeholder={textInput?.placeholder}
                  type={textInput?.type}
                />
              ))}
            </div>

            {loginError && (
              <p className="text-red-500 text-sm mt-5">{loginError}</p>
            )}
          </div>
          <ForgetPassWithCheckBox />

          <AuthBtn loading={loading} title="Log in" />
        </form>
      </div>
    </div>
  );
};

export default LoginComp;
