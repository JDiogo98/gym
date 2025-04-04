"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import LoadingSpinner from "../../../components/Loading";
import React, { useState, useEffect } from "react";
import { apiPrivate } from "../../../../lib/api";
import { toast } from "sonner";
import { FiltersInterface } from "@/app/trainings/components/filters";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoResults from "@/components/noResults";

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
          apiPrivate.get("/api/training/coachesChart", {
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

  if (loading) {
    return (
      <Card className="min-w-[300px] h-full flex items-center justify-center">
        <LoadingSpinner text="Carregar..." />
      </Card>
    );
  }

  if (!loading && chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total de Treinos</CardTitle>
        </CardHeader>
        <CardContent>
          <NoResults
            message="Sem reultados"
            suggestion="Tente ajustar os filtros"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de Treinos</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
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
                tickFormatter={(value) => value.slice(0, 3)}
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
                «{" "}
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
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
