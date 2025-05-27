import React from "react";
import { ServiceScheduleCardPropsTypes } from "@/types/types";

const ServiceScheduleCard: React.FC<ServiceScheduleCardPropsTypes> = ({
  para,
  date,
  price,
}) => {
  return (
    <div>
      <h3 className=" dark:text-light_gray_blue text-charcoal_black leading-[20.83px] font-medium ">
        {para}
      </h3>
      <div className="flex items-center justify-between mt-4 ">
        <h4 className=" text-dove_gray text-[14px] leading-[18.23px] font-medium ">
          {date}
        </h4>
        <span className="dark:bg-charcoal_black bg-light_silver w-[1px] h-[20px] max-sm:hidden "></span>
        <h4 className=" text-dove_gray text-[14px] leading-[18.23px] font-medium">
          {price}
        </h4>
      </div>
    </div>
  );
};

export default ServiceScheduleCard;
