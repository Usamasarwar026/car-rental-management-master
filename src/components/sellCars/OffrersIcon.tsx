import React from "react";
import { OffrersIconType } from "@/types/types";

const OffrersIcon = ({
  title,
  para,
  icon,
  style,
  iconStyle,
}: OffrersIconType) => {
  return (
    <div>
      <div
        className={`${iconStyle} w-[36px] h-[36px] grid place-items-center rounded-[8px]`}
      >
        {icon}
      </div>
      <h3 className={`${style} font-[700] text-[20px]`}>{title}</h3>
      <p className="font-[500] text-[12px] text-storm_gray w-[80px] sm:w-auto">
        {para}
      </p>
    </div>
  );
};

export default OffrersIcon;
