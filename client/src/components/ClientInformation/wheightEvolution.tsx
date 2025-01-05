"use client";

import { CartesianGrid, XAxis, YAxis } from "recharts";
import { Area, AreaChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PieChartIcon, TrendingUp } from "lucide-react";

const chartData = [
  { month: "Janeiro", wheight: 65 },
  { month: "Março", wheight: 68 },
  { month: "Abril", wheight: 63 },
  { month: "Maio", wheight: 68 },
  { month: "Junho", wheight: 62 },
  { month: "Julho", wheight: 66 },
  { month: "Agosto", wheight: 65 },
  { month: "Setembro", wheight: 69 },
  { month: "Outubro", wheight: 64 },
  { month: "Novembro", wheight: 61 },
  { month: "Dezembro", wheight: 60 },
];

const chartConfig = {
  wheight: {
    label: "Peso",
    color: "#ffac38",
  },
} satisfies ChartConfig;

export default function PhysicalEvolution() {
  const title = "Evolução física";
  const description = "Evolução dos últimos 12 meses";
  const progress = "Aumento de 5.3% no último mês";
  const lastSixMonthsRange = "janeiro a dezembro de 2024";

  return (
    <Card className="">
      <CardHeader>
        <div className="text-base flex items-center justify-center">
          <CardTitle className="text-xl  text-gray-800 select-none">
            {title}
          </CardTitle>
          <PieChartIcon className="ml-auto w-5 h-5"></PieChartIcon>
        </div>
        <CardDescription className="select-none text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              dataKey="wheight"
              type="natural"
              fill="var(--color-wheight)"
              fillOpacity={0.4}
              stroke="var(--color-wheight)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {progress}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {lastSixMonthsRange}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
