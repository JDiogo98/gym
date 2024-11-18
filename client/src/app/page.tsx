"use client";

import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  // Fazendo a requisição GET para a API do servidor Express
  useEffect(() => {
    // A URL relativa será automaticamente resolvida para http://localhost:5000/api/message
    fetch("/api/message")
      .then((response) => response.json()) // Converte a resposta para JSON
      .then((data) => setMessage(data.message)) // Atualiza o estado com a mensagem
      .catch((error) => console.error("Erro:", error));
  }, []);

  return (
    <div>
      <h1>Mensagem do Servidor:</h1>
      {message ? <p>{message}</p> : <p>Carregando...</p>}
    </div>
  );
}

export default App;
