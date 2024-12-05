import { clientsData } from "@/app/clients/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PlusIcon } from "lucide-react";

const academys = ["Coimbra", "Porto", "Braga"];
const Trainers = ["Rafael Oliveira", "Carlos Nogueira", "Mariana Alves"];

export function AddClient() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <PlusIcon></PlusIcon>
          Adicionar
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar cliente</SheetTitle>
          <SheetDescription>
            Adicione um novo perfil de cliente aqui. Clique em salvar quando
            terminar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client" className="text-right">
              Nome
            </Label>
            <Input id="name" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coach" className="text-right">
              Treinador
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Trainers.map((coach) => (
                  <SelectItem value={coach}>{coach}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="academy" className="text-right">
              Academia
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {academys.map((academy) => (
                  <SelectItem value={academy}>{academy}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="select-none" type="submit">
              Salvar
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button className="select-none" variant="outline" type="button">
              Cancelar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
