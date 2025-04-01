const otpService = require("../services/otpService");
const { sendSmsOtp } = require("../services/smsService");

// Função para solicitar OTP
const requestOtp = async (req, res) => {
  const { clientId, otpActionType } = req.body; // Pega o clientId e actionType do corpo da requisição

  try {
    // Gera o OTP
    const otp = await otpService.generateOtp(clientId, otpActionType);

    // Envia o OTP para o cliente via SMS (usando o serviço SMS)
    await sendSmsOtp(clientId, otp.otpCode);

    // Responde com sucesso
    res.status(200).json({ message: "OTP enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao gerar OTP." });
  }
};

module.exports = {
  requestOtp,
};
