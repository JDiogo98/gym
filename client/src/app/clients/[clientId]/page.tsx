"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  UserCircleIcon,
} from "lucide-react";
import { DeleteButton } from "@/components/DeleteButton";
import { useParams } from "next/navigation";
import api from "@/../../client/lib/api";

import { toast } from "sonner";

import UserNotFound from "@/components/UserNotFound";
import LoadingSpinner from "@/components/Loading";
import { ClientInterface } from "../../../../types/client";
import dayjs from "dayjs";
import { PhoneInput } from "@/components/phone-input";
import { LastTrainigs } from "@/components/LastTrainings";

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

  const { clientId: rawClientId } = useParams();

  const clientId = useMemo(
    () => (rawClientId ? Number(rawClientId) : undefined),
    [rawClientId]
  );

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
        .put(`api/clients/${clientData.clientId}`, clientData)
        .then((response) => {
          setClient(response.data);
          toast.success(
            `Os dados do/a ${clientData.clientName} foram atualizados com sucesso!`
          );
        })
        .catch((error) => {
          toast.error(
            `Não foi possível atualizar os dados do/a ${clientData.clientName}, tente novamente.`,
            {
              description: error.response.data.error,
            }
          );
        });
    }
  };

  function handleDelete() {}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange", e.target.name, e.target.value);

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
        });
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
        <Card className="my-6 w-full">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text select-none">
                Informações Pessoais
              </CardTitle>
              <UserCircleIcon className="ml-auto w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 w-max">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={clientData.clientName}
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{ fontSize: "1rem" }}
                  />
                </div>
                <div>
                  <Label htmlFor="sex">Sexo</Label>
                  <Select
                    value={clientData.clientSex}
                    onValueChange={(value) =>
                      setClient({ ...clientData, clientSex: value })
                    }
                    disabled={!editMode}
                  >
                    <SelectTrigger
                      className="border p-2 rounded-md"
                      style={{ fontSize: "1rem" }}
                    >
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Feminino</SelectItem>
                      <SelectItem value="O">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact">Telemóvel</Label>
                  <PhoneInput
                    name="clientPhoneNumber"
                    value={clientData.clientPhoneNumber}
                    onChange={(value) =>
                      setClient({
                        ...clientData,
                        clientPhoneNumber: value,
                      })
                    }
                    placeholder="Número de telemóvel"
                    defaultCountry="PT"
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="dataInscricao">Data de Inscrição</Label>
                <Input
                  id="clientRegistrationDate"
                  name="clientRegistrationDate"
                  value={
                    clientData.clientRegistrationDate
                      ? dayjs(clientData.clientRegistrationDate).format(
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  onChange={handleChange}
                  disabled={!editMode}
                  type="date"
                  style={{ fontSize: "1rem" }}
                />
              </div>
              <div className="mt-4 flex justify-between gap-4">
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
                  id={String(clientData.clientId)}
                  name={clientData.clientName}
                  showText={true}
                  handleDelete={() => handleDelete}
                ></DeleteButton>
              </div>
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
              <CardTitle className="text-xl select-none">
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
                {clienteData.ultimosTreinos.map((treino, index) => (
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
      <LastTrainigs
        filters={{
          clientId: clientId ? Number(clientId) : undefined,
          startDate: new Date("1999-01-01"),
        }}
      ></LastTrainigs>
    </div>
  );
}
