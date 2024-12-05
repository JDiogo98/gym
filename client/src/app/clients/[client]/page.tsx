"use client";

import { useEffect, useState } from "react";
import { data } from "../page";
import { useRouter } from "next/navigation"; // Hook para navegação
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ClientDasboard from "@/components/ClientDashboard";

export default function ClientPage({ params }: { params: { client: string } }) {
  const [client, setClient] = useState<any>(null); // Dados do client selecionado
  const [loading, setLoading] = useState(true); // Controlar o carregamento
  const [error, setError] = useState<string | null>(null); // Mensagens de erro

  const router = useRouter(); // Inicializa o hook para navegação

  // Fetch dos dados
  useEffect(() => {
    const fetchClientData = () => {
      try {
        const foundClient = data.find((c) => c.id === params.client); // Busca o cliente pelo ID

        if (foundClient) {
          setClient(foundClient);
        } else {
          setError("Cliente não encontrado");
        }
      } catch (err) {
        setError("Erro ao carregar os dados do cliente");
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };

    fetchClientData();
  }, [params.client]);

  // Enquanto estiver carregando
  if (loading) {
    return <h1>Carregando...</h1>;
  }

  // Função para retroceder à página anterior
  const handleGoBack = () => {
    router.back(); // Volta para a página anterior
  };

  // Se houver um erro
  if (error) {
    return (
      <div>
        <h1>{error}</h1>
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>
    );
  }

  // Se o cliente for encontrado, renderiza as informações
  return (
    
    <div className="h-screen">
      <section className="grid grid-cols-1 px-4">
        <Card className="flex-1 h-full">
          <CardHeader>
            <CardDescription className="select-none text-base">
            <div className="text-base flex items-center justify-start">
              <CardTitle className="text-xl text-gray-800 select-none">
                {client.client}
              </CardTitle>
            </div>
              Academia: {client.academy}
            <p className="text-base sm:text-lg select-none">Treinador: {client.coach}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg sm:text-xl font-bold select-none">
              Último Treino: {client.lastTraining}
            </p>
            <p className="text-base sm:text-lg select-none">
              Data de Registo: {client.registrationDate}
            </p>
          </CardContent>
          <CardFooter className="text-base sm:text-sm text-gray-500 select-none">
          </CardFooter>
        </Card>
      </section>
      <ClientDasboard></ClientDasboard>
    </div>
  );
}
