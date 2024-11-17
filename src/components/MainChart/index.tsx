"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BadgeDollarSign } from "lucide-react";

const chartData = [
  { month: "Janeiro", treinador1: 35, treinador2: 28, treinador3: 17 },
  { month: "Fevereiro", treinador1: 24, treinador2: 38, treinador3: 21 },
  { month: "Março", treinador1: 18, treinador2: 35, treinador3: 25 },
  { month: "Abril", treinador1: 33, treinador2: 22, treinador3: 16 },
  { month: "Maio", treinador1: 28, treinador2: 31, treinador3: 19 },
  { month: "Junho", treinador1: 22, treinador2: 29, treinador3: 13 },
  { month: "Julho", treinador1: 36, treinador2: 18, treinador3: 20 },
  { month: "Agosto", treinador1: 25, treinador2: 30, treinador3: 15 },
  { month: "Setembro", treinador1: 19, treinador2: 22, treinador3: 30 },
  { month: "Outubro", treinador1: 14, treinador2: 36, treinador3: 11 },
  { month: "Novembro", treinador1: 31, treinador2: 23, treinador3: 28 },
  { month: "Dezembro", treinador1: 30, treinador2: 25, treinador3: 35 },
];

const chartConfig = {
  treinador1: {
    label: "treinador1",
    color: "#0a68dc",
  },
  treinador2: {
    label: "treinador2",
    color: "#528b88",
  },
  treinador3: {
    label: "treinador2",
    color: "#c7a762",
  },
} satisfies ChartConfig;

export default function MainChart() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">Desempenho dos/as treinadores/as</CardTitle>
          <BadgeDollarSign className="ml-auto w-4 h-4"></BadgeDollarSign>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="treinador1"
              fill="var(--color-treinador1)"
              radius={4}
            />
            <Bar
              dataKey="treinador2"
              fill="var(--color-treinador2)"
              radius={4}
            />
            <Bar
              dataKey="treinador3"
              fill="var(--color-treinador3)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
