"use client";
import AuthBtn from "@/components/button/AuthBtn";
import ForgetPassWithCheckBox from "@/components/authentication/ForgetPassWithCheckBox";
import PageChange from "@/components/authentication/PageChange";
import TextInput from "@/components/authentication/TextInput";
import useLogin from "@/hooks/useLogin";
import Image from "next/image";
import React from "react";
import { IMAGES } from "@/constants/images";
import Link from "next/link";

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
    <div className="min-h-screen w-full flex bg-[#FAF9F6]">
      {/* Left brand panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[42%] relative bg-[#0F1B33] overflow-hidden flex-col justify-between p-12">
        {/* subtle radial glow */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#D4A657]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#D4A657]/10 blur-3xl" />

         <div className="relative z-10">
          <Link href="/" className="inline-block">
            <Image
              src={IMAGES.HOME_HEADING}
              alt="Logo"
              width={140}
              height={40}
              className="h-10 w-auto object-contain transition-opacity duration-200 hover:opacity-80"
              priority
            />
          </Link>
        </div>

        <div className="relative z-10 space-y-5">
          <span className="text-[#D4A657] tracking-[0.25em] text-xs font-medium uppercase">
            Welcome back
          </span>
          <h1 className="text-white text-[42px] font-semibold leading-[1.15] tracking-tight">
            Your work, right
            <br />
            where you left it.
          </h1>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed">
            Sign in to pick up your projects, track your progress, and keep
            things moving.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-white/30 text-xs">
          <span className="h-px w-8 bg-white/20" />
          <span>Secure sign-in</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[440px]">
          <PageChange
            title="Login Welcome Back!"
            link="/auth/signUp"
            signUp="SignUp"
            para="Don't have an account!"
          />

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_24px_-4px_rgba(15,27,51,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_32px_-4px_rgba(15,27,51,0.12)]">
              <div className="space-y-5">
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
                <p className="flex items-center gap-2 text-red-500 text-sm mt-5 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {loginError}
                </p>
              )}
            </div>

            <div className="mt-4">
              <ForgetPassWithCheckBox />
            </div>

            <div className="mt-6">
              <AuthBtn loading={loading} title="Log in" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;