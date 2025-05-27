"use client";
import Image from "next/image";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import HomeButton from "../button/HomeButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IMAGES } from "@/constants/images";

const HomeNavbar = () => {
  const session = useSession();

  return (
    <div className="flex justify-between items-center px-[12px] md:px-[112px] py-[46px]">
      <button className="hidden md:block">
        <RxHamburgerMenu color="white" size={41} />
      </button>
      <Image
        src={IMAGES.HOME_HEADING}
        alt="heading"
        width={100}
        height={100}
        className="w-[178px]"
      />

      <Link
        href={
          !session.data?.user
            ? "/auth/login"
            : session.data?.user.role === "ADMIN"
            ? "/dashboard"
            : "/dashboard/booking"
        }
      >
        <HomeButton
          title={!session.data?.user ? "Login / Register" : "Dashboard"}
          style="w-[168px] h-[40px] pt-[6px] text-center border border-white_translucent rounded-[48px] text-pure_white font-[600] text-[16px]"
        />
      </Link>
    </div>
  );
};

export default HomeNavbar;
