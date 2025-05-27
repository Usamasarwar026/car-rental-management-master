import React from "react";
import ServiceScheduleCard from "./ServiceScheduleCard";

const ServicesSchedule = () => {
  return (
    <div>
      <h1 className="dark:text-white text-charcoal_black text-[24px] leading-[31.25px] font-bold mt-[30px] mb-6 ">
        Service Schedule
      </h1>
      <div>
        <div className="flex   ">
          <span className=" w-6 h-6 border-[2px] rounded-[50%] dark:border-charcoal_black border-light_silver_gray mr-5 max-sm:hidden "></span>
          <ServiceScheduleCard
            para="Upgrade your favorite car periodically"
            date="Today, 10.00"
            price="Fix Price : $1,200"
          />
        </div>
        <div className="flex mt-5 ">
          <span className=" w-6 h-6 border-[2px] rounded-[50%] dark:border-charcoal_black border-light_silver_gray mr-5 max-sm:hidden "></span>
          <ServiceScheduleCard
            para="Buy spare parts for suspension"
            date="Today, 14.00"
            price="FFix Price : $1,400"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSchedule;
