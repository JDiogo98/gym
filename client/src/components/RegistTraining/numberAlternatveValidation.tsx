import { useState } from "react";
import { toast } from "sonner";
import { apiPublic } from "../../../lib/api";
import NumbersInput from "./numbersInput";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { PhoneInput } from "../phone-input";

interface NumbersValidationProps {
  setShowPinValidation: (value: boolean) => void;
  alternativeValidation?: boolean;
}

const NumberValidation: React.FC<NumbersValidationProps> = ({
  setShowPinValidation,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("+351");
  const [loading, setLoading] = useState(false);

  const handleNumberClick = (num: string) => {
    if (num === "+" && phoneNumber.includes("+")) {
      return;
    }

    if (phoneNumber.length < 13) {
      setPhoneNumber((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    if (phoneNumber) {
      setPhoneNumber((prev) => prev.slice(0, -1));
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error("Número inválido", {
        description:
          "Por favor, insira um número de telefone válido com 9 dígitos.",
      });
      setLoading(false);
      return;
    }

    try {
      if (phoneNumber.length === 13) {
        await apiPublic.post(`/api/sms/sendTrainingOtpCoach`, {
          phoneNumber: phoneNumber,
        });
        setShowPinValidation(true);
      } else {
        toast.error("Número não encontrado", {
          description:
            "O número inserido não foi encontrado na nossa base de dados.",
        });
      }
    } catch (error: any) {
      toast.error("Erro ao submeter o número", {
        description:
          error.response?.data?.message ||
          "Ocorreu um erro ao tentar submeter o número. Por favor, verifique o número e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="phone" className="text-l">
        Insira o seu número de telemóvel (Treinador):
      </label>
      <div className="my-6 w-full">
        <PhoneInput
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
          placeholder="Número de telemóvel"
          defaultCountry="PT"
          readOnly
        />
      </div>
      <NumbersInput
        handleNumberClick={handleNumberClick}
        handleDelete={handleDelete}
        onPinValidation={false}
      />
      <div className="mt-8">
        <Button
          onClick={handlePhoneSubmit}
          type="submit"
          variant="default"
          className="w-full h-16 text-xl"
        >
          {loading && <Loader2 className="animate-spin" />}
          Submeter
        </Button>
      </div>
    </div>
  );
};

export default NumberValidation;
