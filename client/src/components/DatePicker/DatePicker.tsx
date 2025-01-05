import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // Certifique-se de que a função cn esteja configurada
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

interface DateInputProps {
  cliente: { dataInscricao: Date | null };
  handleChange: (event: { target: { name: string; value: Date | null } }) => void;
  editando: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ cliente, handleChange, editando }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(cliente.dataInscricao);

  const handleDateChange = (date: Date | undefined) => {
    const newDate = date || null;
    setSelectedDate(newDate);
    handleChange({ target: { name: "dataInscricao", value: newDate } });
  };

  return (
    <div>
      <Label htmlFor="dataInscricao">Data de Inscrição</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
            disabled={!editando}
          >
            {selectedDate ? (
              selectedDate.toLocaleDateString("pt-PT")
            ) : (
              <span>Selecione uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <DatePicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            disabled={!editando}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateInput;
