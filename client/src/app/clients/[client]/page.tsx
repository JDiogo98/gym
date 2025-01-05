"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import PhysicalEvolution from "@/components/ClientInformation/wheightEvolution";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Simulated data - in a real app, this would come from an API or database
const clienteData = {
  id: 1,
  name: "João Silva",
  sex: "Homem",
  contact: "912345678",
  dataInscricao: "2023-01-15",
  ultimosTreinos: [
    { data: "2024-03-10", tipo: "Musculação", duracao: 60 },
    { data: "2024-03-08", tipo: "Cardio", duracao: 45 },
    { data: "2024-03-05", tipo: "Yoga", duracao: 90 },
    { data: "2024-03-10", tipo: "Musculação", duracao: 60 },
    { data: "2024-03-08", tipo: "Cardio", duracao: 45 },
    { data: "2024-03-05", tipo: "Yoga", duracao: 90 },
    { data: "2024-03-10", tipo: "Musculação", duracao: 60 },
    { data: "2024-03-08", tipo: "Cardio", duracao: 45 },
    { data: "2024-03-05", tipo: "Yoga", duracao: 90 },
    { data: "2024-03-10", tipo: "Musculação", duracao: 60 },
    { data: "2024-03-08", tipo: "Cardio", duracao: 45 },
    { data: "2024-03-05", tipo: "Yoga", duracao: 90 },
  ],
  progressoFisico: [
    { mes: "Jan", peso: 80, percentualGordura: 20 },
    { mes: "Fev", peso: 78, percentualGordura: 19 },
    { mes: "Mar", peso: 76, percentualGordura: 18 },
  ],
  treinosRealizados: [
    { mes: "Jan", quantidade: 12 },
    { mes: "Fev", quantidade: 15 },
    { mes: "Mar", quantidade: 20 },
    { mes: "Jasn", quantidade: 12 },
    { mes: "Fev", quantidade: 15 },
    { mes: "Mar", quantidade: 20 },
  ],
};

// Títulos e Labels
const Title = "Detalhes do Cliente";

export default function DetalhesCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(clienteData);
  const [editando, setEditando] = useState(false);

  const handleEdit = () => {
    setEditando(true);
  };

  const handleSave = () => {
    setEditando(false);
    console.log("Dados salvos:", cliente);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{Title}</h1>
      <Card className="mb-6 w-full">
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 w-max">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={cliente.name}
                  onChange={handleChange}
                  disabled={!editando}
                />
              </div>
              <div>
                <Label htmlFor="gender">Sexo</Label>
                <Select
                  id="gender"
                  name="gender"
                  value={cliente.sex}
                  onValueChange={handleChange}
                  disabled={!editando}
                >
                  <SelectTrigger className="border p-2 rounded-md">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Homem">Homem</SelectItem>
                    <SelectItem value="Mulher">Mulher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contact">Telemóvel</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={cliente.contact}
                  onChange={handleChange}
                  disabled={!editando}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="dataInscricao">Data de Inscrição</Label>
              <Input
                id="dataInscricao"
                name="dataInscricao"
                value={cliente.dataInscricao}
                onChange={handleChange}
                disabled={!editando}
              />
            </div>
          </div>
          <div className="mt-4">
            {editando ? (
              <Button onClick={handleSave}>Salvar</Button>
            ) : (
              <Button onClick={handleEdit}>Editar</Button>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhysicalEvolution></PhysicalEvolution>
          <Card>
            <CardHeader>
              <CardTitle>Treinos Realizados</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  quantidade: {
                    label: "Quantidade de Treinos",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className=""
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cliente.treinosRealizados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      dataKey="quantidade"
                      fill="var(--color-quantidade)"
                      name="Quantidade de Treinos"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Últimos Treinos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Duração (min)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cliente.ultimosTreinos.map((treino, index) => (
                  <TableRow key={index}>
                    <TableCell>{treino.data}</TableCell>
                    <TableCell>{treino.tipo}</TableCell>
                    <TableCell>{treino.duracao}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
