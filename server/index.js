const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = require("./models");

const clientRouter = require("./routes/client");
const academyRouter = require("./routes/academy");
const coachRouter = require("./routes/coach");

app.use("/api/clients", clientRouter);
app.use("/api/academies", academyRouter);
app.use("/api/coaches", coachRouter);

db.sequelize
  .sync() // Apaga e recria todas as tabelas
  .then(() => {
    console.log("Banco de dados apagado e recriado com sucesso!");

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar à DB:", err);
  });
