"use client";
import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { AvailableSensorsCardPropsTypes } from "@/types/types";

const AvailableSensorsCard: React.FC<AvailableSensorsCardPropsTypes> = ({
  para,
  unit,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="hidden peer"
        />
        <div
          className={`w-[18px] h-[18px] rounded-[3px] border-[1px] border-light_gray flex items-center justify-center transition-all duration-300 
          ${
            checked
              ? "bg-light_coral_red border-none"
              : "bg-pure_white border-gray-400"
          }`}
        >
          {checked && <IoCheckmark className="text-pure_white" />}
        </div>
      </label>

      <h1
        className={` dark:text-pure_white text-[13px] font-medium leading-[16.93px]  transition-colors duration-300 ${
          checked
            ? "dark:text-crimson_red text-crimson_red"
            : "text-charcoal_black"
        }`}
      >
        Asset - {para}
        <span
          className={`${
            checked
              ? "dark:text-crimson_red text-crimson_red"
              : "text-light_gray "
          }`}
        >
          ({unit})
        </span>
      </h1>

      <GoGraph
        className={`w-5 h-5 transition-colors duration-300 ${
          checked ? "text-crimson_red" : "text-light_gray "
        }`}
      />
    </div>
  );
};

export default AvailableSensorsCard;
