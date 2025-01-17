"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CoachesTotalTrainigs } from "@/components/WorkoutsData/CoachesChart";


const topClients = [
  { name: "Ana Rodrigues", workouts: 20 },
  { name: "Carlos Mendes", workouts: 18 },
  { name: "Beatriz Ferreira", workouts: 15 },
  { name: "Daniel Costa", workouts: 12 },
  { name: "Eva Martins", workouts: 10 },
];

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Resumo dos Treinos</h1>

      <div className="grid gap-4 mb-6">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:flex lg:space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full lg:w-[300px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y", { locale: ptBR })} -{" "}
                      {format(dateRange.to, "LLL dd, y", { locale: ptBR })}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y", { locale: ptBR })
                  )
                ) : (
                  <span>Selecione um intervalo</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select>
            <SelectTrigger className="w-full lg:w-[300px]">
              <SelectValue placeholder="Selecione o treinador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os treinadores</SelectItem>
              <SelectItem value="joao">João Silva</SelectItem>
              <SelectItem value="maria">Maria Santos</SelectItem>
              <SelectItem value="pedro">Pedro Oliveira</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full lg:w-[300px]">
              <SelectValue placeholder="Tipo de treino" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="strength">Musculação</SelectItem>
              <SelectItem value="yoga">Yoga</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full lg:w-[300px]">
              <SelectValue placeholder="Academia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as localizações</SelectItem>
              <SelectItem value="coimbra">Coimbra</SelectItem>
              <SelectItem value="porto">Porto</SelectItem>
              <SelectItem value="west">Leiria</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">
              +20% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média de Treinos por Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8</div>
            <p className="text-xs text-muted-foreground">
              +0.3 em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nota Média dos Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">
              +0.2 em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_3fr] mb-6">
        <CoachesTotalTrainigs></CoachesTotalTrainigs>
        <Card>
          <CardHeader>
            <CardTitle>Top Clientes por Número de Treinos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Treinos</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map((client) => (
                  <TableRow key={client.name}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.workouts}</TableCell>
                    <TableCell>
                      <Button variant="link" asChild>
                        <Link
                          href={`/clients/${client.name
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          Ver detalhes
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimos Treinos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Treinador</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {format(new Date(2024, 2, 15 - index), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>Cliente {index + 1}</TableCell>
                  <TableCell>Treinador {(index % 3) + 1}</TableCell>
                  <TableCell>Tipo {(index % 3) + 1}</TableCell>
                  <TableCell>Localização {(index % 3) + 1}</TableCell>
                  <TableCell>
                    <Button variant="link" asChild>
                      <Link href={`/workouts/${index + 1}`}>Ver detalhes</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
