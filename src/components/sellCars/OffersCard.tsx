import Image from "next/image";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import OffrersIcon from "./OffrersIcon";
import { FaCarRear } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { BsCurrencyDollar } from "react-icons/bs";
import { IMAGES } from "@/constants/images";

const OffersCard = () => {
  return (
    <div className="mb-5 w-full px-4 py-5 bg-white rounded-lg dark:bg-charcoal_black dark:text-white transition-all duration-300 md:px-7 md:py-6">
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-6">
        <div className="w-full md:w-auto text-center md:text-left">
          <h3 className="font-bold text-lg md:text-xl lg:text-[20px]">
            Killan James
          </h3>
          <div className="mt-1">
            <span className="font-medium text-base md:text-lg text-light_red_a">
              $16,605
            </span>
            <span className="font-medium text-xs md:text-sm text-light_gray ml-2">
              avarage price
            </span>
          </div>
          <p className="font-medium text-xs md:text-sm text-dove_gray mt-1">
            market avarage is $16,224
          </p>
          <button className="bg-light_coral_red px-3 py-1 md:px-4 rounded-lg mt-2 inline-flex items-center">
            <FaArrowRightLong size={11} color="white" />
          </button>
        </div>

        <div className="w-full md:w-auto flex flex-col items-center">
          <Image
            src={IMAGES.CHART}
            alt="chart"
            width={100}
            height={100}
            className="w-16 md:w-20 lg:w-[83px] h-auto"
          />
          <p className="font-bold text-xs md:text-sm lg:text-[14px] text-dove_gray mt-2">
            Impression Share
          </p>
        </div>

        <div className="w-full md:w-auto">
          <Image
            src={IMAGES.CIRCLE}
            alt="chart"
            width={100}
            height={100}
            className="w-20 md:w-24 lg:w-[98px] h-auto mx-auto"
          />
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-6 justify-center items-center">
          <OffrersIcon
            title="$1,174"
            para="Model Spend"
            icon={<FaCarRear />}
            iconStyle="text-vivid_blue_light bg-vivid_blue_light_translucent"
            style="text-vivid_blue_light"
          />
          <OffrersIcon
            title="$1,174"
            para="Model Spend"
            icon={<RiShareForwardLine />}
            iconStyle="text-light_coral_red bg-soft_pink_red_translucent"
            style="text-light_coral_red"
          />
          <OffrersIcon
            title="$811"
            para="Spend per Unit Turned"
            icon={<BsCurrencyDollar />}
            iconStyle="text-amethyst_purple bg-amethyst_purple_transparent"
            style="text-amethyst_purple"
          />
        </div>
      </div>
    </div>
  );
};

export default OffersCard;
