import React from "react";
import Image from "next/image";

import { EventCardCalenderPropsTypes } from "@/types/types";

const UpcomingEventsCard: React.FC<EventCardCalenderPropsTypes> = ({
  src,
  className,
}) => {
  return (
    <div className={`${className} p-2.5  w-full rounded-[10px] `}>
      <h2 className="leading-[18.23px] text-[14px] font-medium text-white mb-1 ">
        Drift Series Firs Round
      </h2>
      <div className="flex items-center justify-between ">
        <h3 className="leading-[18.23px] text-[14px] font-medium text-white ">
          JDM
        </h3>
        <Image
          src={src!}
          alt="Avator img does not show"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
