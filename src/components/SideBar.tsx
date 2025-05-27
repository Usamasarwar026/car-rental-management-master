"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { BiCar } from "react-icons/bi";
import { HiOutlineCalendar, HiOutlineShoppingBag } from "react-icons/hi";
import { LuMessageSquareText, LuUsersRound } from "react-icons/lu";
import { SlSettings } from "react-icons/sl";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { FaRegListAlt } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineDesignServices } from "react-icons/md";
import { IMAGES } from "@/constants/images";

const SideBar = () => {
  const session = useSession();

  const links =
    session.data?.user.role === "ADMIN"
      ? [
          {
            href: "/dashboard",
            icon: <RxDashboard />,
            label: "Dashboard",
          },
          {
            href: "/dashboard/allBookedCar",
            icon: <BiCar />,
            label: "Booked Car",
          },
          {
            href: "/dashboard/sellCars",
            icon: <HiOutlineShoppingBag />,
            label: "Sell Cars",
          },
          {
            href: "/dashboard/addCar",
            icon: <AiOutlinePlusCircle />,
            label: "Add Car",
          },
          {
            href: "/dashboard/carsList",
            icon: <FaRegListAlt />,
            label: "Cars List",
          },
          {
            href: "/dashboard/usersList",
            icon: <LuUsersRound />,
            label: "Users",
          },
          {
            href: "/dashboard/services",
            icon: <MdOutlineDesignServices />,
            label: "Services",
          },
          {
            href: "/dashboard/calender",
            icon: <HiOutlineCalendar />,
            label: "Calendar",
          },
        ]
      : [
          {
            href: "/dashboard/booking",
            icon: <BiCar />,
            label: "Booking",
          },
          {
            href: "/dashboard/bookCar",
            icon: <BiCar />,
            label: "My Booking",
          },
          {
            href: "/dashboard/invoice",
            icon: <BiCar />,
            label: "My Invoice",
          },
        ];
  return (
    <aside
      className={`pt-1 flex flex-col justify-between w-[60px] sm:w-[250px] h-screen fixed left-0 top-0 bg-pure_white dark:bg-charcoal_black dark:text-pure_white transition-all duration-300`}
    >
      <div>
        <div className="flex items-center p-6">
          <Image
            src={IMAGES.NAVBAR_LOGO}
            className="hidden sm:block"
            alt="Navbar Logo does not show"
            width={200}
            height={200}
          />
        </div>
        <div className="px-3 pb-4 pt-5">
          <ul className="space-y-2 font-medium">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 focus:bg-off_white text-slate_gray dark:hover:bg-charcoal_blue dark:focus:bg-charcoal_blue dark:text-storm_gray"
                >
                  <span className="w-[20px]">{item.icon}</span>
                  <span className="text-sm font-medium sm:block hidden">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-3 pb-4">
        <ul>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal_blue focus:bg-off_white dark:focus:bg-charcoal_blue"
            >
              <SlSettings className="text-gray-600 w-[20px] dark:text-storm_gray" />
              <span className="text-sm font-medium hidden sm:block dark:text-storm_gray">
                Settings
              </span>
            </Link>
          </li>

          <li className="mb-10">
            <div
              onClick={() => signOut()}
              className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal_blue focus:bg-off_white dark:focus:bg-charcoal_blue cursor-pointer"
            >
              <TbLogout2 className="text-gray-600 w-[20px] dark:text-storm_gray" />
              <span className="text-sm font-medium hidden sm:block dark:text-storm_gray">
                LogOut
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
