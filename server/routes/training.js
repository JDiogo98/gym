const express = require("express");

const router = express.Router();

const {
  Training,
  Client,
  Coach,
  Academy,
  TrainingType,
  Sequelize,
  Duration,
} = require("../models");
const dayjs = require("dayjs");

const verifyJWT = require("../middleware/authMiddleware");

router.get("/id/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;



  try {
    const training = await Training.findByPk(id, {
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["clientId", "clientName"],
        },
        {
          model: Coach,
          as: "coach",
          attributes: ["coachId", "coachName"],
        },
        {
          model: Academy,
          as: "academy",
          attributes: ["academyId", "academyName"],
        },
        {
          model: TrainingType,
          as: "trainingType",
          attributes: ["trainingTypeId", "trainingTypeName"],
        },
        {
          model: Duration,
          as: "trainingDuration",
          attributes: ["durationId", "durationName"],
        },
      ],
    });

    if (!training) {
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    const formattedTraining = {
      trainingDate: dayjs(training.trainingDate),
      client: training.client,
      coach: training.coach,
      academy: training.academy,
      trainingType: training.trainingType,
      trainingDuration: training.trainingDuration,
    };

    res.status(200).json(formattedTraining);
  } catch (error) {
    console.error("Erro ao obter o treino", error);
    res.status(500).json({ error: "Erro interno ao obter o treino" });
  }
});

router.put("/id/:id", async (req, res) => {
  const { id } = req.params;

  const {
    trainingDate,
    clientId,
    coachId,
    academyId,
    trainingTypeId,
    durationId,
  } = req.body;

  console.log(req.body);

  try {
    const training = await Training.findByPk(id);

    if (!training) {
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    await training.update({
      trainingDate,
      clientId,
      coachId,
      academyId,
      trainingTypeId,
      trainingDurationId: durationId,
    });

    res.status(200).json({ message: "Treino atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o treino", error);
    res.status(500).json({ error: "Erro interno ao atualizar o treino" });
  }
});

router.get("/filteredLastTrainings", async (req, res) => {
  const { startDate, endDate, coachId, trainingTypeId, academyId, clientId } =
    req.query;

  try {
    // JD - Se não houver startDate e endDate, definir os valores padrão
    const filters = {};

    if (startDate && endDate) {
      filters.trainingDate = {
        [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else {
      const today = new Date();
      filters.trainingDate = {
        [Sequelize.Op.between]: [
          new Date(today.setMonth(today.getMonth() - 1)),
          new Date(),
        ],
      };
    }

    if (coachId) filters.coachId = coachId;
    if (trainingTypeId) filters.trainingTypeId = trainingTypeId;
    if (academyId) filters.academyId = academyId;
    if (clientId) filters.clientId = clientId;

    const filteredLastTrainings = await Training.findAll({
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
        {
          model: Duration,
          as: "trainingDuration",
          attributes: ["durationName"],
          required: true,
        },
      ],
      where: filters,
      order: [["trainingDate", "DESC"]],
    });

    const formattedTrainings = filteredLastTrainings.map((training) => ({
      trainingId: training.trainingId,
      trainingDate: dayjs(training.trainingDate).format("DD/MM - HH:mm"),
      trainingClient: training.client.clientName,
      trainingCoach: training.coach.coachName,
      trainingAcademy: training.academy.academyName,
      trainingTrainingType: training.trainingType.trainingTypeName,
      trainingDuration: training.trainingDuration.durationName,
    }));

    res.status(200).json(formattedTrainings);
  } catch (error) {
    console.error("Erro ao obter os treinos", error);
    res
      .status(500)
      .json({ error: "Erro interno ao obter os treinos filtrados" });
  }
});

router.get("/filteredTopClients", async (req, res) => {
  const { startDate, endDate, coachId, trainingTypeId, academyId } = req.query;

  const filters = {};

  if (startDate && endDate) {
    filters.trainingDate = {
      [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else {
    const today = new Date();
    filters.trainingDate = {
      [Sequelize.Op.between]: [
        new Date(today.setMonth(today.getMonth() - 1)),
        new Date(),
      ],
    };
  }

  if (coachId) filters.coachId = coachId;
  if (trainingTypeId) filters.trainingTypeId = trainingTypeId;
  if (academyId) filters.academyId = academyId;

  try {
    const topClients = await Training.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("training_id")), "totalTraining"],
      ],
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["clientId", "clientName"],
          required: true,
        },
      ],
      where: filters,
      group: ["client.client_id"],
      order: [
        [Sequelize.fn("COUNT", Sequelize.col("client.client_id")), "DESC"],
      ],
    });

    const formattedTopClients = topClients.map((client) => ({
      clientName: client.client.clientName,
      clientTrainings: client.get("totalTraining"),
      clientId: client.client.clientId,
    }));

    res.status(200).json(formattedTopClients);
  } catch (error) {
    console.error("Erro ao obter os clientes", error);
    res.status(500).json({ error: "Erro interno ao obter os clientes" });
  }
});

