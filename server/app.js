const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();

//TODO COLOCAR O URL NO ENV

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// todo colocar o segredo no env

app.get("/", verifyJWT, (req, res) => {
  return res.json({ auth: true, name: req.userName, id: req.userId });
});

// Importar rotas
const clientRouter = require("./routes/client");
const academyRouter = require("./routes/academy");
const durationRouter = require("./routes/duration");
const coachRouter = require("./routes/coach");
const dashboardRouter = require("./routes/dashboard");
const trainingTypeRouter = require("./routes/trainingType");
const trainingRouter = require("./routes/training");
const smsRouter = require("./services/sendSmsOtp");
const authRouter = require("./routes/auth");

// Configurar rotas
app.use("/api/clients", clientRouter);
app.use("/api/academies", academyRouter);
app.use("/api/durations", durationRouter);
app.use("/api/coaches", coachRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/trainingTypes", trainingTypeRouter);
app.use("/api/training", trainingRouter);
app.use("/api/sms", smsRouter);
app.use("/api/auth", authRouter);

module.exports = app;
module.exports.verifyJWT = verifyJWT; // Exporta o app para ser usado em outros arquivos
