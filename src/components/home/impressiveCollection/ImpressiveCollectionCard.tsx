"use client";
import Image from "next/image";
import React from "react";
import { SlSpeedometer } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { TbGasStation } from "react-icons/tb";
import { TbManualGearbox } from "react-icons/tb";
import HomeButton from "@/components/button/HomeButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImpressiveCollectionCardType } from "@/types/types";

const ImpressiveCollectionCard = ({
  carId,
  imageUrl,
  carName,
  price,
  milage,
  enginType,
  transmissionType,
}: ImpressiveCollectionCardType) => {
  const session = useSession();
  const router = useRouter();

  const rentNow = () => {
    if (session) {
      router.push(`/dashboard/assets/${carId}`);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <>
      <div className="w-[384px] h-[555px] border bg-white hover:shadow-lg duration-300 ease-in-out rounded-[24px] p-[8px]">
        <div className="w-full h-[260px]">
          <Image
            src={imageUrl}
            alt="Impressive Collection Card"
            width={384}
            height={538}
            className="w-full h-full rounded-[18px]"
          />
        </div>

        <div>
          <div className="mt-[24px] mb-[16px] ml-[24px]">
            <span className="font-[600] text-[20px] ">{carName}</span>
            <div className="mt-[10px]">
              <span className="font-[800] text-[32px]">{price}</span>
              <span className="text-black_translucent font-[600] text-[16px]">
                /day
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center justify-evenly w-[336px] h-[63px] bg-off_white_a rounded-[16px] border mb-[20px]">
              <div className="flex flex-col items-center w-[56px] gap-[6px]">
                <SlSpeedometer className="w-[20px]" />
                <p className="font-[500]">
                  {milage.charAt(0).toUpperCase() +
                    milage.slice(1).toLowerCase()}
                </p>
              </div>
              <div className="flex flex-col items-center w-[56px] gap-[6px]">
                <TbManualGearbox className="w-[20px]" />
                <p className="font-[500]">
                  {transmissionType.charAt(0).toUpperCase() +
                    transmissionType.slice(1).toLowerCase()}
                </p>
              </div>
              <div className="flex flex-col items-center w-[66px] gap-[6px]">
                <FiUsers className="w-[20px]" />
                <p className="font-[500]">4 Person</p>
              </div>
              <div className="flex flex-col items-center w-[56px] gap-[6px]">
                <TbGasStation className="w-[20px]" />
                <p className="font-[500]">
                  {enginType.charAt(0).toUpperCase() +
                    enginType.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <HomeButton
              title="Rent Now"
              onClick={rentNow}
              style={
                "w-[336px] py-[12px] text-center border border-black rounded-[32px] text-[16px] font-[600] hover:bg-black hover:text-white transition-all duration-250 ease-in-out"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImpressiveCollectionCard;
