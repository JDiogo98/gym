"use client";

import React from "react";
import { Card, CardHeader } from "../ui/card";
import { LastSixMonths } from "./lastSixMonths";
import LastTrains from "../LastTrainings/table";

export default function ClientDasboard() {
  return (
    <div>
      <section className="px-4 my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="m-1">
          <LastSixMonths></LastSixMonths>
        </Card>
        <Card className="p-4 m-1">
          <CardHeader></CardHeader>
        </Card>
        <Card className="p-4 m-1">
          <CardHeader></CardHeader>
        </Card>
        <Card className="p-4 m-1">
          <CardHeader></CardHeader>
        </Card>
      </section>
      <section>
        <LastTrains></LastTrains>
      </section>
    </div>
  );
}
