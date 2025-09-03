"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const GrapheDesVentes = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}>
        <CartesianGrid
          strokeDasharray="3 3"
          strokeOpacity={0.2}
        />
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--nextui-background))",
            borderColor: "hsl(var(--nextui-divider))",
          }}
        />
        <Legend iconSize={10} />
        <Bar
          dataKey="ventes"
          fill="hsl(var(--nextui-primary-500))"
          radius={[
            4,
            4,
            0,
            0,
          ]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
