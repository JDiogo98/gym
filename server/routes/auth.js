const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sequelize, where, fn } = require("sequelize");
const { cookie } = require("express");

const router = express.Router();

// Rota de registo
router.post("/register", async (req, res) => {
  const { email, password, name, confirmPassword } = req.body;

  console.log(email, password, name, confirmPassword);

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Senhas não coincidem." });
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "E-mail inválido." });
  }

  const userExists = await User.findOne({
    where: { userEmail: email },
  });

  if (userExists) {
    return res.status(400).json({ message: "Email já registado." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      userName: name,
      userEmail: email,
      userPasswordHash: hashedPassword,
    });

    const userResponse = newUser.toJSON();
    delete userResponse.userPasswordHash;

    res
      .status(201)
      .json({ message: "Utilizador registado com sucesso!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuário pelo email
    const user = await User.findOne({ where: { userEmail: email } });

    // Verificar se o usuário existe
    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    // Comparar a senha fornecida com o hash armazenado
    const isMatch = await bcrypt.compare(password, user.userPasswordHash);

    // Se a senha não coincidir
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    // Gerar o token JWT (Lembre-se de armazenar sua chave secreta em uma variável de ambiente)
    const token = jwt.sign(
      { userId: user.userId, userName: user.userName },
      "process.env.JWT_SECRET_KEY",
      {
        expiresIn: "1h", // Expiração de 1 hora
      }
    );

    // TODO COLOCAR A CHAVE JWT_SECRET_KEY NO .env

    // Retornar o token e mensagem de sucesso
    res.cookie("token", token, {
      httpOnly: false,
      secure: false, // NÃO usa HTTPS durante o desenvolvimento
      maxAge: 3600000, // 1 hora
      path: "/",
    });

    // TODO COLOCAR O COOKIE APENAS EM AMBIENTE SEGURO

    res.status(200).json({
      message: "Login realizado com sucesso.",
      userName: user.userName,
      userId: user.userId,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro no servidor. Tente novamente mais tarde." });
  }
});

module.exports = router;
