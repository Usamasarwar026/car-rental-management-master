
import React from "react";
import client from "../../../lib/contentfulClient";
import HomeNavbar from "./HomeNavbar";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import CarRentalForm from "./CarSearchInput";
import { IoLocationOutline } from "react-icons/io5";
import HomeButton from "../button/HomeButton";
import Image from "next/image";
import { CMSType } from "@/types/types";

const fetchHero = async () => {
  try {
    const response = await client.getEntries({
      content_type: "hero",
    });

    const heroSec = response.items?.map((item: CMSType) => {
      const imageUrl = item?.fields?.image?.fields?.file?.url || "";
      const cleanedUrl = imageUrl.replace(/^https?:/, '');
      const fullImageUrl = `https:${cleanedUrl}`;

      return {
        title: item?.fields?.title || "",
        description: item?.fields?.description || "",
        image: fullImageUrl,
      };
    });

    return heroSec;
  } catch {
    return [];
  }
};

const Hero = async () => {
  const data = await fetchHero();
  return (
    <>
      <div className="bg-black md:h-[833px] h-auto">
        <HomeNavbar />

        {data?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col-reverse lg:flex-row items-center justify-between py-12 gap-8"
          >
            <div className="text-white text-center lg:text-left max-w-2xl lg:ml-28 md:mx-0 mx-10">
              <h1 className="font-[700] text-4xl leading-tight lg:text-[64px]">
                {item.title}
              </h1>
              <p className="text-[18px] lg:text-[18px] mt-[40px] mb-[24px]">
                {item.description}
              </p>

              <div className="border-t-2 border-gray-500 mt-6 pt-4">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <IoIosArrowDroprightCircle className="text-3xl" />
                  <button className="text-lg font-medium hover:underline">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[50%] flex justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={700}
                height={700}
                className="w-full max-w-[500px] lg:max-w-[1000px] object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      <div className="lg:-mt-20 mt-0 shadow-xl bg-white_overlay p-4 pt-8 rounded-none md:rounded-[16px] max-w-[1216px] h-auto md:h-[145px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <CarRentalForm
            icon={<IoLocationOutline />}
            type="text"
            placeholder="Search a location"
            title="Pick-up Location"
          />
          <CarRentalForm
            icon={<IoLocationOutline />}
            type="date"
            title="Pick-up date"
          />
          <CarRentalForm
            icon={<IoLocationOutline />}
            type="text"
            placeholder="Search a location"
            title="Drop-off Location"
          />
          <CarRentalForm
            icon={<IoLocationOutline />}
            type="date"
            title="Drop-off date"
          />
          <HomeButton
            title="Find a Vehicle"
            style="w-full md:w-[177px] h-[56px] flex justify-center rounded-[64px] font-[700] text-[16px] text-white bg-black md:-mb-8 mb-0"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;