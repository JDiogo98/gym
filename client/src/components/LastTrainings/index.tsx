"use client";

import { CalendarClockIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import React, { useState, useEffect } from "react";
import api from "../../../lib/api";
import { columns, TrainingInterface } from "./columns";
import LoadingSpinner from "../Loading";
import { DataTable } from "./data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoResults from "../noResults";
import { toast } from "sonner";
import { FiltersInterface } from "@/app/trainings/components/filters";

interface LastTrainingsProps {
  filters: FiltersInterface | undefined;
}

export function LastTrainigs({ filters }: LastTrainingsProps) {
  const [lastTrainingsData, setLastTrainingsData] = useState<
    TrainingInterface[]
  >([]);

  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    let isMounted = true;
    setLoadingState(true);

    const fetchFilteredData = async () => {
      try {
        const [filteredLastTrainings] = await Promise.all([
          api.get("/api/training/filteredLastTrainings", {
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
          }),
        ]);

        if (isMounted) {
          setTimeout(() => {
            setLastTrainingsData(filteredLastTrainings.data);
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

  console.log("lastTrainingsData", lastTrainingsData);
  const title = "Últimos Treinos";

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text select-none">
            {title}
          </CardTitle>
          <CalendarClockIcon className="ml-auto w-5 h-5" />
        </div>
      </CardHeader>

      {loadingState ? (
        <LoadingSpinner text="Carregando últimos treinos..." />
      ) : lastTrainingsData.length > 0 ? (
        <div className="flex flex-1 m-3">
          <ScrollArea className="flex-1 max-h-[350px]">
            <DataTable columns={columns} data={lastTrainingsData} />
          </ScrollArea>
        </div>
      ) : (
        <div className="flex flex-1 m-3">
          <NoResults message="Nenhum treino encontrado." />
        </div>
      )}
    </Card>
  );
}
