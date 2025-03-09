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

import { ClipboardEditIcon, SaveIcon, UserCircleIcon } from "lucide-react";
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

// Títulos e Labels
const Title = "Detalhes do Cliente";

export default function DetalhesCliente() {
  // JD - Obter o id do cliente da URL
  const { clientId: rawClientId } = useParams();

  const clientId = useMemo(
    () => (rawClientId ? Number(rawClientId) : undefined),
    [rawClientId]
  );

  const [avaliableAcademies, setAvaliableAcademies] = useState<
    { academyId: number; academyName: string }[]
  >([]);
  const [avaliableCoaches, setAvaliableCoaches] = useState<
    { coachId: number; coachName: string }[]
  >([]);

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
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // Fazendo as requisições simultaneamente
        const [academiesResponse, coachesResponse] = await Promise.all([
          api.get("/api/academies"),
          api.get("/api/coaches"),
        ]);

        if (isMounted) {
          // Atualiza os dados adicionais (academies, coaches, )
          setAvaliableAcademies(academiesResponse.data);
          setAvaliableCoaches(coachesResponse.data);
        }
      } catch (error) {
        toast.error("Erro ao buscar dados.");
      } finally {
        setLoadingUserData(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filters = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);

    return {
      clientId: clientId ? Number(clientId) : undefined,
      startDate: new Date("1999-01-01"),
      endDate: tomorrow,
    };
  }, [clientId]);

  if (loadingUserData) {
    return (
      <Card className="mx-4 my-6 w-full">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text select-none">
              Informações Pessoais
            </CardTitle>
            <UserCircleIcon className="ml-auto w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <LoadingSpinner text="Carregar dados do Utilizador" />
        </CardContent>
      </Card>
    );
  }

  if (userNotFound) {
    return (
      <Card className="m-4 my-8 w-full">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text select-none">
              Informações Pessoais
            </CardTitle>
            <UserCircleIcon className="ml-auto w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <UserNotFound onRetry={() => refreshPage()} />;
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-4 w-full">
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
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                  <Label>Nome</Label>
                  <Input
                    id="clientName"
                    value={clientData?.clientName}
                    name="clientName"
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{ fontSize: "1rem" }}
                  />
                </div>
                <div className="w-full">
                  <Label>Sexo</Label>
                  <Select
                    value={clientData?.clientSex}
                    onValueChange={(value) =>
                      setClient({
                        ...clientData,
                        clientSex: value,
                      } as ClientInterface)
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
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Data de Nascimento</Label>
                  <Input
                    id="clientBirthDate"
                    name="clientBirthDate"
                    value={
                      clientData?.clientBirthDate
                        ? dayjs(clientData?.clientBirthDate).format(
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
                <div>
                  <Label>Data de Inscrição</Label>
                  <Input
                    id="clientRegistrationDate"
                    name="clientRegistrationDate"
                    value={
                      clientData?.clientRegistrationDate
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
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Telemóvel</Label>
                  <PhoneInput
                    name="clientPhoneNumber"
                    value={clientData?.clientPhoneNumber}
                    onChange={(value) =>
                      setClient({
                        ...clientData,
                        clientPhoneNumber: value,
                        clientId: clientData?.clientId,
                      } as ClientInterface)
                    }
                    placeholder="Número de telemóvel"
                    defaultCountry="PT"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input
                    value={clientData?.clientMail}
                    id="clientMail"
                    name="clientMail"
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{ fontSize: "1rem", height: "3rem" }}
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Academia</Label>
                  <Select
                    value={clientData?.academyId.toString()}
                    onValueChange={(value) =>
                      setClient({
                        ...clientData,
                        academyId: Number(value),
                      } as ClientInterface)
                    }
                    disabled={!editMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a academia" />
                    </SelectTrigger>
                    <SelectContent>
                      {avaliableAcademies &&
                        avaliableAcademies.map((academy) => (
                          <SelectItem
                            key={academy.academyId}
                            value={academy.academyId.toString()}
                          >
                            {academy.academyName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Treinador</Label>
                  <Select
                    value={clientData?.coachId.toString()}
                    onValueChange={(value) =>
                      setClient({
                        ...clientData,
                        coachId: Number(value),
                      } as ClientInterface)
                    }
                    disabled={!editMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o treinador" />
                    </SelectTrigger>
                    <SelectContent>
                      {avaliableCoaches &&
                        avaliableCoaches.map((coach) => (
                          <SelectItem
                            key={coach.coachId}
                            value={coach.coachId.toString()}
                          >
                            {coach.coachName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              {editMode ? (
                <Button onClick={handleSave}>
                  <SaveIcon></SaveIcon>
                  Salvar
                </Button>
              ) : (
                <Button onClick={handleEdit}>
                  <ClipboardEditIcon />
                  Editar
                </Button>
              )}
              <DeleteButton
                id={String(clientData?.clientId)}
                name={clientData?.clientName || ""}
                showText={true}
                handleDelete={() => handleDelete}
              ></DeleteButton>
            </div>
          </div>
        </CardContent>
      </Card>

      <LastTrainigs filters={filters}></LastTrainigs>
    </div>
  );
}
