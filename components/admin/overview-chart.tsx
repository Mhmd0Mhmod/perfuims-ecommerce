"use client";

import { formatCurrency } from "@/lib/utils";
import { MonthlyStat } from "@/types/dashboard";
import { getCookie } from "cookies-next/client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface OverviewChartProps {
  data: MonthlyStat[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  const countryCode = getCookie("country_code");
  const chartData = data.map((stat) => ({
    name: stat.month,
    total: stat.totalRevenue,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatCurrency({ amount: value, code: countryCode as string })}
          orientation="right"
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{ borderRadius: "8px", direction: "rtl", textAlign: "right" }}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
}
