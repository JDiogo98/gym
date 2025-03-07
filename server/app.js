const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Importar rotas
const clientRouter = require("./routes/client");
const academyRouter = require("./routes/academy");
const durationRouter = require("./routes/duration");
const coachRouter = require("./routes/coach");
const dashboardRouter = require("./routes/dashboard");
const trainingTypeRouter = require("./routes/trainingType");
const trainingRouter = require("./routes/training");
const smsRouter = require("./services/sendSmsOtp");

// Configurar rotas
app.use("/api/clients", clientRouter);
app.use("/api/academies", academyRouter);
app.use("/api/durations", durationRouter);
app.use("/api/coaches", coachRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/trainingTypes", trainingTypeRouter);
app.use("/api/training", trainingRouter);
app.use("/api/sms", smsRouter);

module.exports = app; // Exporta o app para ser usado em outros arquivos
