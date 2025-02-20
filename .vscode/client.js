const express = require("express");

const router = express.Router();

const { Client, Academy, Coach } = require("../models");
const { where } = require("sequelize");

// JD - Obter todos os clientes
router.get("/", async (req, res) => {
  try {
    const listOfClients = await Client.findAll({
      include: [
        {
          model: Academy,
          as: "academy",
          attributes: ["name"],
        },
        {
          model: Coach,
          as: "coach",
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json(listOfClients);
  } catch (error) {
    console.error(
      "Erro ao obter os clientes com as academias e os treinadores:",
      error
    );
    res.status(500).json({
      error: "Erro interno ao obter os clientes",
    });
  }
});

// JD - Criar um novo cliente
router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone_number,
      birth_date,
      registration_date,
      sex,
      academy,
      coach,
    } = req.body;

    // JD - Validação simples dos campos obrigatórios
    if (!name || !phone_number || !birth_date || !registration_date || !sex) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    // JD - Garantir que as datas sejam convertidas corretamente
    const formattedbirth_date = new Date(birth_date);
    const formattedregistration_date = new Date(registration_date);

    // Formatar as datas para garantir que são aceitas pelo Sequelize
    if (isNaN(formattedbirth_date) || isNaN(formattedregistration_date)) {
      return res.status(400).json({ error: "Formato de data inválido." });
    }

    // Garantir que os campos 'academy' e 'coach' sejam inteiros
    const formattedClient = {
      name,
      phone_number,
      birth_date: formattedbirth_date,
      registration_date: formattedregistration_date,
      sex,
      academy: parseInt(academy), // Certifique-se de que os valores são inteiros
      coach: parseInt(coach), // Certifique-se de que os valores são inteiros
    };

    // Verificar se o número de telefone já existe
    const existingClient = await client.findOne({ where: { phone_number } });
    if (existingClient) {
      return res
        .status(400)
        .json({ error: "Número de telefone já está em uso." });
    }

    // Criar o novo cliente no banco de dados
    const newClient = await Client.create(formattedClient);

    // Responder com o cliente criado
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(500).json({ error: "Erro interno ao criar cliente." });
  }
});

// JD - Obter um cliente específico pelo id
router.get("/:id", async (req, res) => {
  try {
    const clientId = req.params.id;

    // JD - Verificar se o cliente existe
    const client = await Client.findOne({
      where: { id: clientId },
      include: [
        {
          model: Academy,
          as: "academy",
          attributes: ["name"],
        },
        {
          model: Coach,
          as: "coach",
          attributes: ["name"],
        },
      ],
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // JD - Responder com os dados do cliente
    res.status(200).json(client);
  } catch (error) {
    console.error("Erro ao obter cliente:", error);
    res.status(500).json({ error: "Erro interno ao obter cliente" });
  }
});

// JD - Atualizar um cliente pelo id
router.put("/:id", async (req, res) => {
  try {
    const clientId = req.params.id;

    // JD - Verificar se o ID é um número
    if (isNaN(clientId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const {
      name,
      phone_number,
      birth_date,
      registration_date,
      sex,
      academy,
      coach,
    } = req.body;

    // Verificar se o cliente existe
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // Atualizar os campos do cliente
    client.name = name || client.name;
    client.phone_number = phone_number || client.phone_number;
    client.birth_date = birth_date ? new Date(birth_date) : client.birth_date;
    client.registration_date = registration_date
      ? new Date(registration_date)
      : client.registration_date;
    client.sex = sex || client.sex;
    client.academy = academy ? parseInt(academy) : client.academy;
    client.coach = coach ? parseInt(coach) : client.coach;

    // Salvar as alterações no banco de dados
    await client.save();

    // Responder com o cliente atualizado
    res.status(200).json(client);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ error: "Erro interno ao atualizar cliente" });
  }
});
// JD - Eliminar um cliente pelo id
router.delete("/:id", async (req, res) => {
  try {
    const clientId = req.params.id;

    // JD - Verificar se o ID é um número
    if (isNaN(clientId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // JD - Verificar se o cliente existe
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // JD - Eliminar o cliente
    await client.destroy({ where: { id: clientId } });

    // JD - Responder com sucesso
    res.status(200).json({ message: "Cliente eliminado com sucesso." });

    // JD - Responder com erro
  } catch (error) {
    console.error("Erro ao eliminar cliente:", error);
    res.status(500).json({ error: "Erro interno ao eliminar cliente" });
  }
});

module.exports = router;
