import ServicesRequired from "@/components/services/ServiceRequired";
import ServicesSchedule from "@/components/services/ServicesSchedule";
import ServicesStation from "@/components/services/ServicesStation";
import VehicleConditionSummary from "@/components/services/VehicleConditionSummary";
import YourOrder from "@/components/services/YourOrder";
import { IMAGES } from "@/constants/images";
import React from "react";

const Services = () => {
  return (
    <div className="p-4 max-sm:p-1 ">
      <div className="flex max-xl:flex-col gap-4">
        <div className="flex-1">
          <ServicesStation />
          <YourOrder />
        </div>
        <div className="flex-1">
          <ServicesRequired />
          <ServicesSchedule />
        </div>
      </div>

      <div className="mt-8">
        <div className={`grid place-items-center sm:place-items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 dark:bg-charcoal_black bg-pure_white p-6 rounded-[14px]`}>
          <VehicleConditionSummary
            className="bg-amethyst_purple w-full"
            condition="Don’t Replace"
            parts="Engine"
            title="Oil Level"
            imgSrc={IMAGES.OIL_LEVEL}
          />

          <VehicleConditionSummary
            className="bg-medium_spring_green w-full"
            condition="Still Good"
            parts="Wheels"
            title="Brake Pads"
            imgSrc={IMAGES.BRAKE_PAD}
          />

          <VehicleConditionSummary
            className="bg-vibrant_yellow w-full"
            condition="Need Change"
            parts="Drivetrain"
            title="Steering"
            imgSrc={IMAGES.STEERING}
          />

          <VehicleConditionSummary
            className="bg-vivid_orange w-full"
            condition="Don’t Replace"
            parts="Engine"
            title="Oil Level"
            imgSrc={IMAGES.OIL_LEVEL}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
