"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiltersInterface } from "./filters";
import React, { useState } from "react";
import LoadingSpinner from "@/components/Loading";
import api from "../../../../lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TopClientsProps {
  filters: FiltersInterface | undefined;
}

interface TopClientsDataProps {
  clientName: string;
  clientTrainings: number;
  clientId: number;
}

const TopClients: React.FC<TopClientsProps> = ({ filters }) => {
  const [topClientsData, setTopClientsData] = useState<
    TopClientsDataProps[] | null
  >(null);

  const [loading, setLoadingState] = useState<boolean>(true);

  React.useEffect(() => {
    let isMounted = true;
    setLoadingState(true);

    const fetchFilteredData = async () => {
      try {
        setLoadingState(true);

        const response = await api.get("/api/training/filteredTopClients", {
          params: filters
            ? {
                startDate:
                  filters.startDate ||
                  new Date(new Date().setDate(new Date().getDate() - 30)),
                endDate: filters.endDate || new Date(),
                coachId: filters.coachId || null,
                trainingTypeId: filters.trainingTypeId || null,
                academyId: filters.academyId || null,
                clientId: filters.clientId || null,
              }
            : {},
        });

        if (isMounted) {
          setTimeout(() => {
            setTopClientsData(response.data);
            setLoadingState(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Ocorreu um erro ao buscar os dados.");
      }
    };

    fetchFilteredData();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  if (loading) {
    return (
      <Card className="min-w-[300px] h-full flex items-center justify-center">
        <LoadingSpinner text="Carregar..." />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Clientes por Número de Treinos</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <ScrollArea className="h-[250px]">
          <Table className="min-w-[250px]">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Treinos</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topClientsData?.map((client) => (
                <TableRow key={client.clientName}>
                  <TableCell>{client.clientName}</TableCell>
                  <TableCell>{client.clientTrainings}</TableCell>
                  <TableCell className="flex justify-end">
                    <Link href={`/clients/${client.clientId}`}>
                      <Button>
                        <Search />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TopClients;
