const express = require("express");
const https = require("follow-redirects").https;
const { Client, OTP, Training } = require("../models");
const crypto = require("crypto");
const e = require("express");
require("dotenv").config();
const { Op } = require("sequelize");

const app = express();

// Middleware para parsear o corpo da requisição como JSON
app.use(express.json());

// JD - Função para gerar o OTP
const generateOtpForClassRegistration = async (clientId) => {
  const otpCode = crypto.randomInt(1000, 9999).toString();

  // JD - O código OTP expira em 5 minutos
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 5);

  try {
    // JD -  Salva o OTP na base de dados
    await OTP.create({
      otpCode,
      expirationDate,
      clientId,
      actionType: "class-registration", // JD - Tipo de ação
    });

    return otpCode; // JD - Retorna o OTP gerado
  } catch (error) {
    console.error("Erro ao gerar OTP:", error);
    throw new Error("Erro ao gerar OTP.");
  }
};

// Função para enviar o OTP via SMS
const sendOtpForClassRegistration = async (phoneNumber, otpCode) => {
  // Corpo do request para a API da Infobip
  const postData = JSON.stringify({
    messages: [
      {
        destinations: [{ to: phoneNumber }],
        from: "351927946211", // Substitua com o número de envio correto
        text: `Apresente o seguinte código para registar a aula: ${otpCode}`, // Mensagem com o OTP
      },
    ],
  });

  const options = {
    method: "POST",
    hostname: "wgkqry.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization:
        "App 90ca36c7cb4ddc4441df0ec52166c3f1-6377c6ee-9099-4fcc-8b1e-df5e1d874ad8",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
  };

  const request = https.request(options, (response) => {
    let chunks = [];

    response.on("data", (chunk) => {
      chunks.push(chunk);
    });

    response.on("end", () => {
      const body = Buffer.concat(chunks);
      const parsedResponse = JSON.parse(body.toString());
      console.log(parsedResponse); // Log da resposta da Infobip
    });

    response.on("error", (error) => {
      console.error("Erro ao enviar SMS:", error);
      throw new Error("Erro ao enviar SMS.");
    });
  });

  request.write(postData); // Escreve os dados na requisição
  request.end(); // Finaliza a requisição
};

// Rota para enviar SMS com OTP para registo de aula
app.post("/sendTrainingOtp", async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Número de telefone é obrigatório." });
  }

  // JD - Verificar se é um contacto registado
  const existingClient = await Client.findOne({
    where: { clientPhoneNumber: phoneNumber },
  });

  if (!existingClient) {
    return res.status(400).json({ error: "Número de telefone não é válido." });
  }

  try {
    // Gerar o OTP para o registo de aula
    const otpCode = await generateOtpForClassRegistration(
      existingClient.clientId
    );

    // Enviar o OTP via SMS para o número do cliente
    await sendOtpForClassRegistration(phoneNumber, otpCode);

    // Resposta de sucesso
    res.status(200).json({ message: "OTP enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao enviar OTP para registo de aula." });
  }
});

app.post("/verifyOtp", async (req, res) => {
  const { otpCode, trainingTypeId, trainingDurationId } = req.body;

  console.log(otpCode, trainingTypeId, trainingDurationId);

  if (!otpCode) {
    return res.status(400).json({ error: "O Código  é obrigatório." });
  }

  try {
    const existingOtp = await OTP.findOne({
      where: {
        otpCode,
        status: "pending",
        expirationDate: {
          [Op.gt]: new Date(),
        },
      },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["clientId", "clientPhoneNumber"],
        },
      ],
    });

    if (!existingOtp) {
      return res
        .status(400)
        .json({ error: "Código OTP inválido ou expirado." });
    }

    // Atualiza o status do OTP para usado
    await existingOtp.update({ status: "used" });

    const clientData = await Client.findOne({
      where: { clientId: existingOtp.client.clientId },
      attributes: ["clientId", "clientName", "academyId", "coachId"],
    });

    if (!existingOtp.client || !clientData) {
      return res.status(400).json({ error: "Cliente não encontrado." });
    }

    const newTraining = await Training.create({
      clientId: clientData.clientId,
      trainingDate: new Date(),
      trainingDurationId: trainingDurationId,
      academyId: clientData.academyId,
      coachId: clientData.coachId,
      trainingTypeId: trainingTypeId,
    });

    res.status(200).json({
      message: `Treino Registado com sucesso no/a cliente ${clientData.clientName}!`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao verificar o código OTP." });
  }
});

module.exports = app;
