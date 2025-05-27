import React from "react";
import { FaCaretDown } from "react-icons/fa6";
import AvailableSensorsCard from "./AvailableSensorsCard";

const AvailableSensors = () => {
  return (
    <div className=" flex-1 rounded-[14px] dark:bg-charcoal_black bg-pure_white p-5 flex flex-col items-start transition-all duration-300">
      <div className=" flex items-center  justify-between w-full ">
        <h1 className="text-black leading-[23.44px] text-[18px] font-medium dark:text-pure_white ">
          Available Sensors
        </h1>
        <div className=" flex justify-center items-center gap-x-2 ">
          <h5 className="text-dove_gray text-[12px] font-medium leading-[15.62px] ">
            Assets
          </h5>
          <FaCaretDown className="text-dove_gray w-4 h-4" />
        </div>
      </div>
      <span className="h-[1px] w-full bg-light_off_white my-5 "></span>
      <div className="flex flex-col gap-y-4 ">
        <AvailableSensorsCard unit="10" para="Fuel Consumed" />
        <AvailableSensorsCard unit="km" para="Odometer" />
        <AvailableSensorsCard unit="km" para="Runtime" />
        <AvailableSensorsCard unit="hr" para="Speed" />
        <AvailableSensorsCard unit="deg C" para="Temperature" />
      </div>
      <button className="text-center rounded-[5px] mt-5 bg-light_coral_red py-[2.5px] px-3 text-pure_white leading-[21px] text-[14px] font-medium ">
        See All
      </button>
    </div>
  );
};

export default AvailableSensors;
