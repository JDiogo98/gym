"use client";

import { LastTrainigs } from "@/components/LastTrainings";
import MainChart from "@/components/MainChart";

import { ActiveClientsCard } from "./InfoCards/ActiveClients";
import { ThisMonthCard } from "./InfoCards/ThisMonth";
import { AverageTrainings } from "./InfoCards/AverageTrainings";

export default function Component() {
  return (
    <div className="p-6 py-12 w-full">
      <section className="grid-cols-2 lg:grid-cols-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActiveClientsCard />
          <ThisMonthCard />
          <AverageTrainings />
        </div>
      </section>
      <section className="mt-4 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4">
        <MainChart />
        <LastTrainigs filters={undefined} />
      </section>
    </div>
  );
}
