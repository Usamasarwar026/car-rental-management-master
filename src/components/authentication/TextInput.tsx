"use client";
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import useHideShowPassword from "@/hooks/useHideShowPassword";
import { TextInputProps } from "@/types/types";

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  title,
  placeholder,
  type,
}) => {
  const { isPasswordVisible, togglePasswordVisibility } = useHideShowPassword();

  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-[12px] relative">
      <label className="font-[500] dark:text-pure_white transition-all duration-300">
        {title}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={inputType}
        name={type === "password" ? "password" : "email"}
        placeholder={placeholder}
        className="w-full p-3 pr-11 border border-light_grayish_blue rounded-[10px] focus:outline-amethyst_purple dark:dark:bg-onyx_gray dark:border-none dark:text-pure_white"
        required
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-[50px]"
        >
          {!isPasswordVisible ? (
            <MdOutlineRemoveRedEye size={20} className=" text-dusty_blue" />
          ) : (
            <IoEyeOffOutline size={20} className=" text-dusty_blue" />
          )}
        </button>
      )}
    </div>
  );
};

export default TextInput;
