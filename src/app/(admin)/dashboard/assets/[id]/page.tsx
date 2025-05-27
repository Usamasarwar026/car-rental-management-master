"use client";
import BlueCard from "@/components/assets/BlueCard";
import useAssets from "@/hooks/useAssets";
import Image from "next/image";

const Assets = () => {
  const { car } = useAssets();

  return (
    <div>
      <div className="flex justify-between">
        <h1
          className={`dark:text-pure_white text-charcoal_black leading-[39.06px] text-[24px] sm:text-[28px] md:text-[30px] font-bold`}
        >
          {car?.carName}
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 mt-4">
        <div className="flex flex-col dark:bg-charcoal_black h-[675px] bg-azure_blue rounded-[14px] w-full xl:w-[361px] p-5 transition-all duration-300">
          <div className="flex flex-col gap-5">
            <BlueCard
              title1="Brand"
              amount1={car?.brand}
              title2="Car Name"
              amount2={car?.carName}
            />
            <BlueCard
              title1="Transmission"
              amount1={car?.transmission}
              title2="KM Driven"
              amount2={car?.mileage}
            />
            <BlueCard
              title1="Engine"
              amount1={car?.engine}
              title2="Total Cost"
              amount2={`RS.${car?.price}`}
            />
          </div>

          <div className="flex justify-center mt-4">
            <Image
              src={car?.imageUrl || "/car.png"}
              alt="car img does not show"
              width={300}
              height={200}
              className="object-contain w-full h-auto rounded-[14px]"
            />
          </div>
        </div>

        {/* <div className="flex-1 flex flex-col gap-4">
          <ActivityCard />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Noties />
            <AvailableSensors />
          </div>
          <Reminder />
        </div> */}
      </div>
    </div>
  );
};

export default Assets;
