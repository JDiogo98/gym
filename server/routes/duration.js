const express = require("express");

const router = express.Router();

const { Duration } = require("../models");

// JD - Obter todas as academias visíveis
router.get("/", async (req, res) => {
  try {
    const listOfDurations = await Duration.findAll({
      atributtes: ["duration_id", "duration_name"],
    });

    res.status(200).json(listOfDurations);
  } catch (error) {
    console.error("Erro ao obter as durações dos treinos.", error);
    res.status(500).json({
      error: "Erro interno ao obter as durações dos treinos",
    });
  }
});

module.exports = router;
