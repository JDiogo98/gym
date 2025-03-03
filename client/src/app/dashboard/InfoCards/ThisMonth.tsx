"use client";

import LoadingSpinner from "@/components/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DumbbellIcon } from "lucide-react";
import React, { useState } from "react";
import api from "../../../../lib/api";

interface InformationCardProps {
  content?: string;
  evolution?: string;
}

var title: "Treinos este mês";
var description = "Treinos no decorrer deste mês.";

export function ThisMonthCard() {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<InformationCardProps | null>(null);

  React.useEffect(() => {
    api
      .get("/api/dashboard/thisMonth")
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Card className="flex-1 h-full">
        {loading && (
          <LoadingSpinner text="Carregar treinos..."></LoadingSpinner>
        )}
        {response && (
          <div>
            <CardHeader>
              <div className="text-base flex items-center justify-center">
                <CardTitle className="text-xl  text-gray-800 select-none">
                  {title}
                </CardTitle>
                <DumbbellIcon className="ml-auto w-5 h-5" />
              </div>
              <CardDescription className="select-none text-base">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg sm:text-xl font-bold select-none">
                {response.content}
              </p>
            </CardContent>
            <CardFooter className="text-base sm:text-s text-gray-500 select-none">
              <p
                className={`${
                  response.evolution?.startsWith("-")
                    ? "text-red-600"
                    : response.evolution?.startsWith("+")
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {response.evolution}
              </p>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
