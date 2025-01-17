'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhoneRegistrationProps {
  onSubmit: (phoneNumber: string) => void
}

export default function PhoneRegistration({ onSubmit }: PhoneRegistrationProps) {
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length === 9) {
      onSubmit(phoneNumber)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Número de Telefone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Introduza o seu número"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          pattern="[0-9]{9}"
          required
        />
      </div>
      <Button type="submit" className="w-full">Enviar Código</Button>
    </form>
  )
}

