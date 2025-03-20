import { useAuth } from "@/Auth";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

interface AuthButtonProps {
  isAuthenticated?: boolean | undefined; // Torna a prop opcional
}

export default function AuthButton({}: AuthButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  // Verifica se o usuário está autenticado ao carregar o componente

  const { isAuth } = useAuth();

  const handleAuthAction = () => {
    setIsProcessing(true);

    if (isAuth) {
      // Se estiver autenticado, faz logout
      Cookies.remove("token");
      window.location.href = "/"; // Redireciona para a página inicial
    } else {
      // Se não estiver autenticado, vai para a página de login
      window.location.href = "/login";
    }

    setIsProcessing(false);
  };

  return (
    <Button
      variant="outline"
      className="inline-flex items-center space-x-2"
      onClick={handleAuthAction}
      disabled={isProcessing}
    >
      {isAuth ? (
        <>
          <LogOutIcon className="h-4 w-4" />
          <span className="hidden md:flex">{"Sair"}</span>
        </>
      ) : (
        <>
          <LogInIcon className="h-4 w-4" />
          <span className="hidden md:flex">{"Entrar"}</span>
        </>
      )}
    </Button>
  );
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function LogOutIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function LogInIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
