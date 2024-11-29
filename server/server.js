// server/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Usando o CORS para permitir requisições do React (que estará rodando em outra porta)
app.use(cors());

const http = "localhost:5000";

// Definindo uma rota GET simples
app.get("/api/message", (req, res) => {
  res.json({ message: "Olá, do servidor Express!" });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
