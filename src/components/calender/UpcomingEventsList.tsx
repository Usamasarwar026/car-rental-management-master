import React from "react";
import UpcomingEventsCard from "./UpcomingEventsCard";
import { IMAGES } from "@/constants/images";

const UpcomingEventsList = () => {
  return (
    <div className="flex flex-col gap-y-[17px]  py-6 px-[25px] max-sm:py-2 max-sm:px-3 dark:bg-charcoal_black bg-white ">
      <h1 className="leading-[31.25px] dark:text-white text-charcoal_black text-[24px] font-bold  ">
        Upcoming Events
      </h1>
      <div className="flex items-center gap-x-[19px] ">
        <h3 className=" text-dove_gray leading-[18.23px] text-[14px] font-medium ">
          08:00
        </h3>
        <span
          className={`w-full h-[2px] dark:bg-gunmetal_gray bg-white_smoke `}
        ></span>
      </div>
      <div className="flex items-center gap-x-[19px]  ">
        <h3 className=" text-dove_gray leading-[18.23px] text-[14px] font-medium ">
          09:00
        </h3>
        <UpcomingEventsCard
          className="bg-amethyst_purple"
          src={IMAGES.AVATOR}
        />
      </div>
      <div className="flex items-center gap-x-[19px] ">
        <h3 className=" text-dove_gray leading-[18.23px] text-[14px] font-medium ">
          10:00
        </h3>
        <span
          className={` w-full h-[2px] dark:bg-gunmetal_gray bg-white_smoke  `}
        ></span>
      </div>
      <div className="flex items-center gap-x-[19px]  ">
        <h3 className=" text-light_coral_red_a leading-[18.23px] text-[14px] font-medium ">
          10:15
        </h3>
        <div className=" flex items-center w-full">
          <span className="bg-light_coral_red_a w-2.5 h-2.5 rounded-[50%] "></span>
          <span className=" bg-light_pink_red h-[2px] w-full  "></span>
        </div>
      </div>
      <div className="flex items-center gap-x-[19px] ">
        <h3 className=" text-dove_gray leading-[18.23px] text-[14px] font-medium ">
          11:00
        </h3>
        <span
          className={` w-full h-[2px] dark:bg-gunmetal_gray bg-white_smoke  `}
        ></span>
      </div>
      <div className="flex items-center gap-x-[19px]">
        <h3 className=" text-dove_gray leading-[18.23px] text-[14px] font-medium ">
          12:00
        </h3>
        <UpcomingEventsCard
          className="bg-medium_spring_green"
          src={IMAGES.AVATOR_IMG}
        />
      </div>
      <div className="flex items-center gap-x-[19px] ">
        <h3 className=" text-dove_gray leading-[18.23px] text-[14px] font-medium ">
          01:00
        </h3>
        <span
          className={` w-full h-[2px] dark:bg-gunmetal_gray bg-white_smoke`}
        ></span>
      </div>
    </div>
  );
};

export default UpcomingEventsList;
