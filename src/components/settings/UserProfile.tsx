"use client";
import React, { useRef } from "react";
import { FiHome } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoIosMale } from "react-icons/io";
import UserInput from "./UserInput";
import useUserDetails from "@/hooks/useUserDetails";
import { FaUserCircle } from "react-icons/fa";
import { Loader } from "../loader/Loader";
import LogoutModal from "../modal/LogoutModal";
import Image from "next/image";

const UserProfile = () => {
  const {
    email,
    city,
    setCity,
    street,
    setStreet,
    dateOfBirth,
    setDateOfBirth,
    gender,
    setGender,
    profilePhoto,
    handleImageChange,
    updateHandler,
    loading,
    errorMessage,
  } = useUserDetails();

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const userInputArray = [
    {
      icon: <FiHome className="w-6 h-6 text-cool_gray" />,
      title: "Live in",
      type: "text",
      placeholder: loading ? (
        <Loader
          style={
            "ml-7 mt-[2px] w-[15px] h-[15px] border-[1.5px] border-amethyst_purple border-b-transparent rounded-full inline-block animate-spinCustom"
          }
        />
      ) : city ? (
        city
      ) : (
        "empty"
      ),
      readOnly: false,
      value: city,
      onChange: setCity,
    },

    {
      icon: <FiHome className="w-6 h-6 text-cool_gray" />,
      title: "Street Address",
      type: "text",
      placeholder: loading ? (
        <Loader
          style={
            "ml-7 mt-[2px] w-[15px] h-[15px] border-[1.5px] border-amethyst_purple border-b-transparent rounded-full inline-block animate-spinCustom"
          }
        />
      ) : street ? (
        street
      ) : (
        "empty"
      ),
      readOnly: false,
      value: street,
      onChange: setStreet,
    },

    {
      icon: <HiOutlineMail className="w-6 h-6 text-cool_gray" />,
      title: "Email Address",
      type: "email",
      placeholder: loading ? (
        <Loader
          style={
            "ml-7 mt-[2px] w-[15px] h-[15px] border-[1.5px] border-amethyst_purple border-b-transparent rounded-full inline-block animate-spinCustom"
          }
        />
      ) : email ? (
        email
      ) : (
        "Email not found"
      ),
      readOnly: true,
    },

    {
      icon: <LiaBirthdayCakeSolid className="w-6 h-6 text-cool_gray" />,
      title: "Date Of Birth",
      type: "date",
      placeholder: loading ? (
        <Loader
          style={
            "ml-7 mt-[2px] w-[15px] h-[15px] border-[1.5px] border-amethyst_purple border-b-transparent rounded-full inline-block animate-spinCustom"
          }
        />
      ) : dateOfBirth ? (
        new Date(dateOfBirth).toISOString().split("T")[0]
      ) : (
        "empty"
      ),
      readOnly: false,
      value: dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : "",
      onChange: (value: string) => setDateOfBirth(new Date(value)),
    },

    {
      icon: <IoIosMale className="w-6 h-6 text-cool_gray" />,
      title: "Gender",
      type: "text",
      placeholder: loading ? (
        <Loader
          style={
            "ml-7 mt-[2px] w-[15px] h-[15px] border-[1.5px] border-amethyst_purple border-b-transparent rounded-full inline-block animate-spinCustom"
          }
        />
      ) : gender ? (
        gender
      ) : (
        "empty"
      ),
      readOnly: false,
      value: gender,
      onChange: setGender,
    },
  ];

  return (
    <>
      <div className="mt-12 px-4">
        <div className="mb-6">
          <h1 className="text-charcoal_black text-[18px] md:text-[20px] font-bold mb-2 dark:text-white transition-all duration-300">
            Profile
          </h1>
          <p className="text-slate_gray text-[16px] md:text-base dark:text-cool_gray transition-all duration-300">
            Update your photo and personal details here.
          </p>
        </div>
        <div className="border-t border-light_gray_blue_b dark:border-t-onyx_gray transition-all duration-300"></div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="max-w-[788px] flex flex-col gap-6 my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userInputArray?.map((item, index) => (
              <UserInput
                key={index}
                icon={item.icon}
                title={item.title}
                placeholder={item.placeholder}
                type={item.type}
                readOnly={item.readOnly}
                value={item.value}
                onChange={item.onChange}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-light_gray_blue_b dark:border-t-onyx_gray transition-all duration-300"></div>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-3xl my-6 gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-16 w-full">
            <div className="flex flex-col gap-1">
              <h2 className="text-charcoal_black font-medium text-[16px] dark:text-white transition-all duration-300">
                Your Photo
              </h2>
              <p className="text-sm text-cool_gray">
                This will be displayed on your profile
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div
              onClick={handleImageClick}
              className="cursor-pointer w-[80px] h-[80px] "
            >
              {profilePhoto ? (
                <Image
                  src={profilePhoto}
                  width={100}
                  height={100}
                  alt="user photo"
                  className="w-full h-full aspect-[3/2] rounded-full"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button className="font-medium text-cool_gray hover:text-red-600">
              Delete
            </button>

            <LogoutModal
              title="Update"
              para="Do you really want to update?"
              onClick={updateHandler}
              className2="font-medium text-amethyst_purple hover:text-purple-700"
            />
          </div>
        </div>
        <div className="border-t border-light_gray_blue_b dark:border-t-onyx_gray transition-all duration-300"></div>
      </div>
    </>
  );
};

export default UserProfile;
