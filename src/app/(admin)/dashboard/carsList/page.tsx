import CarsListCard from "@/components/carsList/CarsListCard";

export default function CarList() {
  return (
    <div className="container mx-auto">
      <h1 className="text-[30px] font-[700] dark:text-pure_white mb-5 transition-all duration-300">
        Car List
      </h1>
      <CarsListCard />
    </div>
  );
}
