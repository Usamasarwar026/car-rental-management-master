import React from "react";
import HomeButton from "../button/HomeButton";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";
import { IMAGES } from "@/constants/images";

const Footer = () => {
  return (
    <>
      <footer className="lg:h-[300px] h-auto lg:py-0 py-10 mt-[120px] bg-charcoal_black text-white">
        <div className="mx-10 md:mx-28 flex lg:flex-row flex-col justify-center items-center lg:gap-[102px] gap-14 h-full">
          <div className="max-w-[510px]">
            <h1 className="font-[700] text-[36px] mb-[21px] ">
              Download our mobile app ⚡️
            </h1>
            <p className="text-[16px] text-semi_transparent_white">
              Get exclusive access to car rentals with our mobile app. Download
              now and experience convenience on the go.
            </p>
          </div>
          <div className="flex flex-wrap gap-[23px]">
            <HomeButton
              icon={<FaApple size={30} />}
              title="App Store"
              desc="DOWNLOAD ON THE"
              style="sm:w-[193px] w-full h-[61px] bg-white rounded-[73px] text-black flex items-center justify-center gap-[14px]"
            />
            <HomeButton
              icon={<FaGooglePlay size={30} />}
              title="Google Play"
              desc="GET IT ON"
              style="sm:w-[193px] w-full h-[61px] bg-white rounded-[73px] text-black flex items-center justify-center gap-[14px]"
            />
          </div>
        </div>
      </footer>

      <footer className="bg-charcoal_black lg:h-[113px] h-auto lg:py-0 py-8 flex flex-col lg:flex-row gap-6 lg:gap-0 items-center justify-between md:px-28 px-10 border-t border-white_light_translucent">
        <Image src={IMAGES.HOME_HEADING} alt="logo" width={200} height={200} />
        <div className="flex gap-[40px] text-white">
          <p className="">Rent</p>
          <p className="">Share</p>
          <p className="">About us</p>
          <p className="">Contact</p>
        </div>
        <div className="flex gap-[16px]">
          <div className="bg-gray-500 rounded-full p-2 cursor-pointer">
            <FaInstagram color="white" size={15} />
          </div>
          <div className="bg-gray-500 rounded-full p-2 cursor-pointer">
            <RiGlobalLine color="white" size={15} />
          </div>
          <div className="bg-gray-500 rounded-full p-2 cursor-pointer">
            <FaTwitter color="white" size={15} />
          </div>
          <div className="bg-gray-500 rounded-full p-2 cursor-pointer">
            <FaYoutube color="white" size={15} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
