import {
  CalendarClockIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import LastTrains from "./table";


export function LastTrainigs() {
  
  const title = "Últimos Treinos";
  
  
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-700 select-none">
            {title}
          </CardTitle>
          <CalendarClockIcon className="ml-auto w-5 h-5"></CalendarClockIcon>
        </div>
      </CardHeader>
      <LastTrains></LastTrains>
    </Card>
  );
}
