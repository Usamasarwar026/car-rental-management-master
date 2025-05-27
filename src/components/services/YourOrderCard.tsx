import React from "react";
import { YourOrderCardPropsTypes } from "@/types/types";

const YourOrderCard: React.FC<YourOrderCardPropsTypes> = ({
  circleDesign,
  heading,
  amount,
}) => {
  return (
    <div className="flex items-center justify-between w-full dark:bg-charcoal_black bg-white px-[14px] py-[15px] rounded-[8px] ">
      <div className="flex items-center gap-x-[14px] py-[15px] max-sm:justify-center max-sm:w-full ">
        <span
          className={` ${circleDesign}  w-4 h-4  rounded-[50%] max-sm:hidden `}
        ></span>
        <h3 className="dark:text-white text-slate_gray leading-[26.04px] text-[20px] font-bold text-nowrap  ">
          {heading}
        </h3>
      </div>
      <h3 className="text-center rounded-[5px] text-amethyst_purple py-0.5 px-[14px] bg-amethyst_purple_transparent leading-[26.04px] text-[20px] font-bold  max-sm:hidden ">
        {amount}
      </h3>
    </div>
  );
};

export default YourOrderCard;
