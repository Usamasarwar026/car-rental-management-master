import React from "react";
import { HomeButtonType } from "@/types/types";

const HomeButton = ({
  title,
  carType,
  style,
  onClick,
  icon,
  desc,
}: HomeButtonType) => {
  return (
    <>
      <div onClick={onClick} className={`${style} cursor-pointer`}>
        <div>{icon}</div>
        {icon ? (
          <div>
            <p className="text-[12px] font-[500]">{desc}</p>
            <h4 className="font-bold text-[18px]">
              {title ||
                (carType
                  ? carType.charAt(0).toUpperCase() +
                    carType.slice(1).toLowerCase()
                  : "")}
            </h4>
          </div>
        ) : (
          <button>
            {title ||
              (carType
                ? carType.charAt(0).toUpperCase() +
                  carType.slice(1).toLowerCase()
                : "")}
          </button>
        )}
      </div>
    </>
  );
};

export default HomeButton;
