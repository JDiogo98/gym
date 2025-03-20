const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

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

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;

  console.log(token);
  if (!token) {
    return res
      .status(403)
      .json({ auth: false, message: "Token não informado." });
  } else {
    jwt.verify(token, "process.env.JWT_SECRET_KEY", (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ auth: false, message: "Token inválido." });
      } else {
        req.userId = decoded.userId; // Defina o ID do usuário ou outros dados no req
        req.userName = decoded.userName; // Caso você tenha o nome no JWT, adicione ele também
        next();
      }
    });
  }
};

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

module.exports = app; // Exporta o app para ser usado em outros arquivos
