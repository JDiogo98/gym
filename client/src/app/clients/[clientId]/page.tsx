"use client";

import React, { use, useEffect, useState } from "react";
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
import { useParams } from "next/navigation";
import api from "@/../../client/lib/api";

import { Toaster, toast } from "sonner";

import UserNotFound from "@/components/UserNotFound";
import LoadingSpinner from "@/components/Loading";
import { describe } from "node:test";
import { ClientInterface } from "../../../../types/client";

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
  // JD - Obter o id do cliente da URL

  const { clientId } = useParams();

  const [clientData, setClient] = useState<ClientInterface | null>(null);

  const [editMode, setEditMode] = useState(false);

  const [loadingUserData, setLoadingUserData] = React.useState(true);

  const [userNotFound, setUserNotFound] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);

    if (clientData) {
      api
        .put(`api/clients/${clientData.id}`, clientData)
        .then((response) => {
          setClient(response.data);
          toast.success(
            `Os dados do/a ${clientData.name} foram atualizados com sucesso!`
          );
        })
        .catch((error) => {
          toast.error(
            `Não foi possível atualizar os dados do/a ${clientData.name}, tente novamente.`,
            {
              description: error.response.data.error,
            }
          );
        });
    }
  };

  function handleDelete() {}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (clientData) {
      setClient({ ...clientData, [e.target.name]: e.target.value });
    }
  };

  React.useEffect(() => {
    if (!clientId) return;
    api
      .get(`api/clients/${clientId}`)
      .then((response) => {
        setClient(response.data);
        setLoadingUserData(false);
      })
      .catch((error) => {
        console.error("Error fetching clients data:", error);
        setUserNotFound(true);
        setLoadingUserData(false);
        toast.error("Não foi possível encontrar os dados do cliente.", {
          duration: 5000,
          description: error.response.data.error,
        }),
          setTimeout(() => {
            window.history.back();
          }, 5000);
      });
  }, [clientId]);

  return (
    <div className="p-4 w-full">
      {userNotFound && <UserNotFound onRetry={() => refreshPage()} />}
      {loadingUserData && (
        <LoadingSpinner text="Carregar dados do Utilizador" />
      )}
      {clientData && (
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
                    value={clientData.name}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <Label htmlFor="sex">Sexo</Label>
                  <Select
                    value={clientData.sex}
                    onValueChange={(value) =>
                      setClient({ ...clientData, sex: value })
                    }
                    disabled={!editMode}
                  >
                    <SelectTrigger className="border p-2 rounded-md">
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact">Telemóvel</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={clientData.phoneNumber}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="dataInscricao">Data de Inscrição</Label>
                <Input
                  id="registrationDate"
                  name="registrationDate"
                  value={clientData.registrationDate}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              {editMode ? (
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
                id={String(clientData.id)}
                name={clientData.name}
                showText={true}
                handleDelete={() => handleDelete} // Aqui não faz nada porque não é necessário
              ></DeleteButton>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Progresso Físico */}
      {/* Training Evolution */}
      {/* <div className="grid gap-4">
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
      </div> */}
      <Toaster />
    </div>
  );
}
