"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CalendarIcon, Download, RefreshCw } from "lucide-react";
import { format, subMonths, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data
const initialTrainersData = [
  {
    id: 1,
    name: "João Silva",
    totalWorkouts: 120,
    averageRating: 4.7,
    totalClients: 30,
  },
  {
    id: 2,
    name: "Maria Santos",
    totalWorkouts: 150,
    averageRating: 4.9,
    totalClients: 35,
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    totalWorkouts: 100,
    averageRating: 4.5,
    totalClients: 25,
  },
];

const initialClientsData = [
  {
    id: 1,
    name: "Ana Rodrigues",
    trainerId: 1,
    workouts: 15,
    weight: 65,
    bodyFat: 22,
  },
  {
    id: 2,
    name: "Carlos Mendes",
    trainerId: 1,
    workouts: 12,
    weight: 80,
    bodyFat: 18,
  },
  {
    id: 3,
    name: "Beatriz Ferreira",
    trainerId: 2,
    workouts: 18,
    weight: 58,
    bodyFat: 20,
  },
  {
    id: 4,
    name: "Daniel Costa",
    trainerId: 2,
    workouts: 14,
    weight: 75,
    bodyFat: 15,
  },
  {
    id: 5,
    name: "Eva Martins",
    trainerId: 3,
    workouts: 10,
    weight: 62,
    bodyFat: 24,
  },
];

const initialWorkoutsData = [
  { date: "2024-03-01", trainerId: 1, rating: 4.5 },
  { date: "2024-03-05", trainerId: 2, rating: 5.0 },
  { date: "2024-03-10", trainerId: 3, rating: 4.0 },
  { date: "2024-03-15", trainerId: 1, rating: 4.8 },
  { date: "2024-03-20", trainerId: 2, rating: 4.9 },
  { date: "2024-03-25", trainerId: 3, rating: 4.7 },
  { date: "2024-03-30", trainerId: 1, rating: 4.6 },
];

export default function TrainersPerformancePage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [clientSegment, setClientSegment] = useState<string | null>(null);
  const [trainersData, setTrainersData] = useState(initialTrainersData);
  const [clientsData, setClientsData] = useState(initialClientsData);
  const [workoutsData, setWorkoutsData] = useState(initialWorkoutsData);

  const handleExportReport = () => {
    // Implement report export logic here
    console.log("Exporting report...");
  };

  const handleResetFilters = () => {
    setDateRange({ from: subMonths(new Date(), 1), to: new Date() });
    setSelectedTrainer(null);
    setClientSegment(null);
  };

  const handleRefreshData = () => {
    // In a real application, this would fetch fresh data from the server
    console.log("Refreshing data...");
  };

  useEffect(() => {
    // Filter and update data based on selected filters
    const filteredWorkouts = initialWorkoutsData.filter(
      (workout) =>
        isWithinInterval(new Date(workout.date), dateRange) &&
        (!selectedTrainer || workout.trainerId === parseInt(selectedTrainer))
    );

    const filteredClients = initialClientsData.filter(
      (client) =>
        (!selectedTrainer || client.trainerId === parseInt(selectedTrainer)) &&
        (!clientSegment ||
          (clientSegment === "frequent"
            ? client.workouts >= 15
            : clientSegment === "moderate"
            ? client.workouts >= 10 && client.workouts < 15
            : client.workouts < 10))
    );

    const updatedTrainersData = initialTrainersData.map((trainer) => ({
      ...trainer,
      totalWorkouts: filteredWorkouts.filter((w) => w.trainerId === trainer.id)
        .length,
      averageRating:
        filteredWorkouts
          .filter((w) => w.trainerId === trainer.id)
          .reduce((sum, w) => sum + w.rating, 0) /
          filteredWorkouts.filter((w) => w.trainerId === trainer.id).length ||
        0,
      totalClients: filteredClients.filter((c) => c.trainerId === trainer.id)
        .length,
    }));

    setWorkoutsData(filteredWorkouts);
    setClientsData(filteredClients);
    setTrainersData(updatedTrainersData);
  }, [dateRange, selectedTrainer, clientSegment]);

  const totalWorkouts = trainersData.reduce(
    (sum, trainer) => sum + trainer.totalWorkouts,
    0
  );
  const averageRating =
    trainersData.reduce((sum, trainer) => sum + trainer.averageRating, 0) /
    trainersData.length;
  const totalClients = trainersData.reduce(
    (sum, trainer) => sum + trainer.totalClients,
    0
  );

  const workoutsTrendData = workoutsData.reduce((acc, workout) => {
    const date = format(new Date(workout.date), "MMM dd");
    if (!acc[date]) {
      acc[date] = { date, total: 0 };
    }
    acc[date].total += 1;
    return acc;
  }, {});

  const ratingTrendData = workoutsData.reduce((acc, workout) => {
    const date = format(new Date(workout.date), "MMM dd");
    if (!acc[date]) {
      acc[date] = { date, rating: 0, count: 0 };
    }
    acc[date].rating += workout.rating;
    acc[date].count += 1;
    return acc;
  }, {});

  const clientDistributionData = [
    {
      name: "Frequentes",
      value: clientsData.filter((c) => c.workouts >= 15).length,
    },
    {
      name: "Moderados",
      value: clientsData.filter((c) => c.workouts >= 10 && c.workouts < 15)
        .length,
    },
    {
      name: "Ocasionais",
      value: clientsData.filter((c) => c.workouts < 10).length,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Análise de Desempenho dos Treinadores
      </h1>

      <div className="grid gap-4 mb-6">
        <div className="flex items-center space-x-4 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
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

          <Select
            value={selectedTrainer || ""
            }
            onValueChange={setSelectedTrainer}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione um treinador" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="">Todos os treinadores</SelectItem> */}
              {initialTrainersData.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.id.toString()}>
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={clientSegment || ""} onValueChange={setClientSegment}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Segmento de clientes" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="">Todos os clientes</SelectItem> */}
              <SelectItem value="frequent">Frequentes (15+ treinos)</SelectItem>
              <SelectItem value="moderate">
                Moderados (10-14 treinos)
              </SelectItem>
              <SelectItem value="occasional">
                Ocasionais (0-9 treinos)
              </SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleResetFilters} variant="outline">
            Redefinir Filtros
          </Button>
          <Button onClick={handleRefreshData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar Dados
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Número de Treinos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={Object.values(workoutsTrendData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  name="Número de Treinos"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução da Nota Média</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={Object.values(ratingTrendData).map((d) => ({
                  ...d,
                  avgRating: d.rating / d.count,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgRating"
                  stroke="#82ca9d"
                  name="Nota Média"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {clientDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desempenho dos Treinadores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trainersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="totalWorkouts"
                  fill="#8884d8"
                  name="Total de Treinos"
                />
                <Bar
                  yAxisId="right"
                  dataKey="averageRating"
                  fill="#82ca9d"
                  name="Nota Média"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Treinos Realizados</TableHead>
                <TableHead>Peso Atual (kg)</TableHead>
                <TableHead>% Gordura Corporal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsData.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.workouts}</TableCell>
                  <TableCell>{client.weight}</TableCell>
                  <TableCell>{client.bodyFat}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleExportReport}>
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>
    </div>
  );
}
