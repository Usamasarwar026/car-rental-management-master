import { useState } from "react";
import useCarCrud from "./useCarCrud";

const useFilterCars = () => {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const { cars, loading } = useCarCrud();

  const uniqueCarTypes = [...new Set(cars?.map((car) => car.carType))];

  const filterdCar = Array.isArray(cars)
    ? selectedCar == null
      ? cars
      : cars?.filter((car) => car?.carType === selectedCar)
    : [];

  return {
    cars,
    selectedCar,
    setSelectedCar,
    uniqueCarTypes,
    loading,
    filterdCar,
  };
};

export default useFilterCars;
