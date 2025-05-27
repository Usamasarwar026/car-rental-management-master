import Image from "next/image";
import React from "react";
import { ImageType } from "@/types/types";

const CarBrandCard = ({ name, icon }: ImageType) => {
  const imageUrl = icon.startsWith("//") ? `https:${icon}` : icon;

  return (
    <div className="flex items-center justify-center flex-col rounded-[8px] md:w-[185px] w-full h-[120px] bg-transparent_black">
      <Image src={imageUrl} alt="icon" width={50} height={50} />
      <p className="text-jet_black_a font-[500] text-[16px] mt-[12px]">
        {name}
      </p>
    </div>
  );
};

export default CarBrandCard;
