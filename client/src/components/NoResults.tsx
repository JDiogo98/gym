import { SearchX } from "lucide-react";

interface NoResultsProps {
  message?: string;
  suggestion?: string;
}

export default function NoResults({
  message = "Nenhum resultado encontrado",
  suggestion = "Tente ajustar os filtros ou fazer uma nova pesquisa.",
}: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 mb-4 text-center">
      <SearchX className="w-6 h-6 text-muted-foreground mb-4" />
      <h2 className="text-base font-bold mb-1">{message}</h2>
      <p className="text-muted-foreground mb-6">{suggestion}</p>
    </div>
  );
}
