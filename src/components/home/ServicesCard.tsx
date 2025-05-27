import { ServicesCardType } from "@/types/types";

const ServicesCard = ({ title, icon, desc }: ServicesCardType) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-white w-[48px] h-[48px] grid place-items-center rounded-full shadow-md">
        <div className="text-black text-[20px]">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-light_gray_a mt-2 max-w-xs">{desc}</p>
    </div>
  );
};

export default ServicesCard;
