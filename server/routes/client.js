const express = require("express");

const router = express.Router();

const { Client, Academy, Coach, Training } = require("../models");
const { where } = require("sequelize");

// JD - Obter todos os clientes
router.get("/", async (req, res) => {
  try {
    const listOfClients = await Client.findAll({
      include: [
        {
          model: Academy,
          as: "academy",
          attributes: ["academyName"],
        },
        {
          model: Coach,
          as: "coach",
          attributes: ["coachName"],
        },
        {
          model: Training,
          as: "trainings",
          attributes: ["trainingDate"],
          order: [["trainingDate", "DESC"]],
          limit: 1,
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
      clientName,
      clientPhoneNumber,
      clientBirthDate,
      clientRegistrationDate,
      clientSex,
      academyId,
      coachId,
    } = req.body;

    // JD - Validação simples dos campos obrigatórios
    if (
      !clientName ||
      !clientPhoneNumber ||
      !clientBirthDate ||
      !clientRegistrationDate ||
      !clientSex
    ) {
      return res
        .status(400)
        .json({ error: "Nem todos os campos estão preenchidos." });
    }

    // JD - Garantir que as datas sejam convertidas corretamente
    const formattedClientBirthDate = new Date(clientBirthDate);
    const formattedClientRegistrationDate = new Date(clientRegistrationDate);

    // Formatar as datas para garantir que são aceitas pelo Sequelize
    if (
      isNaN(formattedClientBirthDate) ||
      isNaN(formattedClientRegistrationDate)
    ) {
      return res.status(400).json({ error: "Formato de data inválido." });
    }

    // Garantir que os campos 'academyId' e 'coachId' sejam inteiros
    const formattedClient = {
      clientName,
      clientPhoneNumber,
      clientBirthDate: formattedClientBirthDate,
      clientRegistrationDate: formattedClientRegistrationDate,
      clientSex,
      academyId: academyId ? parseInt(academyId) : null, // JD - Os valores devem ser inteiros ou null
      coachId: coachId ? parseInt(coachId) : null, // JD - Os valores devem ser inteiros ou null
    };

    console.log(formattedClient);

    // Verificar se o número de telefone já existe
    const existingClient = await Client.findOne({
      where: { clientPhoneNumber },
    });
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
      where: { clientId: clientId },
      include: [
        {
          model: Academy,
          as: "academy",
          attributes: ["academyName"],
        },
        {
          model: Coach,
          as: "coach",
          attributes: ["coachName"],
        },
      ],
    });

    if (!client) {
      return res
        .status(404)
        .json({ error: "Cliente não existe na Base de Dados." });
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
      clientName,
      clientPhoneNumber,
      clientBirthDate,
      clientRegistrationDate,
      clientSex,
      academyId,
      coachId,
      clientMail,
    } = req.body;

    // Verificar se o cliente existe
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // Atualizar os campos do cliente
    client.clientName = clientName || client.clientName;
    client.clientPhoneNumber = clientPhoneNumber || client.clientPhoneNumber;
    client.clientBirthDate = clientBirthDate
      ? new Date(clientBirthDate)
      : client.clientBirthDate;
    client.clientRegistrationDate = clientRegistrationDate
      ? new Date(clientRegistrationDate)
      : client.clientRegistrationDate;
    client.clientSex = clientSex || client.clientSex;
    client.academyId = academyId ? parseInt(academyId) : client.academyId;
    client.coachId = coachId ? parseInt(coachId) : client.coachId;
    client.clientMail = clientMail || client.clientMail;

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
    await Client.destroy({ where: { clientId: clientId } });

    // JD - Responder com sucesso
    res.status(200).json({ message: "Cliente eliminado com sucesso." });

    // JD - Responder com erro
  } catch (error) {
    console.error("Erro ao eliminar cliente:", error);
    res.status(500).json({ error: "Erro interno ao eliminar cliente" });
  }
});

module.exports = router;
