"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneRegistrationProps {
  onSubmit: (phone_number: string) => void;
}

export default function PhoneRegistration({
  onSubmit,
}: PhoneRegistrationProps) {
  const [phone_number, setphone_number] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone_number.length === 9) {
      onSubmit(phone_number);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Número de Telefone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Introduza o seu número"
          value={phone_number}
          onChange={(e) => setphone_number(e.target.value)}
          pattern="[0-9]{9}"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Enviar Código
      </Button>
    </form>
  );
}
