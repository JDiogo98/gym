import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import { toast } from "sonner";

// Interface para o contexto
interface AuthContextType {
  isAuth: boolean;
  name: string | null;
  login: (name: string) => void;
  logout: () => void;
}

// Criar contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return context;
};

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const verifyJWT = async () => {
      try {
        const response = await api.get("/", { withCredentials: true });

        if (response.data.auth) {
          setIsAuth(true);
          setName(response.data.name);
        } else {
          setIsAuth(false);
          toast.error("Token inválido. Faça login novamente.");
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    verifyJWT();
  }, []);

  // Função de login (exemplo)
  const login = (userName: string) => {
    setIsAuth(true);
    setName(userName);
  };

  // Função de logout
  const logout = () => {
    setIsAuth(false);
    setName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
