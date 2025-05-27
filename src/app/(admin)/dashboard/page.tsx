"use client";
import React from "react";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecommendSection from "@/components/dashboard/RecommendSection";
import PerformenceChart from "@/components/dashboard/PerformenceChart";
import { IMAGES } from "@/constants/images";
import { COLORS } from "@/constants/colors";

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <PerformanceCard
          className1="bg-amethyst_purple"
          heading="Energy"
          src={IMAGES.LIGHTNING_ICON}
          chart={<PerformenceChart title="45%" progressColor={COLORS.purple} />}
        />
        <PerformanceCard
          className1="bg-pure_white"
          heading="Range"
          src={IMAGES.DASHBOARD_CARD_ICON}
          chart={<PerformenceChart title="57%" progressColor={COLORS.soft_pink_red} />}
        />
        <PerformanceCard
          className1="bg-pure_white"
          heading="Break fluid"
          src={IMAGES.BLOOD_ICON}
          chart={<PerformenceChart title="9%" progressColor={COLORS.purple} />}
        />
        <PerformanceCard
          className1="bg-pure_white"
          heading="Tire Wear"
          src={IMAGES.TIER_ICON}
          chart={<PerformenceChart title="25%" progressColor={COLORS.vibrant_yellow} />}
        />
      </div>

      <div className="my-8 md:grid md:grid-cols-2 grid grid-cols-1 gap-[30px]">
        <DashboardCharts heading="Miles" para="256 Miles" />
        <DashboardCharts
          heading="Car"
          para="20 February 2022"
          className1="flex-row-reverse"
          className2="bg-lavender_gray rounded-[10px] dark:bg-dark_charcoal "
          className3=" focus:bg-vivid_orange "
        />
      </div>

      <RecommendSection />
    </div>
  );
};

export default Dashboard;
