"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import dayjs from "dayjs";
import api from "../../../lib/api";
import { toast } from "sonner";

export interface FiltersInterface {
  startDate?: Date | null | undefined;
  endDate?: Date | null | undefined;
  coachId?: number | null;
  trainingTypeId?: number | null;
  academyId?: number | null;
  clientId?: number | null | undefined;
}

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
}

export default function Filters({ setFilters }: FiltersProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // JD - Declaração das academias e treinadores disponíveis
  const [avaliableAcademies, setAvaliableAcademies] = useState<
    { academyId: number; academyName: string }[]
  >([]);
  const [avaliableCoaches, setAvaliableCoaches] = useState<
    { coachId: number; coachName: string }[]
  >([]);
  const [avaliableTrainingTypes, setAvaliableTrainingTypes] = useState<
    { trainingTypeId: number; trainingTypeName: string }[]
  >([]);

  // JD - Use Effect para buscar os dados das academias, treinadores e tipos de treino
  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [academiesResponse, coachesResponse, trainingTypesResponse] =
          await Promise.all([
            api.get("/api/academies"),
            api.get("/api/coaches"),
            api.get("/api/trainingTypes"),
          ]);

        if (isMounted) {
          setAvaliableAcademies(academiesResponse.data);
          setAvaliableCoaches(coachesResponse.data);
          setAvaliableTrainingTypes(trainingTypesResponse.data);
        }
      } catch (error) {
        toast.error("Ocorreu um erro ao buscar os dados.");
      }
    };

    const defaultStartDate = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    const defaultEndDate = new Date();

    setDateRange({ from: defaultStartDate, to: defaultEndDate });

    setFilters((prev: FiltersInterface) => ({
      ...prev,
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    }));

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="grid gap-4 mb-6 sm:grid-cols-1 md:grid-cols-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {dayjs(dateRange.from).format("MMM DD, YYYY")} -{" "}
                  {dayjs(dateRange.to).format("MMM DD, YYYY")}
                </>
              ) : (
                dayjs(dateRange.from).format("MMM DD, YYYY")
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
            selected={{
              from: dateRange.from,
              to: dateRange.to,
            }}
            onSelect={(dateRange) => {
              if (dateRange) {
                setDateRange({
                  from: dateRange.from,
                  to: dateRange.to,
                });
              }
              if (dateRange?.from && dateRange?.to) {
                setFilters((prev: FiltersInterface) => ({
                  ...prev,
                  startDate: dateRange.from || prev.startDate,
                  endDate: dateRange.to || prev.endDate,
                }));
              }
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <Select
        onValueChange={(value: string | null) =>
          setFilters((prev: any) => ({
            ...prev,
            coachId: value ? parseInt(value) : null,
          }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Treinador" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null}>Todos os treinadores</SelectItem>
          {avaliableCoaches &&
            avaliableCoaches.map((coach) => (
              <SelectItem key={coach.coachId} value={coach.coachId.toString()}>
                {coach.coachName}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) =>
          setFilters((prev: any) => ({
            ...prev,
            trainingTypeId: value ? parseInt(value) : null,
          }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tipo de treino" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null}>Todas os tipos</SelectItem>
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

      <Select
        onValueChange={(value) =>
          setFilters((prev: FiltersInterface) => ({
            ...prev,
            academyId: value ? Number(value) || null : null,
          }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Academia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null}>Todas as academias</SelectItem>
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
  );
}
