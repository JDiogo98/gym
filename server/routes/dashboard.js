const express = require("express");
const dayjs = require("dayjs");

const { Client, Training, Coach, Academy, TrainingType } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

// JD - Rota para os últimos 30 treinos
router.get("/lastTrainings", async (req, res) => {
  try {
    const listOfLast30Trainings = await Training.findAll({
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["clientName"],
          required: true,
        },
        {
          model: Coach,
          as: "coach",
          attributes: ["coachName"],
          required: true,
        },
        {
          model: Academy,
          as: "academy",
          attributes: ["academyName"],
          required: true,
        },
        {
          model: TrainingType,
          as: "trainingType",
          attributes: ["trainingTypeName"],
          required: true,
        },
      ],
      limit: 30,
      order: [["trainingDate", "DESC"]],
    });

    const formattedTrainings = listOfLast30Trainings.map((training) => ({
      traningId: training.trainingId,
      trainingDate: dayjs(training.trainingDate).format("DD/MM - HH:mm"),
      trainingClient: training.client.clientName,
      trainingCoach: training.coach.coachName,
      trainingAcademy: training.academy.academyName,
      trainingTrainingTypeName: training.trainingType.trainingTypeName,
    }));

    res.status(200).json(formattedTrainings);
  } catch (error) {
    console.error("Erro ao obter os treinos", error);
    res.status(500).json({
      error: "Erro interno ao obter os treinos",
    });
  }
});
router.get("/activeClients", async (req, res) => {
  try {
    const thirtyDaysAgo = dayjs().subtract(30, "day").toDate();
    const sixtyDaysAgo = dayjs().subtract(60, "day").toDate();

    const clientsLast30Days = await Training.findAll({
      where: {
        trainingDate: {
          [Op.gte]: thirtyDaysAgo,
        },
      },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["clientId"],
        },
      ],
      group: ["clientId"],
    });

    const clientsPrevious30Days = await Training.findAll({
      where: {
        trainingDate: {
          [Op.gte]: sixtyDaysAgo,
          [Op.lt]: thirtyDaysAgo,
        },
      },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["clientId"],
        },
      ],
      group: ["clientId"],
    });

    const activeClientsLast30Days = clientsLast30Days.length;
    const activeClientsPrevious30Days = clientsPrevious30Days.length;

    const evolution =
      ((activeClientsLast30Days - activeClientsPrevious30Days) /
        activeClientsPrevious30Days) *
      100;

    res.status(200).json({
      content: activeClientsLast30Days,
      evolution: `${evolution >= 0 ? "+" : ""}${evolution.toFixed(2)}%`,
    });
  } catch (error) {
    console.error("Erro ao obter os clientes ativos", error);
    res.status(500).json({
      error: "Erro interno ao obter os clientes ativos",
    });
  }
});
// JD - Rota para treinos este mês
router.get("/thisMonth", async (req, res) => {
  try {
    const startOfCurrentMonth = dayjs().startOf("month").toDate();
    const startOfPreviousMonth = dayjs()
      .subtract(1, "month")
      .startOf("month")
      .toDate();

    const endOfPreviousMonth = dayjs()
      .subtract(1, "month")
      .endOf("month")
      .toDate();

    const trainingsThisMonth = await Training.findAll({
      where: {
        trainingDate: {
          [Op.gte]: startOfCurrentMonth,
        },
      },
    });

    const trainingsPreviousMonth = await Training.findAll({
      where: {
        trainingDate: {
          [Op.gte]: startOfPreviousMonth,
          [Op.lt]: startOfCurrentMonth,
        },
      },
    });

    const trainingsThisMonthCount = trainingsThisMonth.length;
    const trainingsPreviousMonthCount = trainingsPreviousMonth.length;

    const evolution =
      ((trainingsThisMonthCount - trainingsPreviousMonthCount) /
        trainingsPreviousMonthCount) *
      100;

    res.status(200).json({
      content: trainingsThisMonthCount,
      evolution: `${evolution >= 0 ? "+" : ""}${evolution.toFixed(2)}%`,
    });
  } catch (error) {
    console.error("Erro ao obter os treinos deste mês", error);
    res.status(500).json({
      error: "Erro interno ao obter os treinos deste mês",
    });
  }
});

router.get("/averageTrainings", async (req, res) => {
  try {
    const thirtyDaysAgo = dayjs().subtract(30, "day").toDate();
    const sixtyDaysAgo = dayjs().subtract(60, "day").toDate();

    const trainingsLast30Days = await Training.findAll({
      where: {
        trainingDate: {
          [Op.gte]: thirtyDaysAgo,
        },
      },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["clientId"],
        },
      ],
    });

    const trainingsPrevious30Days = await Training.findAll({
      where: {
        trainingDate: {
          [Op.gte]: sixtyDaysAgo,
          [Op.lt]: thirtyDaysAgo,
        },
      },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["clientId"],
        },
      ],
    });

    const clientsLast30Days = new Set(
      trainingsLast30Days.map((t) => t.clientId)
    );
    const clientsPrevious30Days = new Set(
      trainingsPrevious30Days.map((t) => t.clientId)
    );

    const averageTrainingsLast30Days =
      trainingsLast30Days.length / clientsLast30Days.size;
    const averageTrainingsPrevious30Days =
      trainingsPrevious30Days.length / clientsPrevious30Days.size;

    const evolution =
      ((averageTrainingsLast30Days - averageTrainingsPrevious30Days) /
        averageTrainingsPrevious30Days) *
      100;

    res.status(200).json({
      content: averageTrainingsLast30Days.toFixed(2),
      evolution: `${evolution >= 0 ? "+" : ""}${evolution.toFixed(2)}%`,
    });
  } catch (error) {
    console.error("Erro ao obter a média de treinos por cliente", error);
    res.status(500).json({
      error: "Erro interno ao obter a média de treinos por cliente",
    });
  }
});

module.exports = router;
