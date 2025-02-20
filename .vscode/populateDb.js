const { Client, Academy, Coach } = require("../models");

async function populateDatabase() {
  try {
    // JD -  Inserir dados na tabela Academy
    const academy1 = await Academy.create({
      name: "Academia Central",
      address: "Rua Principal, 123",
      location: "Lisboa",
      zip_code: "1000-100",
    });

    const academy2 = await Academy.create({
      name: "Academia Norte",
      address: "Avenida Norte, 456",
      location: "Porto",
      zip_code: "2000-200",
    });

    const coach1 = await Coach.create({
      name: "Carlos Silva",
      phone_number: "912345678",
      sex: "M",
      birth_date: "1985-05-15",
    });

    const coach2 = await Coach.create({
      name: "Ana Martins",
      phone_number: "923456789",
      sex: "F",
      birth_date: "1990-07-20",
    });

    // JD -  Inserir dados na tabela Client
    await Client.create({
      name: "João Pereira",
      phone_number: "931234567",
      sex: "M",
      birth_date: "1995-04-01",
      registration_date: new Date(),
      academy_id: academy1.id,
      coach_id: coach1.id,
    });

    await Client.create({
      name: "Maria Costa",
      phone_number: "937654321",
      sex: "F",
      birth_date: "1992-08-10",
      registration_date: new Date(),
      academy_id: academy2.id,
      coach_id: coach2.id,
    });

    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular banco de dados:", error);
  }
}

populateDatabase();
