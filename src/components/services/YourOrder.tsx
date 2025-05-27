import Image from "next/image";
import React from "react";
import YourOrderCard from "./YourOrderCard";
import { IMAGES } from "@/constants/images";

const YourOrder = () => {
  return (
    <div className=" flex flex-col">
      <div className=" flex max-lg:flex-col w-full gap-5 ">
        <div className=" flex flex-col items-center justify-center gap-y-6 rounded-[10px] dark:bg-charcoal_black bg-white px-[34px] py-[30px] ">
          <h1 className="dark:text-white  text-charcoal_black leading-[31.25px] text-[24px] font-bold ">
            Your Order
          </h1>
          <Image
            src={IMAGES.SERVICE_TIME_GRAPH}
            alt="your order img does not show"
            width={148}
            height={153}
          />
        </div>
        <div className="flex-1 flex flex-col gap-y-2.5 ">
          <YourOrderCard
            circleDesign="bg-medium_spring_green"
            amount="$32"
            heading="Brake fluid change"
          />
          <YourOrderCard
            circleDesign="bg-light_coral_red "
            amount="$32"
            heading="Diagnostics"
          />
          <YourOrderCard
            circleDesign="bg-amethyst_purple "
            amount="$10"
            heading="External Washing"
          />
          <button className="dark:bg-charcoal_black dark:text-white bg-soft_cream text-slate_gray text-[20px] font-bold leading-[26.04px] mt-0.5 py-[15px] rounded-[8px] border dark:border-charcoal_gray_dark border-lavender_gray_a border-dashed ">
            Add Services
          </button>
        </div>
      </div>
      <button className="text-center mt-5 leading-[31.25px] text-[24px] text-white font-bold bg-amethyst_purple py-[14px] rounded-[10px]  ">
        Pay $86
      </button>
    </div>
  );
};

export default YourOrder;
