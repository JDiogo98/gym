"use client";

import { InformationCard } from "@/components/InfoCard";
import MainChart from "@/components/MainChart";
import { LastTrainigs } from "@/components/LastTrainings";

import {
  EuroIcon,
  DumbbellIcon,
  Users2Icon,
  TrendingUpIcon,
  TrophyIcon,
} from "lucide-react";

const CardsInfo = [
  {
    id: 1,
    title: "Total Mensal",
    content: "4.200,00€",
    description: "Receita acumulada no mês.",
    evolution: "+12%",
    icon: EuroIcon, 
  },
  {
    id: 2,
    title: "Clientes Ativos",
    content: "45",
    description: "Clientes com treinos em 30 dias.",
    evolution: "+5%",
    icon: Users2Icon, 
  },
  {
    id: 3,
    title: "Treinos/Mês",
    content: "200",
    description: "Treinos em 30 dias.",
    evolution: "-3%",
    icon: DumbbellIcon, 
  },
  {
    id: 4,
    title: "Média de Treinos",
    content: "12",
    description: "Média de treinos por cliente.",
    evolution: "-3%",
    icon: TrophyIcon, 
  },
];

export default function Component() {
  return (
    <div className="min-h-full flex-1 p-6 py-12 container">
      <section className="grid-cols-2 lg:grid-cols-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CardsInfo.map((card) => (
            <InformationCard {...card} />
          ))}
        </div>
      </section>
      <section className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4">
        <MainChart />
        <LastTrainigs />
      </section>
    </div>
  );
}
