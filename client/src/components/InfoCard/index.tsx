import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EuroIcon, Icon, LucideIcon } from "lucide-react";

interface InformationCardProps {
  title?: string;
  description?: string;
  content?: string;
  evolution?: string;
  icon?: LucideIcon;
}

export function InformationCard({
  title = "",
  description = "",
  content = "",
  evolution = "",
  icon: Icon, // Renomeado para usá-lo diretamente
}: InformationCardProps) {
  return (
    <div>
      <Card className="flex-1 h-full">
        <CardHeader>
          <div className="text-base flex items-center justify-center">
            <CardTitle className="text-xl  text-gray-800 select-none">
              {title}
            </CardTitle>
            {Icon && <Icon className="ml-auto w-5 h-5" />}
          </div>
          <CardDescription className="select-none text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg sm:text-xl font-bold select-none">{content}</p>
        </CardContent>
        <CardFooter className="text-base sm:text-s text-gray-500 select-none">
          <p
            className={`${
              evolution.startsWith("-")
                ? "text-red-600"
                : evolution.startsWith("+")
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {evolution}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
