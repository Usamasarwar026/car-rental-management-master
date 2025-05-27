import Image from "next/image";
import React from "react";
import { ServicesCardPropsTypes } from "@/types/types";

const VehicleConditionSummary: React.FC<ServicesCardPropsTypes> = ({
  imgSrc,
  title,
  parts,
  condition,
  className,
}) => {
  return (
    <div className="w-full sm:w-[180px] flex-1 flex flex-col items-start">
      <Image
        src={imgSrc!}
        alt="Vehicle Condition"
        width={148}
        height={153}
        className="w-full h-auto object-contain"
      />

      <h2 className="dark:text-white text-black text-[18px] sm:text-[20px] leading-tight font-bold mt-5">
        {title}
      </h2>

      <div className="w-full flex items-center justify-between mt-3">
        <h4 className="dark:text-storm_gray text-dove_gray text-[13px] sm:text-[14px] font-medium">
          {parts}
        </h4>
        <span className="bg-light_silver w-px h-5 mx-2"></span>
        <h4 className="dark:text-storm_gray text-dove_gray text-[13px] sm:text-[14px] font-medium">
          {condition}
        </h4>
      </div>

      <div className={`mt-4 flex bg-white_smoke w-full h-[3px] rounded-lg`}>
        <span className={` ${className} h-[5px] rounded-lg mt-[-1px]`}></span>
      </div>
    </div>
  );
};

export default VehicleConditionSummary;
