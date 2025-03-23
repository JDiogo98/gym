"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

// Mock user profile data
const initialProfile = {
  name: "João Silva",
  email: "joao.silva@example.com",
  phone: "(11) 98765-4321",
  bio: "Personal trainer especializado em musculação e treinos funcionais.",
  avatar: "/placeholder.svg?height=100&width=100",
}

export default function ProfileSettings() {
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleSave = () => {
    // Here you would typically save the profile data to your backend
    toast({
      title: "Perfil atualizado",
      description: "Suas informações de perfil foram atualizadas com sucesso.",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setProfile(initialProfile)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Seu Perfil</CardTitle>
            <CardDescription>Gerencie suas informações pessoais.</CardDescription>
          </div>
          {!isEditing && <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" size="sm">
                Alterar Foto
              </Button>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                {isEditing ? (
                  <Input id="name" name="name" value={profile.name} onChange={handleChange} />
                ) : (
                  <div className="p-2 border rounded-md bg-muted/50">{profile.name}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                {isEditing ? (
                  <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} />
                ) : (
                  <div className="p-2 border rounded-md bg-muted/50">{profile.email}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                {isEditing ? (
                  <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} />
                ) : (
                  <div className="p-2 border rounded-md bg-muted/50">{profile.phone}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Biografia</Label>
                {isEditing ? (
                  <Textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} rows={4} />
                ) : (
                  <div className="p-2 border rounded-md bg-muted/50 min-h-[100px]">{profile.bio}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </CardFooter>
      )}
    </Card>
  )
}

