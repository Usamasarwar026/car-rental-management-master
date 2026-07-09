import { useAppSelector } from "@/store/slices/store";

const useTopViewedCars = () => {
  const { cars } = useAppSelector((state) => state.carCrudStore);

  if (!Array.isArray(cars) || cars.length === 0) return [];
  const topViewedCars = [...cars].sort((a, b) => b.views - a.views).slice(0, 3);

  return topViewedCars;
};

export default useTopViewedCars;
