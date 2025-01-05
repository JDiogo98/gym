"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { coach: "Ricardo Reis", totalTraining: 14 },
  { coach: "Maria Joana", totalTraining: 20 },
  { coach: "Dulce Teixeira", totalTraining: 12 },
];

const chartConfig = {
  totalTraining: {
    label: "Total de treinos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function CoachesTotalTrainigs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de treinos</CardTitle>
        <CardDescription>nov 26, 2024 - dez 26, 2024</CardDescription>
      </CardHeader>
      <CardContent>
      <ChartContainer config={chartConfig} className="h-[224px] w-full">
      <BarChart
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="coach"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalTraining"
              fill="var(--color-totalTraining)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={10}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
