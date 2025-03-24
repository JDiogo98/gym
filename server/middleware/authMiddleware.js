const jwt = require("jsonwebtoken");

//todo colocar o segredo no env

// Função de verificação do JWT
const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(403)
      .json({ auth: false, message: "Token não informado." });
  }

  jwt.verify(token, "SECRET", (err, decoded) => {
    if (err) {
      return res.status(401).json({ auth: false, message: "Token inválido." });
    }
    req.userId = decoded.userId; // Defina o ID do usuário ou outros dados no req
    req.userName = decoded.userName; // Caso você tenha o nome no JWT, adicione ele também
    next(); // Chama o próximo middleware ou a rota
  });
};

module.exports = verifyJWT;
