import React from "react";
import { BlueCardPropsTypes } from "@/types/types";

const BlueCard: React.FC<BlueCardPropsTypes> = ({
  title1,
  title2,
  amount1,
  amount2,
}) => {
  return (
    <div className="flex items-center justify-between mb-[25px]">
      <div className="mb-1">
        <h4 className="dark:text-storm_gray text-light_sky_blue leading-[20.83px] font-medium transition-all duration-300">
          {title1}
        </h4>
        <h2 className=" text-pure_white leading-[26.04px] text-[20px] font-bold">
          {amount1}
        </h2>
      </div>
      <span className="dark:bg-dark_charcoal_a bg-sky_blue h-[40px] w-0.5 "></span>
      <div>
        <h4 className="dark:text-storm_gray text-light_sky_blue leading-[20.83px] font-medium ">
          {title2}
        </h4>
        <h2 className=" text-pure_white leading-[26.04px] text-[20px] font-bold">
          {amount2}
        </h2>
      </div>
    </div>
  );
};

export default BlueCard;
