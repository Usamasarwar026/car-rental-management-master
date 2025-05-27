import { COLORS } from "@/constants/colors";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { PerformenceChartProps } from "@/types/types";

export default class PerformenceChart extends PureComponent<PerformenceChartProps> {
  renderCustomLabel = () => {
    const { title } = this.props;
    return (
      <text
        x={100}
        y={100}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        {title || "0%"}
      </text>
    );
  };

  render() {
    const { title, progressColor } = this.props;

    const percentage = parseFloat(title) || 0;
    const remaining = 100 - percentage;

    const data = [
      { name: "Progress", value: percentage },
      { name: "Remaining", value: remaining },
    ];

    const COLOR = [
      progressColor || COLORS.gainsboro_gray,
      COLORS.charcoal_gray,
    ];

    return (
      <div style={{ width: "200px", height: "200px" }}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            innerRadius={40}
            outerRadius={50}
            fill={COLORS.light_indigo}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            label={this.renderCustomLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR[index % COLOR.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}
