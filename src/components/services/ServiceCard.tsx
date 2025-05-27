import React from "react";
import { ServicesSmallCardPropsTypes } from "@/types/types";

const ServicesSmallCard: React.FC<ServicesSmallCardPropsTypes> = ({
  className,
  title,
}) => {
  return (
    <div
      className={` ${className} dark:bg-charcoal_black dark:shadow[0px_8px_24px_rgba(255, 126, 134, 0.3)] bg-white rounded-[4px] grid place-items-center w-[50px] py-[22px] `}
    >
      <h2
        className={`${className}  text-dove_gray leading-[26.04px] text-[20px] font-bold`}
      >
        {title}
      </h2>
    </div>
  );
};

export default ServicesSmallCard;
