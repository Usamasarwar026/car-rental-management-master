import { COLORS } from "@/constants/colors";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  { name: "1 PM", uv: 4000, pv: 2400, amt: 2400 },
  { name: "2 PM", uv: 3000, pv: 1398, amt: 2210 },
  { name: "3 PM", uv: 2000, pv: 9800, amt: 2290 },
  { name: "4 PM", uv: 2780, pv: 3908, amt: 2000 },
  { name: "5 PM", uv: 1890, pv: 4800, amt: 2181 },
  { name: "6 PM", uv: 2390, pv: 3800, amt: 2500 },
  { name: "7 PM", uv: 3490, pv: 4300, amt: 2100 },
];
const DashboardMilesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        margin={{ top: 15, right: 30, left: 20, bottom: 1 }}
        barSize={28}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <Tooltip
          contentStyle={{
            zIndex: 30,
            backgroundColor: COLORS.dark_charcoal_b,
            borderRadius: "5px",
            padding: "5px 8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          wrapperStyle={{
            outline: "none",
          }}
          itemStyle={{
            color: "white",
            fontWeight: 700,
            fontSize: "10px",
          }}
          labelStyle={{
            color: "white",
            fontWeight: 700,
            fontSize: "10px",
          }}
        />

        {data.map((entry, index) => (
          <ReferenceLine
            key={index}
            x={entry.name}
            stroke={COLORS.light_gray}
          />
        ))}

        <Bar dataKey="pv" fill={COLORS.vivid_blue} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardMilesChart;
