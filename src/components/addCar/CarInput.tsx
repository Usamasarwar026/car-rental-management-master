import React from "react";
import { CarInputProps } from "@/types/types";

const CarInput = ({
  type,
  title,
  placeholder,
  value,
  onChange,
}: CarInputProps) => {
  return (
    <div className="w-full">
      <label className="block text-cool_gray font-[500] mb-2 dark:text-light_gray_blue">
        {title}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name="modelYear"
        placeholder={placeholder}
        className={`w-full px-[22px] py-[14px] rounded-[10px] font-[500] text-slate_gray border outline-none focus:outline-amethyst_purple dark:bg-jet_black dark:text-cool_gray dark:border-gunmetal_gray transition-all duration-300`}
        required
      />
    </div>
  );
};

export default CarInput;
