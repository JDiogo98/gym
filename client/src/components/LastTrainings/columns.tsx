"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TrainingInterface = {
  id: string;
  date: string;
  client: string;
  coach: string;
};

export const columns: ColumnDef<TrainingInterface>[] = [
  {
    accessorKey: "client",
    header: () => <div className="text-left">Cliente</div>,
  },
  {
    accessorKey: "coach",
    header: "Treinador/a",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
];
