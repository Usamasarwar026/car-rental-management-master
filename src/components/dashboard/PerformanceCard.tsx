import Image from "next/image";
import React from "react";
import { PerformanceCardPropsTypes } from "@/types/types";

const PerformanceCard: React.FC<PerformanceCardPropsTypes> = ({
  className1 = "",
  heading = "Performance",
  src,
  chart,
}) => {
  return (
    <div
      className={` ${className1} group dark:bg-charcoal_black transition-all duration-300 flex flex-col justify-between items-center gap-y-4 md:gap-y-0 rounded-2xl p-4 sm:p-6 md:p-8 w-full bg-white shadow-md hover:bg-amethyst_purple dark:hover:bg-amethyst_purple h-[320px]
      `}
    >
      {/* Top Section */}
      <div className="flex flex-col justify-between items-center gap-y-2 md:gap-y-4">
        {src && (
          <Image
            src={src}
            alt="Performance Image"
            width={200}
            height={200}
            className="object-contain w-[38px] h-[38px]"
          />
        )}
        <h3
          className={`text-charcoal_black dark:text-white text-2xl font-bold text-center group-hover:text-white transition-colors duration-300`}
        >
          {heading}
        </h3>
      </div>

      <div>{chart}</div>
    </div>
  );
};

export default PerformanceCard;
