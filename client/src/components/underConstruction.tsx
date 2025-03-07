"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HardHat, Hammer, ArrowLeft, Wrench } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UnderConstruction() {
  const [bounce, setBounce] = useState(false);
  const [quote, setQuote] = useState("");

  const funnyQuotes = [
    "Depois do trabalho, o café tornou-se o meu melhor amigo... e aliado!",
    "A construir algo incrível, mesmo que o relógio nunca pare de me lembrar do tempo curto.",
    "Desculpa, os pixéis ainda estão a ser arranjados entre uma pausa e outra.",
    "Esta página está tão indisponível como a minha energia depois de um longo dia de trabalho.",
    "Trabalho nisto no meu tempo livre... e às vezes tenho tempo para ir correr também.",
    "Página em construção. Volta quando o fim-de-semana me permitir mais uma  a desenvolver.",
    "Oops! Encontraste a parte do site onde ainda estou a arranjar tempo para desenvolver.",
  ];

  useEffect(() => {
    // Seleciona uma citação aleatória quando o componente é montado
    setQuote(funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)]);

    // Configura um intervalo para alternar o estado de bounce a cada 3 segundos
    const interval = setInterval(() => {
      setBounce((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full p-6 md:p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative"></div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Página em Construção
            </h1>

            <div className="relative">
              <motion.div
                className="absolute -left-8 -top-6 text-yellow-500 opacity-80"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              ></motion.div>

              <motion.div
                className="absolute -right-8 -bottom-6 text-yellow-500 opacity-80"
                animate={{
                  rotate: -360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              ></motion.div>

              <p className="text-lg md:text-xl text-muted-foreground relative min-h-[4rem] flex items-center justify-center">
                {quote}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Link href="/">
                <Button size="lg" className="group">
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Voltar ao início
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-6 text-muted-foreground">
            <HardHat className="h-5 w-5" />
            <p className="text-sm">
              A trabalhar arduamente para tentar disponibilizar esta página o
              mais rápido possível!
            </p>
            <Wrench className="h-5 w-5" />
          </div>

          <div className="w-full pt-4">
            <div className="w-full bg-muted rounded-full h-2.5">
              <motion.div
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: "15%" }}
                animate={{ width: ["15%", "65%", "45%", "85%", "35%"] }}
                transition={{
                  duration: 8,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Progresso</span>
              <span>Quase lá...</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
