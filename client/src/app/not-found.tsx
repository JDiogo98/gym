"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Map } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const notFoundMessages = [
    "Oops! Esta página não aguentou 3 séries de burpees e desistiu.",
    "Esta página saiu para fazer um aquecimento e ainda não voltou.",
    "404: Página não encontrada. Deve estar a recuperar o fôlego depois de um treino intenso.",
    "Parece que esta página foi levantar pesos... e acabou por se perder no caminho.",
    "Esta página foi fazer cardio e correu para fora do site!",
    "Procuraste tão bem como quando tentas encontrar motivação para treinar, mas esta página não está aqui.",
  ];

  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(
      notFoundMessages[Math.floor(Math.random() * notFoundMessages.length)]
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-4 relative overflow-hidden">
      <Card className="max-w-3xl w-full p-6 md:p-8 ">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="text-4xl font-bold">404</div>

          <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Página não encontrada
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground min-h-[4rem] flex items-center justify-center">
              {message}
            </p>

            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Link href="/">
                <Button size="lg" className="group">
                  <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Voltar ao início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
