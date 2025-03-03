"use client";

import React, { useState } from "react";

import { LastTrainigs } from "@/components/LastTrainings";
import api from "../../../lib/api";
import { toast } from "sonner";
import { TrainingInterface } from "@/components/LastTrainings/columns";
import WorkoutCards, { WorkoutCardProps } from "./workoutCards";
import CoachesTotalTrainings from "@/components/WorkoutsData/CoachesChart";

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

import FiltersComponent, { FiltersInterface } from "./filters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WorkoutsPage() {
  const [filters, setFilters] = useState<FiltersInterface>({
    startDate: null,
    endDate: null,
    coachId: null,
    trainingTypeId: null,
    academyId: null,
  });

  const topClients = [
    { name: "João Silva", workouts: 15 },
    { name: "Maria Oliveira", workouts: 23 },
    { name: "Carlos Santos", workouts: 10 },
    { name: "Fernanda Souza", workouts: 30 },
    { name: "Ana Costa", workouts: 18 },
  ];
  const [loading, setLoading] = useState<boolean>(true);

  const [coachesTotalTrainings, setCoachesTotalTrainings] = useState<
    { coach: string; totalTraining: number }[] | null
  >(null);

  const [cardStats, setCardStats] = useState<WorkoutCardProps[] | null>(null);

  // JD - Use Effect para buscar dados da página
  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchFilteredData = async () => {
      try {
        const [filteredLastTrainings, filteredCardStats] = await Promise.all([
          api.get("/api/workout/filteredLastTrainings", {
            params: {
              startDate:
                filters.startDate ||
                new Date(new Date().setDate(new Date().getDate() - 30)),
              endDate: filters.endDate || new Date(),
              coachId: filters.coachId || null,
              trainingTypeId: filters.trainingTypeId || null,
              academyId: filters.academyId || null,
            },
          }),
          api.get("api/workout/filteredCardsInfo", {
            params: {
              startDate:
                filters.startDate ||
                new Date(new Date().setDate(new Date().getDate() - 30)),
              endDate: filters.endDate || new Date(),
              coachId: filters.coachId || null,
              trainingTypeId: filters.trainingTypeId || null,
              academyId: filters.academyId || null,
            },
          }),
          // api.get("api/workout/coachesChart", {
          //   params: {
          //     startDate:
          //       filters.startDate ||
          //       new Date(new Date().setDate(new Date().getDate() - 30)),
          //     endDate: filters.endDate || new Date(),
          //     coachId: filters.coachId || null,
          //     trainingTypeId: filters.trainingTypeId || null,
          //     academyId: filters.academyId || null,
          //   },
          // }),
        ]);

        if (isMounted) {
          setTimeout(() => {
            setCardStats(filteredCardStats.data);
            // setCoachesTotalTrainings(filteredCoachesTotalTrainigs.data);
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
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-6">Resumo dos Treinos</h1>

      <FiltersComponent setFilters={setFilters} />

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <WorkoutCards loading={loading} stats={cardStats}></WorkoutCards>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-[1fr_2fr] mb-6">
        <CoachesTotalTrainings filters={filters} />

        <Card>
          <CardHeader>
            <CardTitle>Top Clientes por Número de Treinos</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-[300px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Treinos</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map((client) => (
                  <TableRow key={client.name}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.workouts}</TableCell>
                    <TableCell>
                      <Button variant="link" asChild>
                        <Link
                          href={`/clients/${client.name
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          Ver detalhes
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1">
        <LastTrainigs filters={filters} />
      </div>
    </div>
  );
}
