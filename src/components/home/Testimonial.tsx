import React from "react";
import client from "../../../lib/contentfulClient";
import { MdArrowBack } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
import Image from "next/image";
import { CMSType } from "@/types/types";

const fetchTestimonial = async () => {
  const response = await client.getEntries({
    content_type: "testimonial",
  });

  const testimonials = response.items.map((item: CMSType) => {
    // const imageUrl = item?.fields?.image?.fields?.file?.url || "";
    // const fullImageUrl = imageUrl.startsWith("//")
    //   ? `https:${imageUrl}`
    //   : imageUrl.startsWith("http")
    //   ? imageUrl
    //   : `https:${imageUrl}`;

    return {
      heading: item?.fields?.heading || "",
      description: item?.fields?.description || "",
    //   image: fullImageUrl,
      userName: item?.fields?.userName || "",
      area: item?.fields?.area || "",
    };
  });
  return testimonials;
};
const Testimonial = async () => {
  const data = await fetchTestimonial();
  return (
    <div className="mx-10 md:mx-28">
      {data?.map((item, index) => {
        return (
          <div key={index} className="mb-[72px]">
            <div className="flex justify-between md:flex-row flex-col mt-[120px] mb-[72px]">
              <div className="">
                <h1 className="font-[700] md:text-[40px] text-[35px] text-center">
                  {String(item.heading)}
                </h1>
              </div>
              <div className="flex gap-4 justify-center mt-5 md:mt-0">
                <button className="flex items-center justify-center w-[64px] h-[64px] rounded-full text-[24px] border border-silver_gray text-silver_gray focus:bg-charcoal_black focus:text-white">
                  <MdArrowBack />
                </button>
                <button className="flex items-center justify-center w-[64px] h-[64px] rounded-full text-[24px] border border-silver_gray text-silver_gray focus:bg-charcoal_black focus:text-white">
                  <MdArrowForward />
                </button>
              </div>
            </div>

            <p className="font-[600] text-[32px] mb-[64px] text-jet_black_a">
              {String(item.description)}
            </p>

            <div className="flex items-center gap-[24px]">
              {/* <Image
                src={String(item.image)}
                alt="profile-photo"
                width={150}
                height={150}
                className="w-[80px] h-[80px] rounded-full"
              /> */}
              <div className="">
                <h3 className="font-[700] text-[24px] text-jet_black_a">
                  {String(item.userName)}
                </h3>
                <p className="text-[20px] text-dim_gray">{String(item.area)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Testimonial;
