"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";

import { pt } from "date-fns/locale";
import api from "../../../../lib/api";

import { Toaster, toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  phone_number: z
    .string()
    .trim()
    .min(9, {
      message: "O número de telefone deve ter 9 dígitos.",
    })
    .max(9, {
      message: "O número de telefone deve ter 9 dígitos.",
    }),
  birth_date: z.date({
    required_error: "A data de nascimento é obrigatória.",
  }),
  registration_date: z.date({
    required_error: "A data de inscrição é obrigatória.",
  }),
  sex: z.enum(["M", "F", "O"], {
    required_error: "Por favor, selecione um gênero.",
  }),
  academy_id: z.string().nullable().optional(),
  coach_id: z.string().nullable().optional(),
});

export default function AddClientPage() {
  const [avaliableAcademies, setAvaliableAcademies] = useState<
    { id: number; name: string }[]
  >([]);
  const [avaliableCoaches, setAvaliableCoaches] = useState<
    { id: number; name: string }[]
  >([]);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      birth_date: undefined,
      registration_date: undefined,
      sex: undefined,
      academy_id: null,
      coach_id: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // JD - Garantir que os valores de academia e treinador são números inteiros
    const formattedValues = {
      ...values,
      academy_id: values.academy_id ? parseInt(values.academy_id) : null,
      coach_id: values.coach_id ? parseInt(values.coach_id) : null,
    };

    console.log("aqui os valores", formattedValues);

    api
      .post("api/clients", formattedValues)
      .then((response) => {
        toast.success(
          `O/a ${formattedValues.name} foi adicionado/a com sucesso!`
        );

        setTimeout(() => {
          router.push("/clients");
        }, 1500); // JD - Aguardar 2 segundos antes de redirecionar
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Ocorreu um erro ao adicionar o cliente`, {
          description: error.response.data.error,
        });
      });
  }

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [academiesResponse, coachesResponse] = await Promise.all([
          api.get("/api/academies"),
          api.get("/api/coaches"),
        ]);

        if (isMounted) {
          setAvaliableAcademies(academiesResponse.data);
          setAvaliableCoaches(coachesResponse.data);
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
    <div className="container mx-auto py-6 p-4">
      <Card className="p-4">
        <h1 className="text-2xl font-bold mb-6">Adicionar Novo Cliente</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N.º Telemóvel</FormLabel>
                  <FormControl>
                    <Input placeholder="N.º Telemóvel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {/* Ensure correct format for display */}
                          {field.value ? (
                            format(new Date(field.value), "dd/MM/yyyy") // Format as dd/MM/yyyy
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : null} // Ensure that selected date is a Date object
                        onSelect={(date) => field.onChange(date)} // Handle date selection as a Date object
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registration_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Inscrição</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {/* Format for displaying registration date */}
                          {field.value ? (
                            format(new Date(field.value), "dd/MM/yyyy") // Format as dd/MM/yyyy
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : null} // Ensure that selected date is a Date object
                        onSelect={(date) => field.onChange(date)} // Handle date selection as a Date object
                        disabled={(date) => date > new Date()} // Ensure future dates are disabled
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gênero</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="M" />
                        </FormControl>
                        <FormLabel className="font-normal">Masculino</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="F" />
                        </FormControl>
                        <FormLabel className="font-normal">Feminino</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="O" />
                        </FormControl>
                        <FormLabel className="font-normal">Outro</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="academy_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academia (opcional)</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma academia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={null}>Nenhuma academia</SelectItem>
                      {avaliableAcademies &&
                        avaliableAcademies.map((academy_id) => (
                          <SelectItem
                            key={academy_id.id}
                            value={academy_id.id.toString()}
                          >
                            {academy_id.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coach_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treinador (opcional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um treinador" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={null}>Nenhum treinador</SelectItem>
                      {avaliableCoaches &&
                        avaliableCoaches.map((coach_id) => (
                          <SelectItem
                            key={coach_id.id}
                            value={coach_id.id.toString()}
                          >
                            {coach_id.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Adicionar Cliente</Button>
          </form>
        </Form>
      </Card>
      <Toaster />
    </div>
  );
}
