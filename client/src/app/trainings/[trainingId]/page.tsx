"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  ClipboardEditIcon,
  SaveIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { toast } from "sonner";
import api from "../../../../lib/api";
import LoadingSpinner from "@/components/Loading";
import { TrainingDuration } from "@/components/RegistationPage/PinAndTrainingValidation";

interface Training {
  trainingDate: string;
  client: {
    clientId: number;
    clientName: string;
  };
  coach: {
    coachId: number;
    coachName: string;
  };
  academy: {
    academyId: number;
    academyName: string;
  };
  trainingType: {
    trainingTypeId: number;
    trainingTypeName: string;
  };
  trainingDuration: {
    durationId: number;
    durationName: string;
  };
}

export default function TrainingPage() {
  const { trainingId } = useParams();
  const router = useRouter();

  const [training, setTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [avaliableAcademies, setAvaliableAcademies] = useState<
    { academyId: number; academyName: string }[]
  >([]);
  const [avaliableCoaches, setAvaliableCoaches] = useState<
    { coachId: number; coachName: string }[]
  >([]);
  const [avaliableTrainingTypes, setAvaliableTrainingTypes] = useState<
    { trainingTypeId: number; trainingTypeName: string }[]
  >([]);

  const [availableTrainingDuration, setAvailableTrainingDuration] = useState<
    TrainingDuration[]
  >([]);

  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);

    if (trainingId) {
      api
        .put(`api/training/id/${trainingId}`, {
          trainingDate: training?.trainingDate,
          clientId: training?.client.clientId,
          coachId: training?.coach.coachId,
          academyId: training?.academy.academyId,
          trainingTypeId: training?.trainingType.trainingTypeId,
          durationId: training?.trainingDuration.durationId,
        })
        .then((response) => {
          toast.success("Treino atualizado com sucesso.");
        })
        .catch((error) => {
          toast.error("Erro ao atualizar treino, por favor tente novamente.");
        });
    }
  };

  const handleSelectChange = <K extends keyof Training>(
    name: K,
    value: Training[K]
  ) => {
    setTraining((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // Fazendo as requisições simultaneamente
        const [
          trainingData,
          academiesResponse,
          coachesResponse,
          trainingTypesResponse,
          trainingDurations,
        ] = await Promise.all([
          api.get(`api/training/id/${trainingId}`),
          api.get("/api/academies"),
          api.get("/api/coaches"),
          api.get("/api/trainingTypes"),
          api.get("/api/durations"),
        ]);

        if (isMounted) {
          // Atualiza o estado com os dados do treino
          setTraining({
            trainingDate: trainingData.data.trainingDate,
            client: trainingData.data.client,
            coach: trainingData.data.coach,
            academy: trainingData.data.academy,
            trainingType: trainingData.data.trainingType,
            trainingDuration: trainingData.data.trainingDuration,
          });

          // Atualiza os dados adicionais (academies, coaches, training types)
          setAvaliableAcademies(academiesResponse.data);
          setAvaliableCoaches(coachesResponse.data);
          setAvaliableTrainingTypes(trainingTypesResponse.data);
          setAvailableTrainingDuration(trainingDurations.data);
        }
      } catch (error) {
        toast.error("Erro ao buscar dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [trainingId]);

  if (loading) {
    return (
      <Card className="h-5/6 flex justify-center items-center m-8 mb-16">
        <LoadingSpinner />
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      {training && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Treino</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Input
                    id="client"
                    value={training?.client.clientName}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trainer">Treinador</Label>
                  <Select
                    value={training?.coach.coachId.toString()}
                    onValueChange={(value) => {
                      const selectedCoach = avaliableCoaches.find(
                        (coach) => coach.coachId.toString() === value
                      );
                      handleSelectChange("coach", selectedCoach!);
                    }}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data do Treino</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                        disabled={!editMode}
                      >
                        {training?.trainingDate ? (
                          <span>
                            {new Date(
                              training?.trainingDate
                            ).toLocaleDateString()}
                          </span>
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          training?.trainingDate
                            ? new Date(training.trainingDate)
                            : undefined
                        }
                        onSelect={(date) => {
                          handleSelectChange(
                            "trainingDate",
                            dayjs(date).toISOString()
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora do Treino</Label>
                  <Input
                    className="text-sm"
                    id="time"
                    name="time"
                    type="time"
                    value={training?.trainingDate.split("T")[1].split(".")[0]}
                    onChange={(e) =>
                      handleSelectChange(
                        "trainingDate",
                        `${training?.trainingDate.split("T")[0]}T${
                          e.target.value
                        }:00`
                      )
                    }
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Treino</Label>
                  <Select
                    value={training?.trainingType.trainingTypeId.toString()}
                    onValueChange={(value) => {
                      const selectedTrainingType = avaliableTrainingTypes.find(
                        (trainingType) =>
                          trainingType.trainingTypeId.toString() === value
                      );
                      handleSelectChange("trainingType", selectedTrainingType!);
                    }}
                    disabled={!editMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de treino" />
                    </SelectTrigger>
                    <SelectContent>
                      {avaliableTrainingTypes &&
                        avaliableTrainingTypes.map((trainingType) => (
                          <SelectItem
                            key={trainingType.trainingTypeId}
                            value={trainingType.trainingTypeId.toString()}
                          >
                            {trainingType.trainingTypeName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Select
                    value={training?.academy.academyId.toString()}
                    onValueChange={(value) => {
                      const selectedAcademy = avaliableAcademies.find(
                        (academy) => academy.academyId.toString() === value
                      );
                      handleSelectChange("academy", selectedAcademy!);
                    }}
                    disabled={!editMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a localização" />
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
                  <Label htmlFor="location">Duração</Label>
                  <Select
                    value={training?.trainingDuration.durationId.toString()}
                    onValueChange={(value) => {
                      const selectedDuration = availableTrainingDuration.find(
                        (duration) => duration.durationId.toString() === value
                      );
                      handleSelectChange("trainingDuration", selectedDuration!);
                    }}
                    disabled={!editMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a localização" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTrainingDuration &&
                        availableTrainingDuration.map((duration) => (
                          <SelectItem
                            key={duration.durationId}
                            value={duration.durationId.toString()}
                          >
                            {duration.durationName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
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
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
