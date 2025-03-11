import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import Link from "next/link";

interface UserNotFoundProps {
  onRetry?: () => void;
}

export default function UserNotFound({ onRetry }: UserNotFoundProps) {
  return (
    <div className="">
      <div className="card-header"></div>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
        <UserX className="w-6 h-6 text-red-600" />
      </div>
      <h2 className="text-center">Utilizador não encontrado</h2>
      <p className="text-center">
        Não foi possível encontrar o utilizador na base de dados.
      </p>
      <div className="card-content">
        <p className="text-center text-muted-foreground">
          O utilizador que procura pode ter sido removido ou pode não existir.
          Verifique se introduziu as informações corretamente e tente novamente.
        </p>
      </div>
      <div className="card-footer flex justify-center mt-8 space-x-4">
        <Button variant="outline" onClick={onRetry}>
          Tentar Novamente
        </Button>
        <Button asChild>
          <Link href="/">Voltar à Página Inicial</Link>
        </Button>
      </div>
    </div>
  );
}
