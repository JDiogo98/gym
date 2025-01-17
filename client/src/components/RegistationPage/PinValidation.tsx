'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PinValidationProps {
  onValidated: () => void
}

export default function PinValidation({ onValidated }: PinValidationProps) {
  const [pin, setPin] = useState(['', '', '', ''])

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && !isNaN(Number(value))) {
      const newPin = [...pin]
      newPin[index] = value
      setPin(newPin)

      if (value && index < 3) {
        document.getElementById(`pin-${index + 1}`)?.focus()
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin.join('').length === 4) {
      // Aqui você normalmente validaria o PIN com o backend
      console.log('Validando PIN:', pin.join(''))
      onValidated()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pin-0">Código de 4 dígitos</Label>
        <div className="flex justify-between">
          {pin.map((digit, index) => (
            <Input
              key={index}
              id={`pin-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              className="w-12 h-12 text-center text-2xl"
            />
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full">Validar</Button>
    </form>
  )
}

