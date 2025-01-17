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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WheightEvolution from "@/components/ClientInformation/wheightEvolution";
import TrainingEvolution from "@/components/ClientInformation/trainingEvolution";
import {
  ActivityIcon,
  ClipboardEditIcon,
  PieChartIcon,
  SaveIcon,
} from "lucide-react";
import { DeleteButton } from "@/components/DeleteButton";

// Simulated data - in a real app, this would come from an API or database
const clienteData = {
  id: "1",
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
    <div className="p-4 w-full">
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
          <div className="mt-4 flex gap-4">
            {editando ? (
              <Button onClick={handleSave}>
                <SaveIcon>n</SaveIcon>
                Salvar
              </Button>
            ) : (
              <Button onClick={handleEdit}>
                <ClipboardEditIcon />
                Editar
              </Button>
            )}
            <DeleteButton
              id={cliente.id}
              name={cliente.name}
              showText={true}
            ></DeleteButton>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WheightEvolution></WheightEvolution>
          <TrainingEvolution></TrainingEvolution>
        </section>
        <Card className="mb-6">
          <CardHeader>
            <div className="text-base flex items-center justify-center">
              <CardTitle className="text-xl  text-gray-800 select-none">
                Últimos Treinos
              </CardTitle>
              <ActivityIcon className="ml-auto w-5 h-5"></ActivityIcon>
            </div>{" "}
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
