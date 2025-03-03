"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Carousel from "@/components/RegistationPage/Carousel";
import AlternativeRegistration from "@/components/RegistationPage/AlternativeRegistation";
import PinValidation from "@/components/RegistationPage/PinValidation";
import React from "react";

export default function WorkoutRegistrationPage() {
  const [showPinValidation, setShowPinValidation] = useState(false);
  const [phone_number, setphone_number] = useState("9");
  const { toast } = useToast();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone_number.length === 9) {
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
    toast({
      title: "Treino registrado com sucesso!",
      description: "Seu treino foi registrado na base de dados.",
    });
    setShowPinValidation(false);
    setphone_number("9");
  };

  const handleNumberClick = (num: string) => {
    if (phone_number.length < 9) {
      setphone_number((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    if (phone_number.length > 1) {
      setphone_number((prev) => prev.slice(0, -1));
    }
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
                  type="text"
                  value={phone_number}
                  readOnly
                  className="w-full"
                />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <div
                      key={num}
                      onClick={() => handleNumberClick(num.toString())}
                      className="w-full h-16 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-lg font-semibold rounded-md shadow-md cursor-pointer"
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <Button onClick={handleDelete} className="col-span-3">
                  Apagar
                </Button>
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
