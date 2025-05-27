"use client";
import React from "react";
import RecommendCard from "./RecommendCard";
import Link from "next/link";
import usePopularCars from "@/hooks/usePopularCars";
import useBooking from "@/hooks/useBooking";

const RecommendSection = () => {
  const topViewedCars = usePopularCars();
  console.log("topViewedCars:>>", topViewedCars);
  const { clickeViewsHandler } = useBooking();

  const bgColors = ["bg-soft_beige", "bg-pale_blue_gray", "bg-light_rose_pink"];

  return (
    <>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px] w-full">
        {topViewedCars?.map((item, index) => (
          <Link href={`/dashboard/assets/${item?.id}`} key={item?.id}>
            <RecommendCard
              brand={item?.brand}
              carName={item?.carName}
              image={item?.imageUrl}
              price={item?.price}
              views={item?.views}
              onClick={() => clickeViewsHandler(item?.id)}
              className={bgColors[index % bgColors.length]}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecommendSection;
