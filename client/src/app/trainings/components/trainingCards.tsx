import LoadingSpinner from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { FiltersInterface } from "./filters";
import api from "../../../../lib/api";
import { toast } from "sonner";

export interface trainingCardProps {
  title: string;
  value: string;
  change: number;
}

interface TrainingCardsProps {
  filters: FiltersInterface | undefined;
}

const TrainingCards: React.FC<TrainingCardsProps> = ({ filters }) => {
  const [stats, setStats] = useState<trainingCardProps[] | null>(null);

  const [loading, setLoadingState] = useState<boolean>(true);

  React.useEffect(() => {
    let isMounted = true;
    setLoadingState(true);

    const fetchFilteredData = async () => {
      try {
        setLoadingState(true);

        const response = await api.get("/api/training/filteredCardsInfo", {
          params: filters
            ? {
                startDate:
                  filters.startDate ||
                  new Date(new Date().setDate(new Date().getDate() - 30)),
                endDate: filters.endDate || new Date(),
                coachId: filters.coachId || null,
                trainingTypeId: filters.trainingTypeId || null,
                academyId: filters.academyId || null,
                clientId: filters.clientId || null,
              }
            : {},
        });

        if (isMounted) {
          setTimeout(() => {
            setStats(response.data);
            setLoadingState(false);
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
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <LoadingSpinner></LoadingSpinner>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {stats?.map((stat, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change.toString() == "0.00%" ||
              stat.change.toString()[0] == "-"
                ? `${stat.change}`
                : `+${stat.change}`}{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default TrainingCards;
