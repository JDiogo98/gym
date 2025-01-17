"use client";
import { TrendingUp, DumbbellIcon, TrendingDown } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
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
  { month: "Janeiro", tranings: 15 },
  { month: "Março", tranings: 18 },
  { month: "Abril", tranings: 13 },
  { month: "Maio", tranings: 18 },
  { month: "Junho", tranings: 12 },
  { month: "Julho", tranings: 16 },
  { month: "Agosto", tranings: 15 },
  { month: "Setembro", tranings: 19 },
  { month: "Outubro", tranings: 14 },
  { month: "Novembro", tranings: 11 },
  { month: "Dezembro", tranings: 10 },
];

const chartConfig = {
  trainings: {
    label: "Treinos",
    color: "#ffac38",
  },
} satisfies ChartConfig;

export default function TrainingEvolution() {
  const title = "Treinos realizados";
  const description = "Quatidade de treinos dos últimos 12 meses";
  const progress = "Diminuição de 1% no último mês";
  const lastSixMonthsRange = "janeiro a dezembro de 2024";

  return (
    <Card className="">
      <CardHeader>
        <div className="text-base flex items-center justify-center">
          <CardTitle className="text-xl  text-gray-800 select-none">
            {title}
          </CardTitle>
          <DumbbellIcon className="ml-auto w-5 h-5"></DumbbellIcon>
        </div>
        <CardDescription className="select-none text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="tranings"
              type="natural"
              stroke="var(--color-trainings)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-trainings)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {progress}
              <TrendingDown className="h-4 w-4" />
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
