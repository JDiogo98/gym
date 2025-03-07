'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AlternativeRegistration() {
  const [isOpen, setIsOpen] = useState(false)
  const [trainerCode, setTrainerCode] = useState('')
  const [clientName, setClientName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você normalmente validaria o código do treinador e registraria o treino
    console.log('Registrando treino para:', clientName)
    setIsOpen(false)
    setTrainerCode('')
    setClientName('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute top-4 right-16">
          Registo Alternativo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registo Alternativo de Treino</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trainer-code">Código do Treinador</Label>
            <Input
              id="trainer-code"
              type="password"
              value={trainerCode}
              onChange={(e) => setTrainerCode(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-name">Nome do Cliente</Label>
            <Input
              id="client-name"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Registrar Treino</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

