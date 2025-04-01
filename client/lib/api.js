import axios from "axios";

// Criação das instâncias do Axios
export const apiPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export const apiPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true, // Se você estiver usando cookies HTTP-only
});

// Adicionando interceptor de requisição para incluir o token no cabeçalho Authorization
apiPrivate.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token"); // Obtém o token do localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
      }
    }
    return config;
  },
  (error) => Promise.reject(error) // Rejeita caso haja erro
);

// Adicionando interceptor de resposta para redirecionar em caso de erro 401 (Token inválido)
apiPrivate.interceptors.response.use(
  (response) => response, // Retorna a resposta normalmente se for bem-sucedida
  (error) => {
    // Verificando se o erro é um erro 401 (Unauthorized) ou 403 (Forbidden)
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Verifica se o usuário não está na página de login ou na página inicial
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/" &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register" &&
        window.location.pathname !== "/forgot-password" &&
        window.location.pathname !== "/alternativeRegistration"
      ) {
        // Redireciona para a página inicial usando window.location.replace()
        window.location.replace("/"); // Isso substitui a URL na pilha de navegação e impede o loop
      }
    }
    return Promise.reject(error); // Rejeita a promessa para tratar o erro em outro lugar se necessário
  }
);

// todo colocar paginas sem redirecionamento
