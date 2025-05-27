"use client";
import Image from "next/image";
import React from "react";
import useCarCrud from "@/hooks/useCarCrud";
import CarCrudBtn from "../button/CarCrudBtn";
import useModel from "@/hooks/useModel";
import UpdateModal from "../modal/UpdateModal";
import { useAppDispatch } from "@/store/slices/store";
import { setUpdateCarData } from "@/store/slices/carCrudSlice";
import { Loader } from "../loader/Loader";

const CarsListCard = () => {
  const { cars, deleteHandler, loading } = useCarCrud();
  const { isOpen, handleIsOpen, handleOverlayClick } = useModel();
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center w-full mt-20">
          <Loader style="w-8 h-8 border-4 border-amethyst_purple border-b-transparent rounded-full inline-block animate-spinCustom" />
        </div>
      ) : (
        <>
          {cars?.map((car) => (
            <div key={car.id}>
              <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-4 p-4 bg-white shadow-md rounded-[16px] hover:bg-gray-100 dark:bg-charcoal_black transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="min-w-[130px] flex items-center pl-0 sm:pl-5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-all duration-300">
                      {car?.carName}
                    </h2>
                  </div>
                  <Image
                    src={car?.imageUrl}
                    alt="car-image"
                    width={150}
                    height={100}
                    className="w-full sm:w-[150px] h-[100px] object-cover rounded-[16px] border-2 border-gray-300"
                  />
                  <div className="text-sm text-gray-600 dark:text-white space-y-1 transition-all duration-300">
                    <div className="flex gap-2">
                      <p className="font-bold">Model:</p>
                      <p>{car?.model}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Engine:</p>
                      <p>
                        {car?.engine?.slice(0, 1).toUpperCase()}
                        {car?.engine?.slice(1).toLowerCase()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Price:</p>
                      <p>{car?.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Description:</p>
                      <p className="block lg:hidden">
                        {car?.description?.slice(0, 15)}...
                      </p>
                      <p className="hidden lg:block">
                        {car?.description?.slice(0, 50)}...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <CarCrudBtn
                    title="Update"
                    onClick={() => {
                      handleIsOpen();
                      dispatch(setUpdateCarData(car));
                    }}
                    style="bg-blue-500 hover:bg-blue-600 w-full md:w-[100px] text-white px-4 py-2 rounded"
                  />
                  <CarCrudBtn
                    title="Delete"
                    onClick={() => deleteHandler(car?.id)}
                    style="bg-red-500 hover:bg-red-600 w-full md:w-[100px] text-white px-4 py-2 rounded"
                  />
                </div>
              </div>

              {isOpen && (
                <UpdateModal
                  car={car}
                  handleIsOpen={handleIsOpen}
                  handleOverlayClick={handleOverlayClick}
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CarsListCard;
