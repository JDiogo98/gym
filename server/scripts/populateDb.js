const { Client, Academy, Coach } = require("../models");

async function populateDatabase() {
  try {
    // JD -  Inserir dados na tabela Academy
    const academy1 = await Academy.create({
      name: "Academia Central",
      address: "Rua Principal, 123",
      location: "Lisboa",
      zipCode: "1000-100",
    });

    const academy2 = await Academy.create({
      name: "Academia Norte",
      address: "Avenida Norte, 456",
      location: "Porto",
      zipCode: "2000-200",
    });

    const coach1 = await Coach.create({
      name: "Carlos Silva",
      phoneNumber: "912345678",
      sex: "M",
      birthDate: "1985-05-15",
    });

    const coach2 = await Coach.create({
      name: "Ana Martins",
      phoneNumber: "923456789",
      sex: "F",
      birthDate: "1990-07-20",
    });

    // JD -  Inserir dados na tabela Client
    await Client.create({
      name: "João Pereira",
      phoneNumber: "931234567",
      sex: "M",
      birthDate: "1995-04-01",
      registrationDate: new Date(),
      academyId: academy1.id,
      coachId: coach1.id,
    });

    await Client.create({
      name: "Maria Costa",
      phoneNumber: "937654321",
      sex: "F",
      birthDate: "1992-08-10",
      registrationDate: new Date(),
      academyId: academy2.id,
      coachId: coach2.id,
    });

    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular banco de dados:", error);
  }
}

populateDatabase();
