import React from "react";
import { CarDropDownProps } from "@/types/types";

const CarDropDown = ({ title, value, onChange, options }: CarDropDownProps) => {
  return (
    <>
      <div>
        <label className="block text-cool_gray font-[500] mb-2 dark:text-light_gray_blue">
          {title}
        </label>
        <select
          value={value}
          onChange={onChange}
          name="transmission"
          className={`w-full px-[22px] py-[14px] font-[500] text-slate_gray border outline-none focus:outline-amethyst_purple dark:bg-jet_black dark:text-cool_gray dark:border-gunmetal_gray rounded-[10px] transition-all duration-300`}
          required
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CarDropDown;
