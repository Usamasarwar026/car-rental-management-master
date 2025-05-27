import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FilterBtnPropsTypes } from "@/types/types";

const FilterBtn: React.FC<FilterBtnPropsTypes> = ({ heading }) => {
  return (
    <div className="flex items-center gap-x-2 rounded-lg dark:bg-charcoal_black bg-white px-3 py-[10px] ">
      <h3 className="dark:text-light_gray_blue text-slate_gray leading-[20.83px]  font-medium ">
        {heading}
      </h3>
      <IoIosArrowDown className="dark:text-cool_gray text-slate_gray w-6 h-6" />
    </div>
  );
};

export default FilterBtn;
