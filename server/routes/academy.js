const express = require("express");

const router = express.Router();

const { Academy } = require("../models");

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

module.exports = router;
