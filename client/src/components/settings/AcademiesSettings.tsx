"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import api from "../../../lib/api";
import { toast } from "sonner";
import LoadingSpinner from "../Loading";
import { AxiosError } from "axios";
import { ACADEMY_SETTINGS } from "@/locales/strings";

const validateAcademy = (currentAcademy: any) => {
  if (!currentAcademy) return false;

  // Campos obrigatórios e seus mínimos de caracteres
  const requiredFields = [
    { field: "academyName", label: ACADEMY_SETTINGS.NAME.LABEL, minLength: 3 },
    {
      field: "academyAddress",
      label: ACADEMY_SETTINGS.ADDRESS.LABEL,
      minLength: 3,
    },
    {
      field: "academyLocation",
      label: ACADEMY_SETTINGS.LOCATION.LABEL,
      minLength: 3,
    },
    {
      field: "academyZipCode",
      label: ACADEMY_SETTINGS.ZIP_CODE.LABEL,
      minLength: 8,
      maxLength: 8,
      pattern: /^\d{4}-\d{3}$/,
    },
  ];

  for (const {
    field,
    label,
    minLength,
    maxLength,
    pattern,
  } of requiredFields) {
    const value = currentAcademy[field];

    if (!value) {
      toast.error(
        `${ACADEMY_SETTINGS.VALIDATION_FIELDS.FILL_THE_FIELD} ${label}.`
      );
      return false;
    }

    if (minLength && value.length < minLength) {
      toast.error(
        `${label} ${ACADEMY_SETTINGS.VALIDATION_FIELDS.MUST_HAVE_MIN} ${minLength} ${ACADEMY_SETTINGS.VALIDATION_FIELDS.CARACTERES}.`
      );
      return false;
    }

    if (maxLength && value.length > maxLength) {
      toast.error(
        `${label} ${ACADEMY_SETTINGS.VALIDATION_FIELDS.MUST_HAVE_MIN} ${maxLength} ${ACADEMY_SETTINGS.VALIDATION_FIELDS.CARACTERES}.`
      );
      return false;
    }

    if (pattern && !pattern.test(value)) {
      toast.error(`${label} deve estar no formato correto.`);
      return false;
    }
  }

  return true;
};

type Academy = {
  academyId: number;
  academyName: string;
  academyAddress: string;
  academyLocation: string;
  academyZipCode: string;
  academyVisible: boolean;
};

