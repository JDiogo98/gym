"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock data for clients
const clients = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Oliveira" },
  { id: "4", name: "Ana Rodrigues" },
  { id: "5", name: "Carlos Mendes" },
  { id: "6", name: "Beatriz Ferreira" },
  { id: "7", name: "Daniel Costa" },
  { id: "8", name: "Eva Martins" },
  { id: "9", name: "Fernando Alves" },
  { id: "10", name: "Gabriela Lima" },
]

// Mock data for training types
const trainingTypes = [
  { id: "musculacao", name: "Musculação" },
  { id: "cardio", name: "Cardio" },
  { id: "funcional", name: "Funcional" },
  { id: "yoga", name: "Yoga" },
  { id: "pilates", name: "Pilates" },
  { id: "crossfit", name: "CrossFit" },
  { id: "natacao", name: "Natação" },
  { id: "corrida", name: "Corrida" },
]

// Form schema
const formSchema = z.object({
  clientId: z.string({
    required_error: "Por favor, selecione um cliente.",
  }),
  trainingType: z.string({
    required_error: "Por favor, selecione um tipo de treino.",
  }),
  duration: z.coerce
    .number({
      required_error: "Por favor, informe a duração do treino.",
      invalid_type_error: "A duração deve ser um número.",
    })
    .min(5, {
      message: "A duração deve ser de pelo menos 5 minutos.",
    })
    .max(240, {
      message: "A duração não deve exceder 240 minutos (4 horas).",
    }),
})

export default function TrainingSettingsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: 60,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would save these settings to your backend
    console.log(values)

    toast({
      title: "Configurações salvas",
      description: "As configurações de treino foram salvas com sucesso.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Configurações de Treino</CardTitle>
          <CardDescription>
            Configure as opções padrão para novos treinos. Estas configurações serão aplicadas automaticamente ao criar
            novos treinos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Cliente</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? clients.find((client) => client.id === field.value)?.name
                              : "Selecione um cliente"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar cliente..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-y-auto">
                              {clients.map((client) => (
                                <CommandItem
                                  key={client.id}
                                  value={client.name}
                                  onSelect={() => {
                                    form.setValue("clientId", client.id)
                                    setOpen(false)
                                  }}
                                >
                                  {client.name}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      client.id === field.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Selecione o cliente para o qual estas configurações serão aplicadas. Você pode buscar pelo nome.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trainingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Treino</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo de treino" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trainingTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Escolha o tipo de treino padrão para este cliente. Isso pode ser alterado para sessões
                      individuais.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração (minutos)</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input type="number" {...field} min={5} max={240} className="w-24" />
                        <span className="ml-2 text-muted-foreground">minutos</span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Defina a duração padrão para as sessões de treino. Recomendamos entre 30 e 90 minutos para a
                      maioria dos treinos.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Salvar Configurações</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

