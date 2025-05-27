"use client";
import { useState } from "react";
import { CarRentalFormType } from "@/types/types";

export default function CarRentalForm({
  title,
  icon,
  type,
  placeholder,
}: CarRentalFormType) {
  const [pickUpLocation, setPickUpLocation] = useState("");

  return (
    <>
      <div>
        <label className="block text-[16px] mb-[10px]">{title}</label>
        <div className="flex items-center bg-white p-2 rounded-lg border shadow-sm h-[56px]">
          <div className="mr-2">{icon}</div>
          <input
            type={type}
            placeholder={placeholder}
            className="w-full outline-none"
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
