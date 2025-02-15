const express = require("express");

const router = express.Router();

const { Coach } = require("../models");
const { where } = require("sequelize");

// JD - Obter todas os Coaches visíveis
router.get("/", async (req, res) => {
  try {
    const listOfCoaches = await Coach.findAll({
      where: {
        visible: true,
      },
      atributtes: ["id", "name"],
    });

    res.status(200).json(listOfCoaches);
  } catch (error) {
    console.error("Erro ao obter os Coaches.", error);
    res.status(500).json({
      error: "Erro interno ao obter as Coaches",
    });
  }
});

module.exports = router;
