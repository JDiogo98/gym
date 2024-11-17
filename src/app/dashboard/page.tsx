"use client";

import { InformationCard } from "@/components/InfoCard";
import MainChart from "@/components/MainChart";
import { Sales } from "@/components/Sales";

const CardsInfo = [
  {
    title: "Total Mensal",
    content: "4.200,00€",
    description: "Receita acumulada no mês.",
    evolution: "+12%",
  },
  {
    title: "Clientes Ativos",
    content: "45",
    description: "Clientes com treinos em 30 dias.",
    evolution: "+5%",
  },
  {
    title: "Treinos/Mês",
    content: "200",
    description: "Treinos em 30 dias.",
    evolution: "-3%",
  },
  {
    title: "Média de Treinos",
    content: "12",
    description: "Média de treinos por cliente.",
    evolution: "-3%",
  },
];

export default function Component() {
  return (
    <div className="sm:ml-14 p-4">
      <section className="grip grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CardsInfo.map((card) => (
            <InformationCard {...card} />
          ))}
        </div>
      </section>
      <section className="mt-4 flex flex-col lg:flex-row gap-4">
        <MainChart />
        <Sales />
      </section>
    </div>
  );
}
