const express = require("express");

const router = express.Router();

const { Academy, Client } = require("../models");
const { where } = require("sequelize");

// JD - Obter todas as academias visíveis
router.get("/", async (req, res) => {
  try {
    const listOfAcademys = await Academy.findAll({
      where: {
        academyVisible: true,
      },
      atributtes: ["academy_id", "academy_name"],
    });

    res.status(200).json(listOfAcademys);
  } catch (error) {
    console.error("Erro ao obter as academias.", error);
    res.status(500).json({
      error: "Erro interno ao obter as academias",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const listOfAcademys = await Academy.scope("withHiddenFields").findAll({});

    res.status(200).json(listOfAcademys);
  } catch (error) {
    console.error("Erro ao obter as academias.", error);
    res.status(500).json({
      error: "Erro interno ao obter as academias",
    });
  }
});

router.put("/visible/:academyId", async (req, res) => {
  const { academyId } = req.params;

  try {
    const academy = await Academy.scope("withHiddenFields").findByPk(academyId);
    if (!academy) {
      return res.status(404).json({
        error: "Academia não encontrada",
      });
    }

    const academyClients = await Client.findAll({
      where: {
        academy_id: academyId,
      },
    });

    if (academyClients.length > 0) {
      const clientNames = academyClients
        .map((client) => client.clientName)
        .join(", ");

      return res.status(400).json({
        error: `Não é possível alterar o status da ${academy.academyName} com os seguintes clientes associados:`,
        description: clientNames,
      });
    }

    academy.academyVisible = !academy.academyVisible;

    await academy.save();
    res.status(200).json(academy);
  } catch (error) {
    console.error("Erro ao alterar a visibilidade da academia.", error);
    res.status(500).json({
      error: "Erro interno ao alterar a visibilidade da academia",
    });
  }
});

router.put("/:academyId", async (req, res) => {
  const { academyId } = req.params;
  const {
    academyName,
    academyAddress,
    academyLocation,
    academyZipCode,
    academyVisible,
  } = req.body;

  try {
    // Buscar a academia
    const academy = await Academy.scope("withHiddenFields").findByPk(academyId);
    if (!academy) {
      return res.status(404).json({ error: "Academia não encontrada" });
    }

    // Definir regras de validação
    const requiredFields = [
      { field: "academyName", label: "Nome", minLength: 3 },
      { field: "academyAddress", label: "Endereço", minLength: 3 },
      { field: "academyLocation", label: "Localidade", minLength: 3 },
      {
        field: "academyZipCode",
        label: "Código Postal",
        minLength: 8,
        maxLength: 8,
        pattern: /^\d{4}-\d{3}$/,
      },
    ];

    // Loop para validar os campos
    for (const {
      field,
      label,
      minLength,
      maxLength,
      pattern,
    } of requiredFields) {
      const value = req.body[field];

      if (!value) {
        return res.status(400).json({ error: `Preencha o campo ${label}.` });
      }

      if (minLength && value.length < minLength) {
        return res.status(400).json({
          error: `${label} deve ter no mínimo ${minLength} caracteres.`,
        });
      }

      if (maxLength && value.length > maxLength) {
        return res.status(400).json({
          error: `${label} deve ter no máximo ${maxLength} caracteres.`,
        });
      }

      if (pattern && !pattern.test(value)) {
        return res
          .status(400)
          .json({ error: `${label} deve estar no formato correto.` });
      }
    }

    const academyClients = await Client.findAll({
      where: {
        academy_id: academyId,
      },
    });

    console.log(academy.academyVisible, academyVisible);

    if (
      academyClients.length > 0 &&
      academyVisible !== academy.academyVisible
    ) {
      const clientNames = academyClients
        .map((client) => client.clientName)
        .join(", ");

      return res.status(400).json({
        error: `Não é possível alterar o status da ${academy.academyName} com os seguintes clientes associados:`,
        description: clientNames,
      });
    }

    // Atualizar os dados da academia
    academy.academyName = academyName;
    academy.academyAddress = academyAddress;
    academy.academyLocation = academyLocation;
    academy.academyZipCode = academyZipCode;
    academy.academyVisible = academyVisible;

    await academy.save();

    return res
      .status(200)
      .json({ message: "Academia atualizada com sucesso.", academy });
  } catch (error) {
    console.error("Erro ao alterar a academia:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao alterar a academia." });
  }
});

router.post("/", async (req, res) => {
  const {
    academyName,
    academyAddress,
    academyLocation,
    academyZipCode,
    academyVisible,
  } = req.body;

  console.log(req.body);

  const CurrentAcademy = await Academy.findOne({
    where: {
      academyName,
    },
  });

  if (CurrentAcademy) {
    return res.status(400).json({
      error: "Academia com o nome já existe.",
    });
  }

  try {
    const newAcademy = await Academy.create({
      academyName,
      academyAddress,
      academyLocation,
      academyZipCode,
      academyVisible,
    });

    res.status(201).json(newAcademy);
  } catch (error) {
    console.error("Erro ao criar a academia:", error);
    res.status(500).json({ error: "Erro interno ao criar a academia." });
  }
});

module.exports = router;
