"use client";
import React from "react";
import AuthBtn from "@/components/button/AuthBtn";
import ForgetPassWithCheckBox from "@/components/authentication/ForgetPassWithCheckBox";
import TextInput from "@/components/authentication/TextInput";
import useSignUp from "@/hooks/useSignUp";
import PageChange from "@/components/authentication/PageChange";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";

const SignUpComp = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    authError,
    handleSubmit,
  } = useSignUp();

  const InputsArray = [
    {
      value: firstName,
      onChange: setFirstName,
      type: "text",
      title: "First Name",
      placeholder: "Abcd",
    },
    {
      value: lastName,
      onChange: setLastName,
      type: "text",
      title: "Last Name",
      placeholder: "xyz",
    },
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
            Get started
          </span>
          <h1 className="text-white text-[42px] font-semibold leading-[1.15] tracking-tight">
            Create your account,
            <br />
            start in minutes.
          </h1>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed">
            Set up your profile and get access to your dashboard right away.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-white/30 text-xs">
          <span className="h-px w-8 bg-white/20" />
          <span>Secure sign-up</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[440px]">
          <PageChange
            title="Sign Up"
            link="/auth/login"
            signUp="Login"
            para="Already have an account!"
          />

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_24px_-4px_rgba(15,27,51,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_32px_-4px_rgba(15,27,51,0.12)]">
              {/* First Name + Last Name side by side */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                {InputsArray.slice(0, 2).map((textInput, index) => (
                  <TextInput
                    key={index}
                    value={textInput.value}
                    onChange={textInput.onChange}
                    title={textInput.title}
                    placeholder={textInput?.placeholder}
                    type={textInput?.type}
                  />
                ))}
              </div>

              {/* Email + Password full width */}
              <div className="space-y-5 mt-5">
                {InputsArray.slice(2).map((textInput, index) => (
                  <TextInput
                    key={index}
                    value={textInput.value}
                    onChange={textInput.onChange}
                    title={textInput.title}
                    placeholder={textInput?.placeholder}
                    type={textInput?.type}
                  />
                ))}
              </div>

              {authError && (
                <p className="flex items-center gap-2 text-red-500 text-sm mt-5 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {authError}
                </p>
              )}
            </div>

            <div className="mt-4">
              <ForgetPassWithCheckBox />
            </div>

            <div className="mt-6">
              <AuthBtn loading={loading} title="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComp;