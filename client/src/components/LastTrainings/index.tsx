"use client";

import { CalendarClockIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import React, { useState } from "react";
import api from "../../../lib/api";
import { columns, TrainingInterface } from "./columns";
import LoadingSpinner from "../Loading";
import { DataTable } from "./data-table";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LastTrainigs() {
  const [lastTrainingsData, setLastTrainingsData] = useState<
    TrainingInterface[]
  >([]);

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    api
      .get("/api/dashboard/lastTrainings")
      .then((response) => {
        console.log(response.data);
        setLastTrainingsData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const title = "Últimos Treinos";

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-700 select-none">
            {title}
          </CardTitle>
          <CalendarClockIcon className="ml-auto w-5 h-5"></CalendarClockIcon>
        </div>
      </CardHeader>
      {loading && (
        <LoadingSpinner text="Carregar últimos treinos..."></LoadingSpinner>
      )}
      {lastTrainingsData.length > 0 && (
        <div className="flex flex-1 mx-3">
          <ScrollArea className="flex-1 max-h-[350px]">
            <DataTable columns={columns} data={lastTrainingsData} />
          </ScrollArea>
        </div>
      )}
    </Card>
  );
}
