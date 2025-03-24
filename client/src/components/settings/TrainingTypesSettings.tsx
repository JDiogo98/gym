"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { apiPrivate } from "../../../lib/api";
import { toast } from "sonner";
import { TRAINING_TYPES_SETTINGS } from "@/locales/strings";
import LoadingSpinner from "../Loading";
import { AxiosError } from "axios";

type TrainingType = {
  trainingTypeId: number;
  trainingTypeName: string;
  trainingTypeVisible: boolean;
};

//todo verificar diferença entre type e interface e colocar tudo num file

export default function TrainingTypesSettings() {
  const [availableTrainingTypes, setAvailableTrainingTypes] = useState<
    TrainingType[] | undefined
  >([]);

  const [loading, setLoading] = useState(true);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentType, setCurrentType] = useState<any>(null);
  const [newType, setNewType] = useState<TrainingType | undefined>();

  const handleAddType = async () => {
    if (!newType) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    if (newType.trainingTypeName.length < 2) return;

    try {
      const response = await apiPrivate.post("api/trainingTypes/", {
        trainingTypeName: newType.trainingTypeName.trim(),
        trainingTypeVisible: true,
      });

      const addedType: TrainingType = {
        trainingTypeId: response.data.trainingTypeId,
        trainingTypeName: newType.trainingTypeName || "",
        trainingTypeVisible: true,
      };

      setAvailableTrainingTypes([...(availableTrainingTypes || []), addedType]);
      setNewType(undefined);
      setIsAddDialogOpen(false);

      toast.success(TRAINING_TYPES_SETTINGS.TOAST.ADD_SUCCESS);
    } catch (error) {
      let errorMessage = TRAINING_TYPES_SETTINGS.TOAST.UNEXPECTED_ERROR;

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.error ||
          TRAINING_TYPES_SETTINGS.TOAST.UNEXPECTED_ERROR;
        toast.error(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleEditType = async (id: number) => {
    if (!currentType) return;

    try {
      const response = await apiPrivate.put(`api/trainingTypes/${id}`, {
        trainingTypeName: currentType?.trainingTypeName.trim(),
        trainingTypeVisible: currentType?.trainingTypeVisible,
      });

      const edditedType = {
        trainingTypeName: response.data.trainingTypeName,
        trainingTypeId: response.data.trainingTypeId,
        trainingTypeVisible: response.data.trainingTypeVisible,
      };

      setAvailableTrainingTypes((availableTrainingTypes) =>
        availableTrainingTypes?.map((type) =>
          type.trainingTypeId === id ? edditedType : type
        )
      );
      setNewType(undefined);
      setIsEditDialogOpen(false);
      toast.success(TRAINING_TYPES_SETTINGS.TOAST.UPDATE_SUCCESS);
    } catch (error) {
      console.error(TRAINING_TYPES_SETTINGS.TOAST.UPDATE_ERROR, error);

      let errorMessage = TRAINING_TYPES_SETTINGS.TOAST.UNEXPECTED_ERROR;

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.error ||
          TRAINING_TYPES_SETTINGS.TOAST.UNEXPECTED_ERROR;
        toast.error(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleToggleActive = async (trainingTypeId: number) => {
    try {
      await apiPrivate.put(`api/trainingTypes/visible/${trainingTypeId}`, {
        trainingTypeVisible: !availableTrainingTypes?.find(
          (type) => type.trainingTypeId === trainingTypeId
        )?.trainingTypeVisible,
      });

      setAvailableTrainingTypes(
        availableTrainingTypes?.map((trainingType) =>
          trainingType.trainingTypeId === trainingTypeId
            ? {
                ...trainingType,
                trainingTypeVisible: !trainingType.trainingTypeVisible,
              }
            : trainingType
        )
      );
      toast.success(TRAINING_TYPES_SETTINGS.TOAST.UPDATE_SUCCESS);
    } catch (error) {
      console.error(error);
      let errorMessage = TRAINING_TYPES_SETTINGS.TOAST.UNEXPECTED_ERROR;

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.error ||
          TRAINING_TYPES_SETTINGS.TOAST.UNEXPECTED_ERROR;
        toast.error(errorMessage, {
          description: error.response?.data?.description,
        });
      }
    }
  };

  const setDeleteType = async (trainingTypeId: number) => {
    try {
      await apiPrivate.delete(`api/trainingTypes/${trainingTypeId}`);
      setAvailableTrainingTypes(
        availableTrainingTypes?.filter(
          (type) => type.trainingTypeId !== trainingTypeId
        )
      );
      toast.success(TRAINING_TYPES_SETTINGS.TOAST.DELETE_SUCESS);
    } catch (error) {
      console.error(error);
      let errorMessage = TRAINING_TYPES_SETTINGS.TOAST.UNEXPECTED_ERROR;

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.error ||
          TRAINING_TYPES_SETTINGS.TOAST.UNEXPECTED_ERROR;
        toast.error(errorMessage, {
          description: error.response?.data?.description,
        });
      }
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [trainingTypesResponse] = await Promise.all([
          apiPrivate.get("/api/trainingTypes/all"),
        ]);
        if (isMounted) {
          setAvailableTrainingTypes(trainingTypesResponse.data);
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
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{TRAINING_TYPES_SETTINGS.TYPES_SETTINGS}</CardTitle>
          <CardContent>
            <LoadingSpinner text={TRAINING_TYPES_SETTINGS.TYPES_SETTINGS} />
          </CardContent>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Tipos de Treino</CardTitle>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Tipo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Tipo de Treino</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do novo tipo de treino.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="trainingTypeName">Nome</Label>
                  <Input
                    id="trainingTypeName"
                    value={newType?.trainingTypeName}
                    onChange={(e) =>
                      setNewType((prev) => ({
                        ...prev!,
                        trainingTypeName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddType}>Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableTrainingTypes?.map((type) => (
              <TableRow key={type.trainingTypeId}>
                <TableCell className="font-medium">
                  {type.trainingTypeName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={type.trainingTypeVisible}
                      onCheckedChange={() =>
                        handleToggleActive(type.trainingTypeId)
                      }
                    />
                    <span>
                      {type.trainingTypeVisible ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog
                    open={
                      isEditDialogOpen &&
                      currentType?.trainingTypeId === type.trainingTypeId
                    }
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setCurrentType(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCurrentType(type)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Tipo de Treino</DialogTitle>
                        <DialogDescription>
                          Atualize os detalhes do tipo de treino.
                        </DialogDescription>
                      </DialogHeader>
                      {currentType && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-trainingTypeName">Nome</Label>
                            <Input
                              id="edit-trainingTypeName"
                              value={currentType.trainingTypeName}
                              onChange={(e) =>
                                setCurrentType({
                                  ...currentType,
                                  trainingTypeName: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              id="edit-trainingTypeVisible"
                              checked={currentType.trainingTypeVisible}
                              onCheckedChange={(checked) =>
                                setCurrentType({
                                  ...currentType,
                                  trainingTypeVisible: checked,
                                })
                              }
                            />
                            <Label htmlFor="edit-trainingTypeVisible">
                              Tipo Ativo
                            </Label>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            setDeleteType(currentType.trainingTypeId)
                          }
                        >
                          Eliminar
                        </Button>
                        <Button
                          onClick={() =>
                            handleEditType(currentType.trainingTypeId)
                          }
                        >
                          Salvar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
