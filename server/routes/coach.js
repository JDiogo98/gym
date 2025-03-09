const express = require("express");

const router = express.Router();

const { Coach, sequelize, Training } = require("../models");
const { where, Op } = require("sequelize");

const dayjs = require("dayjs");

// JD - Obter todas os Coaches visíveis
router.get("/", async (req, res) => {
  try {
    const listOfCoaches = await Coach.findAll({
      where: {
        coachVisible: true,
      },
      atributtes: ["coachId", "coachName"],
    });

    res.status(200).json(listOfCoaches);
  } catch (error) {
    console.error("Erro ao obter os Coaches.", error);
    res.status(500).json({
      error: "Erro interno ao obter as Coaches",
    });
  }
});

router.get("/coachesProgress", async (req, res) => {
  try {
    const twelveMonthsAgo = dayjs().subtract(12, "month").toDate();

    const coachesProgress = await Training.findAll({
      attributes: [
        [sequelize.fn("MONTH", sequelize.col("training_date")), "month"],
        [sequelize.fn("COUNT", sequelize.col("training_id")), "totalTrainings"],
        "coach_id",
      ],
      include: [
        {
          model: Coach,
          as: "coach",
          attributes: ["coachName"],
        },
      ],
      where: {
        training_date: {
          [Op.gte]: twelveMonthsAgo,
        },
      },
      group: ["month", "coach_id", "Coach.coach_name"],
      order: [[sequelize.fn("MONTH", sequelize.col("training_date")), "ASC"]],
    });

    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    // Obter a lista de todos os treinadores para garantir que apareçam no gráfico
    const allCoaches = await Coach.findAll({
      attributes: ["coachName"],
      raw: true,
    });

    const currentMonth = dayjs().month();
    const orderedMonths = [
      ...months.slice(currentMonth + 1),
      ...months.slice(0, currentMonth + 1),
    ];

    const chartData = orderedMonths
      .map((month, index) => {
        const monthData = { month };
        let hasTrainings = false;

        // Inicializa cada treinador com 0 treinos
        allCoaches.forEach((coach) => {
          monthData[coach.coachName] = 0;
        });

        coachesProgress.forEach((progress) => {
          if (
            progress.dataValues.month ===
            ((currentMonth + index + 1) % 12) + 1
          ) {
            monthData[progress.coach.coachName] =
              progress.dataValues.totalTrainings;
            hasTrainings = true;
          }
        });

        return hasTrainings ? monthData : null;
      })
      .filter((data) => data !== null);

    res.status(200).json(chartData);
  } catch (error) {
    console.error("Erro ao obter o progresso dos Coaches.", error);
    res.status(500).json({
      error: "Erro interno ao obter o progresso dos Coaches",
    });
  }
});

module.exports = router;
