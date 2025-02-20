"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Carousel from "@/components/RegistationPage/Carousel";
import AlternativeRegistration from "@/components/RegistationPage/AlternativeRegistation";
import PinValidation from "@/components/RegistationPage/PinValidation";

export default function WorkoutRegistrationPage() {
  const [showPinValidation, setShowPinValidation] = useState(false);
  const [phone_number, setphone_number] = useState("");
  const { toast } = useToast();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone_number.length === 9) {
      // Aqui você normalmente validaria o número de telefone e enviaria um PIN
      // Para este exemplo, vamos apenas mostrar a validação do PIN
      setShowPinValidation(true);
    } else {
      toast({
        title: "Número inválido",
        description:
          "Por favor, insira um número de telefone válido com 9 dígitos.",
        variant: "destructive",
      });
    }
  };

  const handlePinValidated = () => {
    // Aqui você normalmente registraria o treino
    toast({
      title: "Treino registrado com sucesso!",
      description: "Seu treino foi registrado na base de dados.",
    });
    setShowPinValidation(false);
    setphone_number("");
  };

  return (
    <div className="bg-background flex flex-col md:flex-row flex-1">
      <div className="md:w-1/2">
        <Carousel />
      </div>
      <div className="md:w-1/2 p-4 flex flex-col justify-center items-center">
        <AlternativeRegistration />
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-xl font-bold text-center">Registro de Treino</h1>
          {!showPinValidation ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Digite seu número de telefone:
                </label>
                <Input
                  id="phone"
                  type="number"
                  value={phone_number}
                  onChange={(e) => setphone_number(e.target.value)}
                  placeholder="Número de telefone"
                  className="w-full"
                  min="100000000"
                  max="999999999"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submeter
              </Button>
            </form>
          ) : (
            <PinValidation onValidated={handlePinValidated} />
          )}
        </div>
      </div>
    </div>
  );
}
