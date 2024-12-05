"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

// Dados de treinos para os últimos 6 meses, com cores personalizadas
const chartData = [
  { month: "January", sessions: 12, fill: "hsl(var(--chart-1))" },
  { month: "February", sessions: 3, fill: "hsl(var(--chart-2))" },
  { month: "March", sessions: 15, fill: "hsl(var(--chart-3))" },
  { month: "April", sessions: 15, fill: "hsl(var(--chart-4))" },
  { month: "May", sessions: 10, fill: "hsl(var(--chart-5))" },
  { month: "June", sessions: 13, fill: "hsl(var(--chart-1))" },
];

// Configuração do gráfico
const chartConfig = {
  sessions: {
    label: "Treinos",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  june: {
    label: "June",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function LastSixMonths() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos 6 meses</CardTitle>
        <CardDescription>Janeiro - Junho 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis dataKey="sessions" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="sessions"
              layout="vertical"
              radius={5}
              fill={(data) => data.fill} // Aplica a cor personalizada
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Aumento de 10% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total de treinos dos últimos 6 meses:
        </div>
      </CardFooter>
    </Card>
  );
}
