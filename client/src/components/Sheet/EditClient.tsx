import { buttonClasses } from "@/app/clients/page";
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
import { ClipboardEditIcon } from "lucide-react";

interface SheetEditProps {
  clientData: clientsData;
}

const academys = ["Coimbra", "Porto", "Braga"];
const Trainers = ["Rafael Oliveira", "Carlos Nogueira", "Mariana Alves"];

export function EditClient({ clientData }: SheetEditProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className={`bg-gray-500 text-white hover:bg-gray-700 transition-all duration-300 rounded-md ${buttonClasses}`}
        >
          <ClipboardEditIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar cliente</SheetTitle>
          <SheetDescription>
            Faça alterações no perfil do cliente aqui. Clique em salvar quando
            terminar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client" className="text-right">
              Nome
            </Label>
            <Input id="name" value={clientData.name} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coach" className="text-right">
              Treinador
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={clientData.coach} />
              </SelectTrigger>
              <SelectContent>
                {Trainers.map((coach) => (
                  <SelectItem key={coach} value={coach}>
                    {coach}
                  </SelectItem>
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
                <SelectValue placeholder={clientData.academy} />
              </SelectTrigger>
              <SelectContent>
                {academys.map((academy) => (
                  <SelectItem key={academy} value={academy}>
                    {academy}
                  </SelectItem>
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
