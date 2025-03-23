"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "../../../lib/api";
import { REGISTER } from "@/locales/strings";
import { toast } from "sonner";
import { PhoneInput } from "@/components/phone-input";

//TODO- A MESMA VALIDAÇÃO DE PASSWORD NO SERVIDOR
//TODO- Colocar input do telemóve e respetiva validação no formSchema aqui e em todos os locais que o input phone é utilizado
// TODO - Tratamento de erros do backend

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: REGISTER.VALIDATION.NAME_MIN,
    }),
    email: z.string().email({
      message: REGISTER.VALIDATION.EMAIL_INVALID,
    }),
    password: z
      .string()
      .min(6, {
        message: REGISTER.VALIDATION.PASSWORD_MIN,
      })
      .regex(/[A-Z]/, {
        message: REGISTER.VALIDATION.PASSWORD_UPPERCASE,
      })
      .regex(/[a-z]/, {
        message: REGISTER.VALIDATION.PASSWORD_LOWERCASE,
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: REGISTER.VALIDATION.PASSWORD_SYMBOL,
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: REGISTER.VALIDATION.PASSWORD_MISMATCH,
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {    
    setIsLoading(true);
    try {
      await api.post("api/auth/register", values).then(() => {
        toast.success(REGISTER.VALIDATION.REGISTER_SUCCESS, {
          description: REGISTER.VALIDATION.REGISTER_SUCCESS_DESCRIPTION,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      });
    } catch (error) {
      toast.error(REGISTER.VALIDATION.REGISTER_ERROR, {
        description: REGISTER.VALIDATION.REGISTER_ERROR_DESCRIPTION,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {REGISTER.TITLE}
          </CardTitle>
          <CardDescription className="text-center">
            {REGISTER.DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{REGISTER.NAME.LABEL}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={REGISTER.NAME.PLACEHOLDER}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{REGISTER.EMAIL.LABEL}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={REGISTER.EMAIL.PLACEHOLDER}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>{REGISTER.PHONE_NUMBER.LABEL}</FormLabel>
              </div>
              <PhoneInput
                name="clientPhoneNumber"
                value={phone}
                onChange={(value) => {
                  setPhone(value);
                }
              }
                placeholder={REGISTER.PHONE_NUMBER.PLACEHOLDER}
                defaultCountry="PT"
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{REGISTER.PASSWORD.LABEL}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="******"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{REGISTER.CONFIRM_PASSWORD.LABEL}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="******"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  REGISTER.BUTTONS.REGISTER
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full text-muted-foreground">
            {REGISTER.LINKS.ALREADY_HAVE_ACCOUNT}{" "}
            <Link
              href="/login"
              className="hover:text-primary underline underline-offset-4"
            >
              {REGISTER.LINKS.LOGIN}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
