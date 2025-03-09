"use client";

import { CartesianGrid, XAxis } from "recharts";
import { Area, AreaChart } from "recharts";

import {
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
import { PieChartIcon } from "lucide-react";
import React, { use, useState } from "react";
import api from "../../../lib/api";
import LoadingSpinner from "../Loading";
import { toast } from "sonner";

interface ChartData {
  month: string;
  [key: string]: string | number;
}

type ChartConfig = Record<string, { label: string; color: string }>;

function createChartConfig(data: ChartData[]): ChartConfig {
  return data
    .flatMap((entry) => {
      // Excluir o campo 'month' de cada entrada
      const { month, ...coaches } = entry;

      return Object.entries(coaches).map(([label, value]) => {
        return {
          label,
          value,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Gerar cor aleatória
        };
      });
    })
    .reduce((acc: ChartConfig, { label, color }) => {
      acc[label] = {
        label,
        color,
      };
      return acc;
    }, {}) satisfies ChartConfig;
}

export default function MainChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  const [loading, setLoading] = useState(true);

  const title = "Desempenho dos/as treinadores/as";
  const description = "Relatório dos últimos 12 meses";

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchFilteredData = async () => {
      try {
        setLoading(true);

        const response = await api.get("api/coaches/coachesProgress");

        if (isMounted) {
          setTimeout(() => {
            setChartData(response.data);
            setChartConfig(createChartConfig(response.data));
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
  }, []);

  if (loading) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <div className="text-base flex items-center justify-center">
            <CardTitle className="text-xl select-none">{title}</CardTitle>
            <PieChartIcon className="ml-auto w-5 h-5"></PieChartIcon>
          </div>
          <CardDescription className="select-none text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingSpinner></LoadingSpinner>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="text-base flex items-center justify-center">
          <CardTitle className="text-xl select-none">{title}</CardTitle>
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
            {Object.keys(chartConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={chartConfig[key].color}
                fillOpacity={0.4}
                stroke={chartConfig[key].color}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