export default function AcademiesSettings() {
  const [loading, setLoading] = useState(true);

  const [avaliableAcademies, setAvaliableAcademies] = useState<
    Academy[] | undefined
  >();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAcademy, setCurrentAcademy] = useState<Academy | undefined>();
  const [newAcademy, setNewAcademy] = useState<Academy | undefined>();

  const handleAddAcademy = async () => {
    console.log(newAcademy);

    if (!newAcademy) {
      toast.error(ACADEMY_SETTINGS.TOAST.FILL_FIELDS);
      return;
    }

    if (!validateAcademy(newAcademy)) return;

    try {
      const response = await api.post("api/academies/", {
        academyName: newAcademy.academyName.trim(),
        academyAddress: newAcademy.academyAddress.trim(),
        academyLocation: newAcademy.academyLocation.trim(),
        academyZipCode: newAcademy.academyZipCode.trim(),
        academyVisible: true,
      });

      const addedAcademy = {
        ...newAcademy,
        academyId: response.data.academyId,
        academyVisible: true,
      };
      setAvaliableAcademies([...(avaliableAcademies || []), addedAcademy]);
      setNewAcademy(undefined);
      setIsAddDialogOpen(false);

      toast.success(ACADEMY_SETTINGS.TOAST.ADD_SUCCESS);
    } catch (error) {
      console.error(ACADEMY_SETTINGS.TOAST.ADD_ERROR, error);

      let errorMessage = ACADEMY_SETTINGS.TOAST.UNEXPECTED_ERROR;

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.error ||
          ACADEMY_SETTINGS.TOAST.UNEXPECTED_ERROR;
        toast.error(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleEditAcademy = async () => {
    if (!currentAcademy) return;
    if (!validateAcademy(currentAcademy)) return;

    try {
      await api.put(`api/academies/${currentAcademy.academyId}`, {
        academyName: currentAcademy.academyName.trim(),
        academyAddress: currentAcademy.academyAddress.trim(),
        academyLocation: currentAcademy.academyLocation.trim(),
        academyZipCode: currentAcademy.academyZipCode.trim(),
        academyVisible: currentAcademy.academyVisible,
      });

      setAvaliableAcademies((avaliableAcademies) =>
        avaliableAcademies?.map((academy) =>
          academy.academyId === currentAcademy.academyId
            ? currentAcademy
            : academy
        )
      );

      // Fechar o modal de edição
      setIsEditDialogOpen(false);

      // Exibir mensagem de sucesso
      toast.success(ACADEMY_SETTINGS.TOAST.UPDATE_SUCCESS);
    } catch (error) {
      console.error(ACADEMY_SETTINGS.TOAST.UPDATE_ERROR, error);

      let errorMessage = ACADEMY_SETTINGS.TOAST.UNEXPECTED_ERROR;

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.error || ACADEMY_SETTINGS.TOAST.SERVER_ERROR;
        toast.error(errorMessage, {
          description: error.response?.data?.description,
        });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await api.put(`api/academies/visible/${id}`);
      setAvaliableAcademies(
        avaliableAcademies?.map((academy) =>
          academy.academyId === id
            ? { ...academy, academyVisible: !academy.academyVisible }
            : academy
        )
      );
      toast.success(ACADEMY_SETTINGS.TOAST.UPDATE_SUCCESS);
    } catch (error) {
      console.error(error);
      let errorMessage = ACADEMY_SETTINGS.TOAST.UNEXPECTED_ERROR;

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.error ||
          ACADEMY_SETTINGS.TOAST.UNEXPECTED_ERROR;
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
        const [academiesResponse] = await Promise.all([
          api.get("/api/academies/all"),
        ]);
        if (isMounted) {
          setAvaliableAcademies(academiesResponse.data);
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
          <CardTitle>{ACADEMY_SETTINGS.ACADEMIES_SETTINGS}</CardTitle>
          <CardContent>
            <LoadingSpinner text={ACADEMY_SETTINGS.LOADING_ACADEMIES} />
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
            <CardTitle>{ACADEMY_SETTINGS.EDIT_ACADEMIES}</CardTitle>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {ACADEMY_SETTINGS.ADD_ACADEMY}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{ACADEMY_SETTINGS.ADD_NEW_ACADEMY}</DialogTitle>
                <DialogDescription>
                  {ACADEMY_SETTINGS.FILL_NEW_ACADEMY_FIELDS}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-name">
                    {ACADEMY_SETTINGS.NAME.LABEL}
                  </Label>
                  <Input
                    placeholder={ACADEMY_SETTINGS.NAME.PLACEHOLDER}
                    id="new-name"
                    value={newAcademy?.academyName || ""}
                    onChange={(e) =>
                      setNewAcademy((prev) => ({
                        ...prev!,
                        academyName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="new-address">
                    {ACADEMY_SETTINGS.ADDRESS.LABEL}
                  </Label>
                  <Input
                    placeholder={ACADEMY_SETTINGS.ADDRESS.PLACEHOLDER}
                    id="new-address"
                    value={newAcademy?.academyAddress || ""}
                    onChange={(e) =>
                      setNewAcademy((prev) => ({
                        ...prev!,
                        academyAddress: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="new-location">Localidade</Label>
                  <Input
                    placeholder={ACADEMY_SETTINGS.LOCATION.PLACEHOLDER}
                    id="new-location"
                    value={newAcademy?.academyLocation || ""}
                    onChange={(e) =>
                      setNewAcademy((prev) => ({
                        ...prev!,
                        academyLocation: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="new-zipcode">Código Postal</Label>
                  <Input
                    placeholder={ACADEMY_SETTINGS.ZIP_CODE.PLACEHOLDER}
                    id="new-zipcode"
                    value={newAcademy?.academyZipCode || ""}
                    onChange={(e) =>
                      setNewAcademy((prev) => ({
                        ...prev!,
                        academyZipCode: e.target.value,
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
                <Button onClick={handleAddAcademy}>Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{ACADEMY_SETTINGS.NAME.LABEL}</TableHead>
              <TableHead>{ACADEMY_SETTINGS.LOCATION.LABEL}</TableHead>
              <TableHead>{ACADEMY_SETTINGS.STATUS.LABEL}</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {avaliableAcademies?.map((academy) => (
              <TableRow key={academy.academyId}>
                <TableCell className="font-medium">
                  {academy.academyName}
                </TableCell>
                <TableCell>{academy.academyLocation}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={academy.academyVisible}
                      onCheckedChange={() =>
                        handleToggleActive(academy.academyId)
                      }
                    />
                    <span>
                      {academy.academyVisible
                        ? ACADEMY_SETTINGS.STATUS.ACTIVE
                        : ACADEMY_SETTINGS.STATUS.INACTIVE}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog
                    open={
                      isEditDialogOpen &&
                      currentAcademy?.academyId === academy.academyId
                    }
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setCurrentAcademy(undefined);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCurrentAcademy(academy)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {ACADEMY_SETTINGS.EDIT_ACADEMY}
                        </DialogTitle>
                        <DialogDescription>
                          {ACADEMY_SETTINGS.UPDATE_ACADEMY_DETAILS}
                        </DialogDescription>
                      </DialogHeader>
                      {currentAcademy && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-name">
                              {ACADEMY_SETTINGS.NAME.LABEL}
                            </Label>
                            <Input
                              id="edit-name"
                              value={currentAcademy.academyName}
                              onChange={(e) =>
                                setCurrentAcademy({
                                  ...currentAcademy,
                                  academyName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-address">
                              {ACADEMY_SETTINGS.ADDRESS.LABEL}
                            </Label>
                            <Input
                              id="edit-address"
                              value={currentAcademy.academyAddress}
                              onChange={(e) =>
                                setCurrentAcademy({
                                  ...currentAcademy,
                                  academyAddress: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-address">
                              {ACADEMY_SETTINGS.LOCATION.LABEL}
                            </Label>
                            <Input
                              placeholder={
                                ACADEMY_SETTINGS.LOCATION.PLACEHOLDER
                              }
                              id="edit-address"
                              value={currentAcademy.academyLocation}
                              onChange={(e) =>
                                setCurrentAcademy({
                                  ...currentAcademy,
                                  academyLocation: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-address">
                              {ACADEMY_SETTINGS.ZIP_CODE.LABEL}
                            </Label>
                            <Input
                              placeholder={
                                ACADEMY_SETTINGS.ZIP_CODE.PLACEHOLDER
                              }
                              id="edit-address"
                              value={currentAcademy.academyZipCode}
                              onChange={(e) =>
                                setCurrentAcademy({
                                  ...currentAcademy,
                                  academyZipCode: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="edit-active"
                              checked={currentAcademy.academyVisible}
                              onCheckedChange={(checked) =>
                                setCurrentAcademy({
                                  ...currentAcademy,
                                  academyVisible: checked,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                        >
                          {ACADEMY_SETTINGS.BUTTONS.CANCEL}
                        </Button>
                        <Button onClick={handleEditAcademy}>
                          {ACADEMY_SETTINGS.BUTTONS.SAVE}
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

//todo apagar todos console.log()
// todo limpar todos comentários
// todo lidar com sem resultados
