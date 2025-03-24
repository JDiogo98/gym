"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { apiPublic } from "../../../lib/api";
import { toast } from "sonner";
import NumbersInput from "../RegistTraining/numbersInput";
import SuccessCard from "@/app/trainings/components/successCard";

interface TrainingType {
  trainingTypeId: number;
  trainingTypeName: string;
}

export interface TrainingDuration {
  durationId: number;
  durationName: string;
}

interface TypeAndDurationInputProps {
  setType: (typeId: string, typeName: string) => void;
  setDuration: (duration: { durationId: string; durationName: string }) => void;
  trainingType: { typeId: string; typeName: string };
  trainingDuration: { durationId: string; durationName: string };
}

const TypeAndDurationInput: React.FC<TypeAndDurationInputProps> = ({
  trainingType,
  trainingDuration,
  setType,
  setDuration,
}) => {
  const [availableTrainingTypes, setAvailableTrainingTypes] = useState<
    TrainingType[]
  >([]);
  const [availableTrainingDuration, setAvailableTrainingDuration] = useState<
    TrainingDuration[]
  >([]);

  const handleSetType = (typeId: string) => {
    if (!typeId) {
      setType("", "");
      return;
    }

    const selectedType = availableTrainingTypes.find(
      (type) => type.trainingTypeId.toString() === typeId
    );
    if (selectedType) {
      console.log("Type:", typeId, selectedType.trainingTypeName);
      setType(typeId, selectedType.trainingTypeName);
    }
  };

  const handleSetDuration = (durationId: string) => {
    if (!durationId) {
      setDuration({ durationId: "", durationName: "" });
      return;
    }

    const selectedDuration = availableTrainingDuration.find(
      (duration) => duration.durationId.toString() === durationId
    );
    if (selectedDuration) {
      console.log("Duration:", durationId, selectedDuration.durationId);
      setDuration({
        durationId: durationId,
        durationName: selectedDuration.durationName,
      });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [trainingTypesResponse, trainingDurations] = await Promise.all([
          apiPublic.get("/api/trainingTypes"),
          apiPublic.get("/api/durations"),
        ]);

        if (isMounted) {
          setAvailableTrainingTypes(trainingTypesResponse.data);
          setAvailableTrainingDuration(trainingDurations.data);
        }
      } catch (error) {
        toast.error("Ocorreu um erro ao buscar os dados.");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mt-12">
      <div>
        <Select value={trainingType?.typeId} onValueChange={handleSetType}>
          <SelectTrigger
            id="training-type-select"
            className="w-full p-4 border rounded"
          >
            <SelectValue placeholder="Tipo de treino" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>Todas os tipos</SelectItem>
            {availableTrainingTypes.map((trainingType) => (
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
      <div>
        <Select
          value={trainingDuration?.durationId}
          onValueChange={handleSetDuration}
        >
          <SelectTrigger
            id="training-type-select"
            className="w-full p-4 border rounded"
          >
            <SelectValue placeholder="Duração do treino" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>Todas as durações</SelectItem>
            {availableTrainingDuration.map((trainingDuration) => (
              <SelectItem
                key={trainingDuration.durationId}
                value={trainingDuration.durationId.toString()}
              >
                {trainingDuration.durationName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
interface PinAndTrainingValidationProps {
  setShowPinValidation: (value: boolean) => void;
}

export default function PinAndTrainingValidation({
  setShowPinValidation,
}: PinAndTrainingValidationProps) {
  const [pin, setPin] = useState(["", "", "", ""]);

  const [trainingType, setTrainingType] = useState({
    typeId: "",
    typeName: "",
  });
  const [trainingDuration, setTrainingDuration] = useState({
    durationId: "",
    durationName: "",
  });

  const [success, setSuccess] = useState(false);

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && !isNaN(Number(value))) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        document.getElementById(`pin-${index + 1}`)?.focus();
      }
    }
  };

  const handleNumberClick = (num: string) => {
    const emptyIndex = pin.findIndex((digit) => digit === "");
    if (emptyIndex !== -1) {
      handlePinChange(emptyIndex, num);
    }
  };

  const handleDelete = () => {
    const filledIndex = pin.findLastIndex((digit) => digit !== "");
    if (filledIndex !== -1) {
      handlePinChange(filledIndex, "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pinCode = pin.join("");
    if (pinCode.length === 4) {
      handlePinValidated(pinCode);
      setPin(["", "", "", ""]);
    }
  };

  const handlePinValidated = async (pin: string) => {
    try {
      await apiPublic.post("/api/sms/verifyOtp", {
        otpCode: parseInt(pin, 10),
        trainingTypeId: parseInt(trainingType.typeId),
        trainingDurationId: parseInt(trainingDuration.durationId),
      });
      setSuccess(true);
      toast.success("Treino registado com sucesso!", {
        description: "O treino foi registado na base de dados.",
      });
      setTimeout(() => {
        setShowPinValidation(false);
      }, 5000);
    } catch (error) {
      toast.error("Código inválido", {
        description: "Por favor, insira um código válido ou tente novamente.",
      });
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <SuccessCard className="p-8"></SuccessCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 py-4">
        <Label htmlFor="pin-0">Insira o código de 4 dígitos</Label>
        <div className="flex justify-evenly">
          {pin.map((digit, index) => (
            <Input
              key={index}
              id={`pin-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              className="w-12 h-12 md:w-16 md:h-16 text-center text-xl"
              readOnly
            />
          ))}
        </div>
      </div>
      <NumbersInput
        handleNumberClick={handleNumberClick}
        handleDelete={handleDelete}
        onPinValidation={true}
      />
      <div className="mt-16">
        <TypeAndDurationInput
          trainingType={trainingType}
          trainingDuration={trainingDuration}
          setType={(typeId, typeName) => setTrainingType({ typeId, typeName })}
          setDuration={setTrainingDuration}
        />
        <Button
          type="submit"
          className="w-full h-16 text-xl mt-8"
          disabled={
            pin.join("").length !== 4 ||
            !trainingType.typeName ||
            !trainingDuration.durationName
          }
          onClick={handleSubmit}
        >
          Validar
        </Button>
      </div>
    </div>
  );
}

//TODO STRING DE ERRO AO BUSCAR DADOS
