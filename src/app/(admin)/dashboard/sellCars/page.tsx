import BookingDropDown from "@/components/booking/BookingDropDown";
import OffersCard from "@/components/sellCars/OffersCard";
import SpeedChart from "@/components/sellCars/SellCarsChart";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import React from "react";

const SellCars = () => {
  return (
    <div className="px-4 md:px-8 lg:px-12">
      <h1 className="font-[700] text-[30px] mb-[30px] dark:text-pure_white transition-all duration-300">
        Sell Cars
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
        <div
          className={`w-full max-w-[657px] bg-pure_white rounded-[14px] px-[20px] md:px-[43px] py-[25px] flex flex-col dark:bg-charcoal_black dark:text-pure_white transition-all duration-300`}
        >
          <h2 className="font-[700] text-[24px] md:text-[30px]">
            2022 Mercedes Benz
          </h2>
          <Image
            src={IMAGES.SELL_CAR}
            alt="Car-Image"
            width={250}
            height={250}
            className="w-full max-w-[545px] h-auto mx-auto"
          />
        </div>

        <div className="bg-pure_white w-full md:max-w-[345px] rounded-[14px]">
          <h2 className="font-[700] text-[20px] md:text-[24px] mt-[28px] ml-[24px]">
            Tracking History
          </h2>
          <SpeedChart />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center my-[30px] gap-4">
        <h1 className="font-[700] text-[30px] dark:text-pure_white">Offers</h1>
        <div className="flex flex-wrap gap-[16px]">
          <BookingDropDown className="text-amethyst_purple" />
          <BookingDropDown className="text-amethyst_purple" />
        </div>
      </div>

      <div>
        <OffersCard />
        <OffersCard />
      </div>
    </div>
  );
};

export default SellCars;