router.get("/filteredCardsInfo", async (req, res) => {
  const { startDate, endDate, coachId, trainingTypeId, academyId } = req.query;

  const filters = {};

  try {
    if (startDate && endDate) {
      filters.trainingDate = {
        [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else {
      const today = new Date();
      filters.trainingDate = {
        [Sequelize.Op.between]: [
          new Date(today.setMonth(today.getMonth() - 1)),
          new Date(),
        ],
      };
    }

    if (coachId) filters.coachId = coachId;
    if (trainingTypeId) filters.trainingTypeId = trainingTypeId;
    if (academyId) filters.academyId = academyId;

    const previousPeriodFilters = { ...filters };
    if (filters.trainingDate) {
      const start = new Date(filters.trainingDate[Sequelize.Op.between][0]);
      const end = new Date(filters.trainingDate[Sequelize.Op.between][1]);
      const diff = end - start;
      previousPeriodFilters.trainingDate = {
        [Sequelize.Op.between]: [new Date(start - diff), new Date(end - diff)],
      };
    }

    const totalTrainings = await Training.count({ where: filters });
    const previousTotalTrainings = await Training.count({
      where: previousPeriodFilters,
    });

    const activeClients = await Training.count({
      where: filters,
      distinct: true,
      col: "clientId",
    });
    const previousActiveClients = await Training.count({
      where: previousPeriodFilters,
      distinct: true,
      col: "clientId",
    });

    const averageTrainingsPerClient = activeClients
      ? totalTrainings / activeClients
      : 0;
    const previousAverageTrainingsPerClient = previousActiveClients
      ? previousTotalTrainings / previousActiveClients
      : 0;

    const days =
      (new Date(filters.trainingDate[Sequelize.Op.between][1]) -
        new Date(filters.trainingDate[Sequelize.Op.between][0])) /
      (1000 * 60 * 60 * 24);
    const trainingsPerDay = days ? totalTrainings / days : 0;

    const previousDays =
      (new Date(previousPeriodFilters.trainingDate[Sequelize.Op.between][1]) -
        new Date(previousPeriodFilters.trainingDate[Sequelize.Op.between][0])) /
      (1000 * 60 * 60 * 24);
    const previousTrainingsPerDay = previousDays
      ? previousTotalTrainings / previousDays
      : 0;

    const stats = [
      {
        title: "Total de Treinos",
        value: totalTrainings,
        change: previousTotalTrainings
          ? ((totalTrainings / previousTotalTrainings) * 100).toFixed(1) + "%"
          : "0%",
      },
      {
        title: "Clientes Ativos",
        value: activeClients,
        change: previousActiveClients
          ? ((activeClients / previousActiveClients) * 100).toFixed(1) + "%"
          : "0%",
      },
      {
        title: "Média de Treinos por Cliente",
        value: averageTrainingsPerClient.toFixed(1),
        change: previousAverageTrainingsPerClient
          ? (
              (averageTrainingsPerClient / previousAverageTrainingsPerClient) *
              100
            ).toFixed(1) + "%"
          : "0%",
      },
      {
        title: "Treinos por dia",
        value: trainingsPerDay.toFixed(1),
        change: previousTrainingsPerDay
          ? ((trainingsPerDay / previousTrainingsPerDay) * 100).toFixed(1) + "%"
          : "0%",
      },
    ];

    res.status(200).json(stats);
  } catch (error) {
    console.error("Erro ao obter as informações dos cartões", error);
    res
      .status(500)
      .json({ error: "Erro interno ao obter as informações dos cartões" });
  }
});

router.get("/coachesChart", async (req, res) => {
  const { startDate, endDate, coachId, trainingTypeId, academyId } = req.query;

  const filters = {};

  try {
    if (startDate && endDate) {
      filters.trainingDate = {
        [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else {
      const today = new Date();
      filters.trainingDate = {
        [Sequelize.Op.between]: [
          new Date(today.setMonth(today.getMonth() - 1)),
          new Date(),
        ],
      };
    }

    if (coachId) filters.coachId = coachId;
    if (trainingTypeId) filters.trainingTypeId = trainingTypeId;
    if (academyId) filters.academyId = academyId;

    const coachesTrainings = await Training.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("training_id")), "totalTraining"],
      ],
      include: [
        {
          model: Coach,
          as: "coach",
          attributes: ["coachName"],
          required: true,
        },
      ],
      where: filters,
      group: ["coach.coach_id"],
      order: [[Sequelize.fn("COUNT", Sequelize.col("coach.coach_id")), "DESC"]],
    });

    const formattedCoachesTrainings = coachesTrainings.map((training) => ({
      coachName: training.coach.coachName,
      totalTraining: training.get("totalTraining"),
    }));

    res.status(200).json(formattedCoachesTrainings);
  } catch (error) {
    console.error("Erro ao obter o total dos treinos", error);
    res.status(500).json({ error: "Erro interno ao obter o total de treinos" });
  }
});

module.exports = router;
