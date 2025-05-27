"use client";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { BookingDropDownType } from "@/types/types";

const BookingDropDown = ({
  className,
  setSelectedCar,
  uniqueCars,
  isOpen,
  handleIsOpen,
  selectedOption,
  setSelectedOption,
  setIsOpen,
}: BookingDropDownType) => {
  const handleOptionClick = (option: string) => {
    setSelectedOption?.(option);
    setSelectedCar?.(option);
    setIsOpen?.(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleIsOpen}
        className={`${className} bg-white h-[36px] px-5 flex items-center justify-center gap-3 rounded-[22px] cursor-pointer dark:bg-charcoal_black dark:text-light_gray_blue transition-all duration-300 -z-50`}
      >
        {selectedOption}{" "}
        <IoMdArrowDropdown size={25} className="text-pale_gray_blue" />
      </button>

      {isOpen && uniqueCars && (
        <div className="absolute left-0 mt-2 w-[122px] bg-white border border-gray-200 shadow-lg rounded-lg dark:bg-charcoal_black dark:border-gray-700">
          {uniqueCars.map((carName, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm text-gray-700 dark:text-light_gray_blue hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => handleOptionClick(carName)}
            >
              {carName}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingDropDown;
