"use client";

import { InformationCard } from "@/components/InfoCard";
import MainChart from "@/components/MainChart";
import { Sales } from "@/components/Sales";

import {
  EuroIcon,
  DumbbellIcon,
  Users2Icon,
  TrendingUpIcon,
  TrophyIcon,
} from "lucide-react";

const CardsInfo = [
  {
    title: "Total Mensal",
    content: "4.200,00€",
    description: "Receita acumulada no mês.",
    evolution: "+12%",
    icon: EuroIcon, // Ícone relacionado à receita
  },
  {
    title: "Clientes Ativos",
    content: "45",
    description: "Clientes com treinos em 30 dias.",
    evolution: "+5%",
    icon: Users2Icon, // Ícone relacionado a usuários/cliente
  },
  {
    title: "Treinos/Mês",
    content: "200",
    description: "Treinos em 30 dias.",
    evolution: "-3%",
    icon: DumbbellIcon, // Ícone relacionado a atividades/jogos
  },
  {
    title: "Média de Treinos",
    content: "12",
    description: "Média de treinos por cliente.",
    evolution: "-3%",
    icon: TrophyIcon, // Ícone relacionado a dados/estatísticas
  },
];

export default function Component() {
  return (
    <div className="h-screen cp-4 flex-1 px-4">
      <section className="grid-cols-2 lg:grid-cols-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CardsInfo.map((card) => (
            <InformationCard {...card} />
          ))}
        </div>
      </section>
      <section className="mt-4 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4">
        <MainChart />
        <Sales />
      </section>
    </div>
  );
}
