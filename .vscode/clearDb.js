const { Clients, Academies, Coaches } = require("../models");

async function clearDatabase() {
  try {
    await Clients.destroy({ where: {} });
    await Academies.destroy({ where: {} });
    await Coaches.destroy({ where: {} });

    console.log("Banco de dados limpo com sucesso!");
  } catch (error) {
    console.error("Erro ao limpar banco de dados:", error);
  }
}

clearDatabase();
