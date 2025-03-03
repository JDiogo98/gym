import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import Link from "next/link";

interface NoResultsProps {
  message?: string;
  suggestion?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export default function NoResults({
  message = "Nenhum resultado encontrado",
  suggestion = "Tente ajustar os filtros ou fazer uma nova pesquisa.",
  actionLabel = "Voltar à Página Inicial",
  actionHref = "/",
  onActionClick,
}: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 mb-4 text-center">
      <SearchX className="w-8 h-8 text-muted-foreground mb-4" />
      <h2 className="text-l font-bold mb-1">{message}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{suggestion}</p>
      {onActionClick ? (
        <Button onClick={onActionClick}>{actionLabel}</Button>
      ) : (
        <Button asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
