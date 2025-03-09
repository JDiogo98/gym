import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useReward } from "react-rewards";

interface SuccessCardProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function SuccessCard({
  title = "Treino Registado com Sucesso",
  message = "O treino foi registado na base de dados.",
  className,
}: SuccessCardProps) {
  const { reward: confettiReward, isAnimating: isConfettiAnimating } =
    useReward("confettiReward", "confetti", { lifetime: 400 });

  useEffect(() => {
    confettiReward();
  }, []);

  return (
    <Card className={`bg-green-50 border-green-200 ${className}`}>
      <CardHeader className="flex flex-col items-center gap-2 pb-2">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
        <CardTitle className="text-green-800 text-2xl text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div id="confettiReward"></div>
        <p className="text-green-700 text-xl my-4 text-center">{message}</p>
      </CardContent>
    </Card>
  );
}
