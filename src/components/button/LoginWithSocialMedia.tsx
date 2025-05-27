import React from "react";
import { MdFacebook } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { LoginWithSocialMediaProps } from "@/types/types";

const LoginWithSocialMedia: React.FC<LoginWithSocialMediaProps> = ({
  className,
  title,
  signIn,
}) => {
  return (
    <>
      <button
        onClick={signIn}
        className={`${className} md:w-[246px] w-full md:h-[60px] h-[50px] flex items-center justify-center gap-3 p-2.5 text-[15px] font-[500] uppercase border border-gray-300 rounded-md transition-transform duration-500 hover:scale-105`}
      >
        {title === "Sign in with Google" ? (
          <FaGoogle size={24} />
        ) : (
          <MdFacebook size={23} />
        )}
        {title}
      </button>
    </>
  );
};

export default LoginWithSocialMedia;
