import { useAppDispatch } from "@/store/slices/store";
import useCarCrud from "./useCarCrud";
import { useEffect, useState } from "react";
import { carViews } from "@/store/slices/carCrudSlice";
import useModel from "./useModel";

const useBooking = () => {
  const dispatch = useAppDispatch();
  const { cars } = useCarCrud();
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const handleFilterCar =
    !selectedCar || selectedCar === "All Cars"
      ? cars
      : cars.filter((car) => car.brand === selectedCar);

  const clickeViewsHandler = async (id: string) => {
    await dispatch(carViews(id));
  };

  const uniqueCars = ["All Cars", ...new Set(cars.map?.((car) => car?.brand))];

  const { isOpen, setIsOpen, handleIsOpen } = useModel();
  const [selectedOption, setSelectedOption] = useState<string>(
    uniqueCars.length > 1 ? uniqueCars[1] : "All Cars"
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setSelectedCar(option);
    setIsOpen(false);
  };


  

  return {
    setSelectedCar,
    handleFilterCar,
    clickeViewsHandler,
    uniqueCars,
    isOpen,
    handleIsOpen,
    selectedOption,
    handleOptionClick,
    setSelectedOption,
    setIsOpen,
  };
};

export default useBooking;
