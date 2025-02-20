"use client";

import { CartesianGrid, XAxis } from "recharts";
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
  const title = "Desempenho dos/as treinadores/as";
  const description = "Relatório dos últimos 6 meses";
  const progress = "Aumento de 5.3% no último mês";
  const lastSixMonthsRange = "agosto a dezembro de 2024";






  

  return (
    <Card className="flex-1">
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
              left: 12,
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="treinador1"
              type="natural"
              fill="var(--color-treinador1)"
              fillOpacity={0.4}
              stroke="var(--color-treinador1)"
              stackId="a"
            />
            <Area
              dataKey="treinador2"
              type="natural"
              fill="var(--color-treinador2)"
              fillOpacity={0.4}
              stroke="var(--color-treinador2)"
              stackId="a"
            />
            <Area
              dataKey="treinador3"
              type="natural"
              fill="var(--color-treinador3)"
              fillOpacity={0.4}
              stroke="var(--color-treinador3)"
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
