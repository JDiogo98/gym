const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Importar rotas
const clientRouter = require("./routes/client");
const academyRouter = require("./routes/academy");
const coachRouter = require("./routes/coach");
const dashboardRouter = require("./routes/dashboard");

// Configurar rotas
app.use("/api/clients", clientRouter);
app.use("/api/academies", academyRouter);
app.use("/api/coaches", coachRouter);
app.use("/api/dashboard", dashboardRouter);

module.exports = app; // Exporta o app para ser usado em outros arquivos
