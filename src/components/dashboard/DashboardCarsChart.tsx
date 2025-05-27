"use client";
import { COLORS } from "@/constants/colors";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "7 pm", uv: 4000, pv: 2400, amt: 2400 },
  { name: "9 pm", uv: 3000, pv: 1398, amt: 2210 },
  { name: "11 pm", uv: 2000, pv: 9800, amt: 2290 },
  { name: "1 pm", uv: 2780, pv: 3908, amt: 2000 },
  { name: "3 pm", uv: 1890, pv: 4800, amt: 2181 },
  { name: "5 pm", uv: 2390, pv: 3800, amt: 2500 },
  { name: "7 pm", uv: 3490, pv: 4300, amt: 2100 },
];

const DashboardCarsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={COLORS.vivid_orange}
              stopOpacity={0.7}
            />
            <stop
              offset="100%"
              stopColor={COLORS.vivid_orange}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={true}
          horizontal={false}
          stroke={COLORS.light_gray}
        />
        <XAxis dataKey="name" />
        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: "5px",
            padding: "5px 8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          wrapperStyle={{
            outline: "none",
          }}
          itemStyle={{
            color: COLORS.vivid_orange,
            fontWeight: 700,
            fontSize: "10px",
          }}
          labelStyle={{
            fontWeight: 700,
            fontSize: "10px",
          }}
        />

        <Area
          type="monotone"
          dataKey="pv"
          stroke={COLORS.vivid_orange}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardCarsChart;
