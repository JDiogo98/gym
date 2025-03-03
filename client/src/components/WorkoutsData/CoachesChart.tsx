"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
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
import dayjs from "dayjs";
import LoadingSpinner from "../Loading";
import React, { useState, useEffect } from "react";
import api from "../../../lib/api";
import { toast } from "sonner";
import { FiltersInterface } from "@/app/workouts/filters";

const chartConfig = {
  totalTraining: {
    label: "Total de Treinos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartData {
  coachName: string;
  totalTraining: number;
}

export default function CoachesTotalTrainings({
  filters,
}: {
  filters: FiltersInterface;
}) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchFilteredData = async () => {
      try {
        const [coachesTotalTrainingsData] = await Promise.all([
          api.get("/api/workout/coachesChart", {
            params: filters,
          }),
        ]);

        if (isMounted) {
          setTimeout(() => {
            setChartData(coachesTotalTrainingsData.data);
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Ocorreu um erro ao buscar os dados.");
      }
    };

    fetchFilteredData();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de Treinos</CardTitle>
      </CardHeader>
      <CardContent>
        {!loading ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData.map((item) => ({
                ...item,
                coachName: `${item.coachName.split(" ")[0][0]}. ${item.coachName
                  .split(" ")
                  .slice(1)
                  .map((name) => name.slice(0, 3))
                  .join(" ")}`, // Abrevia o nome do treinador
              }))}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="coachName"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)} // Ajusta os nomes no eixo Y
                hide
              />
              <XAxis dataKey="totalTraining" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="totalTraining"
                layout="vertical"
                fill="var(--color-totalTraining)"
                radius={4}
              >
                {/* Nome do treinador à esquerda */}
                <LabelList
                  dataKey="coachName"
                  position="insideLeft"
                  offset={10} // Ajusta o espaço à esquerda
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                {/* Total de treinos à direita */}
                <LabelList
                  dataKey="totalTraining"
                  position="right"
                  offset={8} // Ajusta o espaço à direita
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <LoadingSpinner />
        )}
      </CardContent>
    </Card>
  );
}
