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

router.get("/all", async (req, res) => {
  try {
    const listOfTrainingTypes = await TrainingType.findAll({});
    res.status(200).json(listOfTrainingTypes);
  } catch (error) {
    console.error("Erro ao obter os tipos de Treinos.", error);
    res.status(500).json({
      error: "Erro interno ao obter os tipos de treinos.",
    });
  }
});

router.post("/", async (req, res) => {
  const { trainingTypeName, trainingTypeVisible } = req.body;

  const existingTrainingType = await TrainingType.findOne({
    where: {
      trainingTypeName,
    },
  });

  if (existingTrainingType) {
    return res.status(400).json({
      error: "Tipo de treino já existe.",
    });
  }

  try {
    const trainingType = await TrainingType.create({
      trainingTypeName,
    });

    res.status(200).json(trainingType);
  } catch (error) {
    console.error("Erro ao adicionar o tipo de treino.", error);
    res.status(500).json({
      error: "Erro interno ao adicionar o tipo de treino.",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { trainingTypeName, trainingTypeVisible } = req.body;

  console.log(trainingTypeName, trainingTypeVisible);
  console.log(id);

  const trainingType = await TrainingType.findByPk(id);

  if (!trainingType) {
    return res.status(404).json({
      error: "Tipo de treino não encontrado.",
    });
  }

  trainingType.trainingTypeName = trainingTypeName;
  trainingType.trainingTypeVisible = trainingTypeVisible;

  await trainingType.save();

  return res.status(200).json(trainingType);
});

router.put("/visible/:trainingTypeId", async (req, res) => {
  const { trainingTypeId } = req.params;

  try {
    const trainingType = await TrainingType.findByPk(trainingTypeId);

    if (!trainingType) {
      return res.status(404).json({
        error: "Tipo de treino não encontrado",
      });
    }

    trainingType.trainingTypeVisible = !trainingType.trainingTypeVisible;

    await trainingType.save();
    res.status(200).json(trainingType);
  } catch (error) {
    console.error("Erro ao alterar a visibilidade da academia.", error);
    res.status(500).json({
      error: "Erro interno ao alterar a visibilidade da academia",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const trainingType = await TrainingType.findByPk(id);

  if (!trainingType) {
    return res.status(404).json({
      error: "Tipo de treino não encontrado.",
    });
  }

  await trainingType.destroy();

  return res.status(200).json(trainingType);
});

module.exports = router;
