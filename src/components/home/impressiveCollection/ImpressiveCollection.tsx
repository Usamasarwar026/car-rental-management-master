"use client";
import React from "react";
import HomeButton from "@/components/button/HomeButton";
import ImpressiveCollectionCard from "./ImpressiveCollectionCard";
import useFilterCars from "@/hooks/useFilterCars";
import { Loader } from "@/components/loader/Loader";

const ImpressiveCollection = () => {
  const { uniqueCarTypes, selectedCar, setSelectedCar, filterdCar, loading } =
    useFilterCars();

  return (
    <div className={`py-[100px] bg-white_smoke md:px-28 px-10`}>
      <div className="text-center max-w-[720px] mx-auto">
        <h1 className="text-[44px] font-[700]">
          Our Impressive Collection of Cars
        </h1>

        <p className="text-[18px] font-[500] mt-[24px] ">
          Ranging from elegant sedans to powerful sports cars, all carefully
          selected to provide our customers with the ultimate driving
          experience.
        </p>
      </div>
      {loading ? (
        <Loader style="w-8 h-8 border-4 border-amethyst_purple border-b-transparent rounded-full inline-block animate-spinCustom" />
      ) : (
        <>
          <div className="flex sm:flex-nowrap flex-wrap gap-[16px] justify-center mt-[48px]">
            <HomeButton
              title="Popular Cars"
              onClick={() => setSelectedCar(null)}
              style={` h-[50px] font-[500] px-[20px] flex item-center text-[18px] rounded-[58px] ${
                selectedCar === null
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-200 transition-all duration-250 ease-in-out"
              }`}
            />
            {uniqueCarTypes?.map((carType) => (
              <HomeButton
                key={carType}
                onClick={() => setSelectedCar(carType)}
                carType={carType}
                style={` h-[50px] font-[500] px-[20px] flex item-center text-[18px] rounded-[58px] ${
                  selectedCar === carType
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-200 transition-all duration-250 ease-in-out"
                }`}
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-[32px] my-[64px]">
            {filterdCar?.map((car) => (
              <ImpressiveCollectionCard
                key={car?.id}
                carId={car?.id}
                imageUrl={car?.imageUrl}
                carName={car?.carName}
                price={car?.price}
                milage={car?.mileage}
                enginType={car?.engine}
                transmissionType={car?.transmission}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImpressiveCollection;
