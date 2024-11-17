import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EuroIcon } from "lucide-react";

interface InformationCardProps {
  title?: string;
  description?: string;
  content?: string;
  evolution?: string;
}

export function InformationCard({
  title = "",
  description = "",
  content = "",
  evolution = "",
}: InformationCardProps) {
  return (
    <div>
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-xl  text-gray-800 select-none">
              {title}
            </CardTitle>
            <EuroIcon className="ml-auto w-4 h-4"></EuroIcon>
          </div>
          <CardDescription className="select-none text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg sm:text-xl font-bold select-none">
            {content}
          </p>
        </CardContent>
        <CardFooter className="text-base sm:text-s text-gray-500 select-none">
          <p>{evolution}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
