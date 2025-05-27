"use client";
import BookingCard from "@/components/booking/BookingCard";
import BookingDropDown from "@/components/booking/BookingDropDown";
import useBooking from "@/hooks/useBooking";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { LuLayoutGrid } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";

const Booking = () => {
  const {
    setSelectedCar,
    handleFilterCar,
    clickeViewsHandler,
    uniqueCars,
    isOpen,
    handleIsOpen,
    selectedOption,
    setSelectedOption,
    setIsOpen,
  } = useBooking();

  const session = useSession();

  return (
    <div>
      <h1 className="font-[700] text-[30px] mb-[30px] dark:text-pure_white">
        Booking
      </h1>
      <div className="flex max-sm:flex-wrap  gap-3 justify-between items-center mb-[34px]">
        <div className="flex gap-4">
          <BookingDropDown
            isOpen={isOpen}
            uniqueCars={uniqueCars}
            handleIsOpen={handleIsOpen}
            selectedOption={selectedOption}
            setSelectedCar={setSelectedCar}
            setSelectedOption={setSelectedOption}
            setIsOpen={setIsOpen}
            className="text-slate_gray"
          />
        </div>

        <div className="flex gap-[16px]">
          <div
            className={`w-[44px] h-[44px] rounded-full bg-pure_white flex justify-center items-center shadow-md dark:text-pure_white dark:bg-charcoal_black`}
          >
            <LuLayoutGrid className="w-[24px]" />
          </div>
          <div className="w-[44px] h-[44px] rounded-full bg-purple-500 flex justify-center items-center text-pure_white shadow-md">
            <VscSettings className="w-[24px]" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {handleFilterCar.length > 0 ? (
          handleFilterCar.map((car, index) =>
            session.data?.user?.role === "ADMIN" ? (
              <Link href={`/dashboard/assets/${car?.id}`} key={index}>
                <BookingCard
                  id={car?.id}
                  brand={car?.brand}
                  carName={car?.carName}
                  carImage={car?.imageUrl}
                  price={car?.price}
                  views={car?.views}
                  engine={car?.engine}
                  onClick={() => clickeViewsHandler(car?.id)}
                />
              </Link>
            ) : (
              <div key={index}>
                <BookingCard
                  id={car?.id}
                  brand={car?.brand}
                  carName={car?.carName}
                  carImage={car?.imageUrl}
                  price={car?.price}
                  views={car?.views}
                  engine={car?.engine}
                  onClick={() => clickeViewsHandler(car?.id)}
                />
              </div>
            )
          )
        ) : (
          <p className="text-gray-500 dark:text-pure_white font-bold text-xl">
            No cars available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Booking;
