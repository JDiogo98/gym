"use client";

import React, { useState } from "react";
import { LastTrainigs } from "@/components/LastTrainings";
import FiltersComponent, { FiltersInterface } from "./components/filters";
import TrainingCards from "./components/trainingCards";
import TopClients from "./components/topClients";
import CoachesTotalTrainings from "./components/coachesChart";

export default function TrainingsPage() {
  const [filters, setFilters] = useState<FiltersInterface>({
    startDate: null,
    endDate: null,
    coachId: null,
    trainingTypeId: null,
    academyId: null,
  });

  return (
    <div className="w-full p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">Resumo dos Treinos</h1>
      <FiltersComponent setFilters={setFilters} />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <TrainingCards filters={filters}></TrainingCards>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-[2fr_1fr] mb-6">
        <CoachesTotalTrainings filters={filters} />
        <TopClients filters={filters} />
      </div>
      <div className="flex-1">
        <LastTrainigs filters={filters} />
      </div>
    </div>
  );
}
