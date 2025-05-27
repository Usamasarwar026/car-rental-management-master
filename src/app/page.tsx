import Hero from "@/components/home/Hero";
import ServicesCard from "@/components/home/ServicesCard";
import ImpressiveCollection from "@/components/home/impressiveCollection/ImpressiveCollection";
import React from "react";
import { BsStars } from "react-icons/bs";
import client from "../../lib/contentfulClient";
import Testimonial from "@/components/home/Testimonial";
import CarBrandCard from "@/components/home/CarBrandCard";
import { IoArrowForwardOutline } from "react-icons/io5";
import Footer from "@/components/home/Footer";
import WorkCard from "@/components/home/WorkCard";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { CMSType } from "@/types/types";

const serviceData = async () => {
  const response = await client.getEntries({
    content_type: "services",
  });

  const services = response.items.map((item) => {
    return {
      heading: item.fields.heading || "",
      description: item.fields.description || "",
    };
  });

  return services;
};

const serviceCardData = async () => {
  const response = await client.getEntries({
    content_type: "serviceCard",
  });

  const serviceCard = response.items.map((item) => {
    return {
      heading: item.fields.heading || "",
      description: item.fields.description || "",
    };
  });

  return serviceCard;
};

const fetchCarBrands = async () => {
  const response = await client.getEntries({
    content_type: "carBrands",
  });

  const carBrands = response.items.map((item: CMSType) => {
    return {
      icon: item?.fields?.icon?.fields?.file?.url || "",
      name: item?.fields?.name || "",
    };
  });
  return carBrands;
};

const fetchCarBody = async () => {
  const response = await client.getEntries({
    content_type: "carBody",
  });

  const carBody = response.items.map((item: CMSType) => {
    return {
      icon: item?.fields?.icon?.fields?.file?.url || "",
      name: item?.fields?.name || "",
    };
  });
  return carBody;
};

const fetchWorkCard = async () => {
  const response = await client.getEntries({
    content_type: "worksCard",
  });

  const workCard = response.items.map((item: CMSType) => {
    return {
      icon: item?.fields?.icon?.fields?.file?.url || "",
      heading: item?.fields?.heading || "",
      description: item?.fields?.description || "",
    };
  });
  return workCard;
};

const Home = async () => {
  const services = await serviceData();
  const serviceCard = await serviceCardData();
  const data = await fetchCarBrands();
  const carBody = await fetchCarBody();
  const workCard = await fetchWorkCard();

  return (
    <div>
      <Hero />

      <div className="md:mx-28 mx-10 mt-[100px] mb-[120px]">
        <div className="flex justify-between items-center mb-[24px]">
          <h3 className="font-[700] text-[24px]">Rent by Brands</h3>
          <div className="flex items-center gap-[8px]">
            View all <IoArrowForwardOutline />
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-[20px]">
          {data?.map((item, index) => {
            return (
              <CarBrandCard
                key={index}
                icon={item.icon}
                name={String(item.name)}
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-[64px] mb-[24px]">
          <h3 className="font-[700] text-[24px]">Rent by Body type</h3>
          <div className="flex items-center gap-[8px]">
            <p className="font-[600] text-[14px]">View all</p>
            <IoArrowForwardOutline />
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-[20px] ">
          {carBody?.map((item, index) => {
            return (
              <CarBrandCard
                key={index}
                icon={item.icon}
                name={String(item.name)}
              />
            );
          })}
        </div>
      </div>

      <ImpressiveCollection />

      <div className="mt-[120px] mb-[100px] lg:mb-[130px] md:mx-28 mx-10">
        <div className="text-center max-w-[720px] mx-auto ">
          <h1 className="text-[48px] font-[700] mb-[24px]">How it woks</h1>
          <p className="text-[18px] font-[500] mb-[56px] lg:mb-[100px]">
            Renting a luxury car has never been easier. Our streamlined process
            makes it simple for you to book and confirm your vehicle of choice
            online
          </p>
        </div>

        <div className="relative flex items-center flex-col lg:flex-row">
          <div className="flex flex-col gap-[16px]">
            {workCard?.map((item, index) => {
              return (
                <WorkCard
                  key={index}
                  icon={item?.icon}
                  heading={String(item?.heading)}
                  desc={String(item?.description)}
                />
              );
            })}
          </div>

          <div
            className={`lg:absolute right-0 w-full h-[450px] lg:w-[740px] lg:h-[638px] bg-white_smoke flex justify-end items-center px-7 lg:pr-10 rounded-[24px] lg:mt-0 mt-4`}
          >
            <Image
              src={IMAGES.WORK_IMAGE}
              alt="image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <section
        className={`bg-charcoal_black text-pure_white py-[100px] md:px-28 px-10 text-center`}
      >
        {services?.map((item, index) => {
          return (
            <div key={index} className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-[48px] font-bold">
                {String(item.heading)}
              </h2>
              <p className="mt-[24px] font-[500] text-[16px]">
                {String(item.description)}
              </p>
            </div>
          );
        })}
        <div className="mt-[64px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {serviceCard?.map((item, index) => {
            return (
              <ServicesCard
                key={index}
                title={String(item.heading)}
                icon={<BsStars />}
                desc={String(item.description)}
              />
            );
          })}
        </div>
      </section>
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
