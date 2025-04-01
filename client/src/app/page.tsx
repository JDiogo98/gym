"use client";

import { useState } from "react";

import Carousel from "@/components/RegistationPage/Carousel";
import React from "react";

import "react-international-phone/style.css";
import PinAndTrainingValidation from "@/components/RegistationPage/PinAndTrainingValidation";
import NumberValidation from "@/components/RegistTraining/numberValidation";

export default function TrainingRegistrationPage() {
  const [showPinValidation, setShowPinValidation] = useState(false);

  

  return (
    <div className="bg-background flex flex-col md:flex-row flex-1">
      <div className="hidden md:w-1/2 md:block">
        <Carousel />
      </div>
      <div className="md:w-1/2 p-4 flex flex-col justify-center items-center mb-8">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center mb-12 mt-24">
            Registo de Treino
            <br />
            <strong className="text-xl">(Cliente)</strong>
          </h1>
          {!showPinValidation ? (
            <NumberValidation
              setShowPinValidation={setShowPinValidation}
            />
          ) : (
            <PinAndTrainingValidation
              setShowPinValidation={setShowPinValidation}
            />
          )}
        </div>
      </div>
    </div>
  );
}
