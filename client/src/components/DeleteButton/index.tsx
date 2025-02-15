import { buttonClasses } from "@/app/clients/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import api from "../../../lib/api";

interface DeleteButtonProps {
  id: string;
  name: string;
  showText?: boolean;
  handleDelete: (id: string) => void;
}

export function DeleteButton({
  id,
  name,
  showText = false,
  handleDelete,
}: DeleteButtonProps) {
  async function deleteClient(id: string, name: string) {
    try {
      const response = await api.delete(`api/clients/${id}`);
      if (response.status === 200) {
        toast.info(`O/a ${name} foi removido/a com sucesso!`);
        handleDelete(id);
      } else {
        toast.error("Ocorreu um erro ao tentar remover o cliente.");
      }
    } catch (error) {
      console.error("Failed to delete client:", error);
      toast.error("Ocorreu um erro ao tentar remover o cliente.");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={buttonClasses}>
          <Trash2Icon />
          {showText && <span>Eliminar</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem a certeza que pretende eliminar {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o
            registro do cliente {name} e removerá os dados dos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteClient(id, name);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
