"use client";
import { RiSearchLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "./themeToggle/ThemeToggle";
import useSearchBar from "@/hooks/useSearchBar";
import Link from "next/link";
import useBooking from "@/hooks/useBooking";

const Navbar = () => {
  const {
    profilePhoto,
    searchTerm,
    setSearchTerm,
    isDropDownOpen,
    setIsDropDownOpen,
    suggestions,
  } = useSearchBar();

  const { clickeViewsHandler } = useBooking();

  return (
    <div
      className={`fixed top-0 left-0 sm:left-[250px] w-full sm:w-[calc(100%-250px)] py-4 px-6 flex items-center justify-between bg-pure_white dark:bg-charcoal_black dark:text-pure_white transition-all duration-300`}
    >
      <div
        className={`flex items-center gap-x-4 rounded-md py-2 px-4 w-[250px] bg-gray-100 dark:text-pure_white dark:bg-jet_black transition-all duration-300`}
      >
        <RiSearchLine className="text-gray-500 dark:text-gray-300 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropDownOpen(true);
          }}
          placeholder="Search or type"
          className="text-sm font-medium w-full border-none focus:outline-none bg-transparent"
        />
      </div>

      {isDropDownOpen && searchTerm && (
        <ul
          className={`absolute top-[100%] left-8 w-[250px] mt-1 bg-pure_white dark:bg-jet_black border border-gray-200 dark:border-dark_charcoal_a rounded-md shadow-lg z-50`}
        >
          {suggestions
            ?.filter((item) =>
              item?.brand.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <Link href={`/dashboard/assets/${item?.id}`} key={item?.id}>
                <li
                  onClick={() => {
                    setSearchTerm(item?.brand);
                    setIsDropDownOpen(false);
                    clickeViewsHandler(item?.id);
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark_slate_gray cursor-pointer"
                >
                  {item?.brand}
                </li>
              </Link>
            ))}

          {suggestions.filter((item) =>
            item?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 && (
            <li className="px-4 py-2 text-sm text-gray-400 dark:text-gray-500">
              No results found
            </li>
          )}
        </ul>
      )}

      <div className="flex items-center gap-x-6">
        <ThemeToggle />
        <IoNotificationsOutline className="text-gray-600 dark:text-gray-300 h-6 w-6 cursor-pointer" />
        {profilePhoto ? (
          <Image
            src={profilePhoto}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover w-[48px] h-[48px]"
          />
        ) : (
          <FaUserCircle className="text-gray-400 rounded-full object-cover w-[48px] h-[48px]" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
