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
import { Plus } from "lucide-react";
import LoadingSpinner from "../Loading";
import { apiPrivate } from "../../../lib/api";
import { toast } from "sonner";

//todo colocar o type no arquivo próprio
// todo colocar as strings no arquivo de tradução

type Duration = {
  durationId: number;
  durationNumber: number;
  durationName: string;
  durationVisible: boolean;
};

export default function DurationsSettings() {
  const [loading, setLoading] = useState(true);

  const [availableTrainingDuration, setAvailableTrainingDuration] = useState<
    Duration[] | undefined
  >([]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newTrainingDuration, setNewTrainingDuration] = useState<
    Duration | undefined
  >();

  const handleAddDuration = async () => {
    if (
      newTrainingDuration?.durationNumber === undefined ||
      isNaN(newTrainingDuration.durationNumber) ||
      newTrainingDuration.durationNumber <= 0
    )
      return;


    
    const newDuration = {
      durationNumber: parseFloat(
        (newTrainingDuration.durationNumber / 60).toFixed(2)
      ),
      durationName: `${newTrainingDuration.durationNumber}min.`,
      durationVisible: true,
    };

    try {
      const response = await apiPrivate.post("api/durations/", newDuration);
      toast.success("Duração adicionada com sucesso.");
      setAvailableTrainingDuration(
        [...(availableTrainingDuration || []), response.data].sort(
          (a, b) => a.durationNumber - b.durationNumber
        )
      );

      setNewTrainingDuration(undefined);
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao adicionar duração.");
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await apiPrivate.put(`api/durations/visible/${id}`);
      setAvailableTrainingDuration(
        availableTrainingDuration?.map((duration) =>
          duration.durationId === id
            ? { ...duration, durationVisible: !duration.durationVisible }
            : duration
        )
      );
      toast.success("Duração atualizada com sucesso.");
    } catch (error) {
      toast.error("Erro ao atualizar duração.");
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [trainingDurations] = await Promise.all([
          apiPrivate.get("/api/durations/"),
        ]);
        if (isMounted) {
          setAvailableTrainingDuration(trainingDurations.data);
        }
      } catch (error) {
        toast.error("Erro ao buscar dados.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    console.log(availableTrainingDuration);

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Durações de Treino</CardTitle>
          <CardContent>
            <LoadingSpinner text="Carregar as durações" />
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
            <CardTitle>Durações de Treino</CardTitle>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Duração
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Duração</DialogTitle>
                <DialogDescription>
                  Defina uma nova opção de duração para treinos.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="minutes">Duração (minutos)</Label>
                  <Input
                  id="minutes"
                  type="number"
                  min="1"
                  max="480"
                  step="1"
                  value={newTrainingDuration?.durationNumber}
                  onChange={(e) =>
                    setNewTrainingDuration((prev) => ({
                    ...prev!,
                    durationNumber: Math.floor(Number(e.target.value)),
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
                <Button onClick={handleAddDuration}>Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Duração (minutos)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableTrainingDuration?.map((duration) => (
              <TableRow key={duration.durationId}>
                <TableCell className="font-medium">
                  {duration.durationName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={duration.durationVisible}
                      onCheckedChange={() =>
                        handleToggleActive(duration.durationId)
                      }
                    />
                    <span>
                      {duration.durationVisible ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
