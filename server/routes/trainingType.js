const express = require("express");

const router = express.Router();

const { TrainingType } = require("../models");
const { where } = require("sequelize");

// JD - Obter todas as academias visíveis
router.get("/", async (req, res) => {
  try {
    const listOfTrainingTypes = await TrainingType.findAll({
      where: {
        trainingTypeVisible: true,
      },
      attributes: ["trainingTypeId", "trainingTypeName"],
    });

    res.status(200).json(listOfTrainingTypes);
  } catch (error) {
    console.error("Erro ao obter os tipos de Treinos.", error);
    res.status(500).json({
      error: "Erro interno ao obter os tipos de treinos.",
    });
  }
});

module.exports = router;
