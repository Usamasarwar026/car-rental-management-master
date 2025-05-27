import React from "react";
import { FaRegComment } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import { SlWrench } from "react-icons/sl";
import NotiesCard from "./NotiesCard";

const Noties = () => {
  return (
    <div className="flex-1 dark:bg-charcoal_black bg-pure_white px-5 py-[13px] rounded-[14px] transition-all duration-300">
      <h1 className="dark:text-pure_white leading-[26.04px] text-[20px] font-bold  ">
        Noties
      </h1>
      <div className=" flex flex-col gap-y-[18px] mt-4 ">
        <NotiesCard
          className="text-pure_white bg-medium_spring_green"
          icon={
            <FaRegComment className="w-4 h-4 text-charcoal_black dark:text-pure_white " />
          }
          date="COMPLETED"
          para="Book for General Service"
          title="Monday, 6th Apirl 2020"
        />
        <NotiesCard
          className=" dark:text-pure_white dark:bg-dark_charcoal  text-charcoal_black bg-light_gray_blue_a"
          icon={<BsExclamationCircle className="w-4 h-4 text-light_red " />}
          date="14:07-21/11/2021"
          para="Vehicle LV 001 has been marked for recall."
          title="Thursday, 24th October 2021"
        />
        <NotiesCard
          className="dark:text-pure_white dark:bg-dark_charcoal text-charcoal_black bg-light_gray_blue_a"
          icon={<SlWrench className="w-4 h-4 text-dove_gray " />}
          date="14:07-21/11/2021"
          para="Maintenance Completed, Collect"
          title="Monday, 13th August 2018"
        />
      </div>
    </div>
  );
};

export default Noties;
