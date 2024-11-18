"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Testes() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fazendo a requisição GET com Axios
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erro:", error));
  }, []);


  
  return (
    <div>
      <h1>Resposta do Servidor:</h1>
      {data ? <p>{data.message}</p> : <p>Carregando...</p>}
    </div>
  );
}
