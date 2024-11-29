import { BadgeDollarSign, CircleDollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DemoPage from "./table";

export function Sales() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-700 select-none">
            Ultimos Treinos
          </CardTitle>
          <BadgeDollarSign className="ml-auto w-4 h-4"></BadgeDollarSign>
        </div>
      </CardHeader>
      <CardContent>
        <DemoPage></DemoPage>
      </CardContent>
    </Card>
  );
}
