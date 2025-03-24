"use client";

import { useEffect, useState } from "react";
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
import { apiPrivate, apiPublic } from "../../../lib/api";
import Carousel from "@/components/RegistationPage/Carousel";
import { toast } from "sonner";
import { LOGIN } from "@/locales/strings";
import { set } from "date-fns";

const formSchema = z.object({
  email: z.string().email({
    message: LOGIN.VALIDATION.EMAIL_INVALID,
  }),
  password: z.string().min(6, {
    message: LOGIN.VALIDATION.PASSWORD_MIN,
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await apiPublic
        .post("api/auth/login", values, {
          withCredentials: true,
        })
        .then(() => {
          toast.success(LOGIN.VALIDATION.LOGIN_SUCCESS);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        });
    } catch (error) {
      toast.error(LOGIN.VALIDATION.LOGIN_ERROR);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const verifyJWT = async () => {
      try {
        const response = await apiPublic.get("/", {
          withCredentials: true,
        });
        if (response.data.auth) {
          router.push("/");
        }
      } catch (error) {
        return;
      }
    };
    verifyJWT();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-background ">
      <div className="hidden md:w-1/2 md:block">
        <Carousel />
      </div>
      <div className="md:w-1/2 p-4 flex flex-col justify-center items-center mb-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {LOGIN.TITLE}
            </CardTitle>
            <CardDescription className="text-center">
              {LOGIN.DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{LOGIN.EMAIL.LABEL}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={LOGIN.EMAIL.PLACEHOLDER}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{LOGIN.PASSWORD.LABEL}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={LOGIN.PASSWORD.PLACEHOLDER}
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    LOGIN.BUTTONS.LOGIN
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              <Link
                href="/forgot-password"
                className="hover:text-primary underline underline-offset-4"
              >
                {LOGIN.LINKS.FORGOT_PASSWORD}
              </Link>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              {LOGIN.LINKS.DONT_HAVE_ACCOUNT}{" "}
              <Link
                href="/register"
                className="hover:text-primary underline underline-offset-4"
              >
                {LOGIN.LINKS.REGISTER}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

//TODO FAZER O FORGOT PASSWORD
