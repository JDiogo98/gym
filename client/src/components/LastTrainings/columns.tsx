"use client"; // Indica que este é um Client Component

import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button"; // Importação correta do Button
import { useRouter } from "next/navigation"; // Importação do useRouter

export type TrainingInterface = {
  trainingId: string;
  trainingDate: string;
  trainingClient: string;
  trainingCoach: string;
  trainingAcademy: string;
  trainingTrainingType: string;
};

// Classes padrão para colunas que devem ser escondidas em telas pequenas
const hiddenOnMobile = "hidden md:table-cell";

export const columns: ColumnDef<TrainingInterface>[] = [
  {
    accessorKey: "trainingDate",
    header: () => <div className="text-left">Data - Hora</div>,
    cell: ({ row }) => <p className="text-left">{row.original.trainingDate}</p>,
  },
  {
    accessorKey: "trainingClient",
    header: () => <div className="text-left">Cliente</div>,
    cell: ({ row }) => (
      <p className="text-left">{row.original.trainingClient}</p>
    ),
  },
  {
    accessorKey: "trainingCoach",
    header: () => <div className={hiddenOnMobile}>Treinador/a</div>,
    cell: ({ row }) => (
      <p className={hiddenOnMobile}>{row.original.trainingCoach}</p>
    ),
  },
  {
    accessorKey: "trainingAcademy",
    header: () => <div className={hiddenOnMobile}>Academia</div>,
    cell: ({ row }) => (
      <p className={hiddenOnMobile}>{row.original.trainingAcademy}</p>
    ),
  },
  {
    accessorKey: "trainingTrainingType",
    header: () => <div className={hiddenOnMobile}>Tipo</div>,
    cell: ({ row }) => (
      <p className={hiddenOnMobile}>{row.original.trainingTrainingType}</p>
    ),
  },
  {
    accessorKey: "Detalhes",
    header: () => <div className="text-right mr-4">Detalhes</div>,
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div className="text-right mr-4">
          <Button
            onClick={() => router.push(`/trainings/${row.original.trainingId}`)}
          >
            <Search />
          </Button>
        </div>
      );
    },
  },
];
