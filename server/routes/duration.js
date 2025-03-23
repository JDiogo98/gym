const express = require("express");

const router = express.Router();

const { Duration } = require("../models");

// JD - Obter todas as academias visíveis
router.get("/", async (req, res) => {
  try {
    const listOfDurations = await Duration.findAll({
      order: [["duration_number", "ASC"]],
    });

    res.status(200).json(listOfDurations);
  } catch (error) {
    console.error("Erro ao obter as durações dos treinos.", error);
    res.status(500).json({
      error: "Erro interno ao obter as durações dos treinos",
    });
  }
});

router.put("/visible/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const duration = await Duration.findByPk(id);

    if (!duration) {
      res.status(404).json({
        error: "Duração não encontrada",
      });
    }

    duration.durationVisible = !duration.durationVisible;

    await duration.save();

    res.status(200).json(duration);
  } catch (error) {
    console.error(
      "Erro ao alterar a visibilidade da duração do treino.",
      error
    );
    res.status(500).json({
      error: "Erro interno ao alterar a visibilidade da duração do treino",
    });
  }
});

router.post("/", async (req, res) => {
  const { durationNumber, durationName, durationVisible } = req.body;

  const roundedDurationNumber = parseFloat(durationNumber.toFixed(2));

  try {
    const newDuration = await Duration.create({
      durationNumber: roundedDurationNumber,
      durationName,
      durationVisible,
    });

    res.status(201).json(newDuration);
  } catch (error) {
    console.error("Erro ao criar uma nova duração de treino.", error);
    res.status(500).json({
      error: "Erro interno ao criar uma nova duração de treino",
    });
  }
});

module.exports = router;
