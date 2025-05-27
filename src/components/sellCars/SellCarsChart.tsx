"use client";

import { COLORS } from "@/constants/colors";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const data = [
  { name: "Mon", speed: 10 },
  { name: "Tue", speed: 8 },
  { name: "Wed", speed: 12 },
  { name: "Thu", speed: 23 },
  { name: "Fri", speed: 15 },
  { name: "Sat", speed: 18 },
  { name: "Sun", speed: 16 },
];

export default class SpeedChart extends PureComponent {
  render() {
    return (
      <div style={{ height: "400px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={COLORS.light_gray}
              horizontal={true}
              vertical={false}
            />

            <XAxis dataKey="name" stroke={COLORS.pure_white} tick={false} />

            <YAxis
              domain={[0, 30]}
              stroke={COLORS.pure_white}
              tick={{ fill: "black", fontSize: 14 }}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.dark_charcoal_a,
                border: "none",
                color: COLORS.pure_white,
              }}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            />

            <Bar
              dataKey="speed"
              fill={COLORS.light_coral_red}
              radius={[10, 10, 0, 0]}
              barSize={24}
            >
              {data.map((entry, index) => (
                <Label
                  key={index}
                  value={entry.name === "Thu" ? "23km/h" : ""}
                  position="top"
                  fill={COLORS.pure_white}
                  fontSize={14}
                  offset={10}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
