"use client";
import Image from "next/image";
import React from "react";
import { FaArrowsSpin } from "react-icons/fa6";
import { TfiSettings } from "react-icons/tfi";
import { SlEnergy } from "react-icons/sl";
import { RecommendCardPropsTypes } from "@/types/types";

const RecommendCard: React.FC<RecommendCardPropsTypes> = ({
  brand,
  className,
  carName,
  image,
  price,
  views,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} group bg-opacity-80 rounded-[14px] p-4 sm:p-6 md:p-8 space-y-4 shadow-md w-full`}
    >
      <div className="flex items-center gap-x-2">
        <FaArrowsSpin className="w-5 md:w-6 h-5 md:h-6 text-gray-600" />
        <h3 className="text-gray-800 font-bold text-sm md:text-base">
          64% Recommend
        </h3>
      </div>

      <div className="w-full aspect-[3/2] my-3 overflow-hidden rounded-[16px]">
        <Image
          src={image}
          alt="Car Image"
          width={100}
          height={66}
          className="rounded-[16px] w-full aspect-[3/2] group-hover:scale-110 transition-all duration-300"
        />
      </div>

      <div>
        <h2 className="text-gray-900 font-bold text-lg md:text-xl">
          {brand} {carName}
        </h2>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-x-3">
            <h4 className="text-gray-600 text-sm md:text-base font-medium">
              {views}
            </h4>
            <TfiSettings className="w-4 md:w-5 h-4 md:h-5 text-gray-500" />
            <SlEnergy className="w-4 md:w-5 h-4 md:h-5 text-gray-500" />
          </div>

          <h3 className="text-gray-600 text-sm md:text-base font-medium">
            RS.{price}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RecommendCard;
