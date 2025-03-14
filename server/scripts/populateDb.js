const {
  Client,
  Academy,
  Coach,
  Training,
  TrainingType,
  Duration,
} = require("../models");

async function populateDatabase() {
  try {
    // JD -  Inserir dados na tabela Academy (10 Academias)
    const academies = [
      {
        academyName: "Academia Central",
        academyAddress: "Rua Principal, 123",
        academyLocation: "Lisboa",
        academyZipCode: "1000-100",
      },
      {
        academyName: "Academia Norte",
        academyAddress: "Avenida Norte, 456",
        academyLocation: "Porto",
        academyZipCode: "2000-200",
      },
      {
        academyName: "Academia do Sul",
        academyAddress: "Rua do Sul, 789",
        academyLocation: "Faro",
        academyZipCode: "3000-300",
      },
      {
        academyName: "Academia do Leste",
        academyAddress: "Rua Leste, 101",
        academyLocation: "Coimbra",
        academyZipCode: "4000-400",
      },
      {
        academyName: "Academia Fitness",
        academyAddress: "Avenida Fitness, 102",
        academyLocation: "Lisboa",
        academyZipCode: "5000-500",
      },
      {
        academyName: "Academia Power",
        academyAddress: "Avenida Power, 103",
        academyLocation: "Porto",
        academyZipCode: "6000-600",
      },
      {
        academyName: "Academia Elite",
        academyAddress: "Rua Elite, 104",
        academyLocation: "Lisboa",
        academyZipCode: "7000-700",
      },
      {
        academyName: "Academia Saúde",
        academyAddress: "Rua da Saúde, 105",
        academyLocation: "Braga",
        academyZipCode: "8000-800",
      },
      {
        academyName: "Academia Performance",
        academyAddress: "Rua Performance, 106",
        academyLocation: "Porto",
        academyZipCode: "9000-900",
      },
      {
        academyName: "Academia Total",
        academyAddress: "Rua Total, 107",
        academyLocation: "Funchal",
        academyZipCode: "10000-1000",
      },
    ];

    // Criar academias no banco
    const createdAcademies = await Academy.bulkCreate(academies);

    // JD - Inserir dados na tabela Coach (10 Coaches)
    const coaches = [
      {
        coachName: "Carlos Silva",
        coachPhoneNumber: "912345678",
        coachSex: "M",
        coachBirthDate: "1985-05-15",
      },
      {
        coachName: "Ana Martins",
        coachPhoneNumber: "923456789",
        coachSex: "F",
        coachBirthDate: "1990-07-20",
      },
      {
        coachName: "João Costa",
        coachPhoneNumber: "912345679",
        coachSex: "M",
        coachBirthDate: "1982-03-25",
      },
      {
        coachName: "Beatriz Almeida",
        coachPhoneNumber: "923456780",
        coachSex: "F",
        coachBirthDate: "1988-11-30",
      },
      {
        coachName: "Pedro Sousa",
        coachPhoneNumber: "912345680",
        coachSex: "M",
        coachBirthDate: "1991-05-10",
      },
      {
        coachName: "Laura Ferreira",
        coachPhoneNumber: "923456781",
        coachSex: "F",
        coachBirthDate: "1993-02-22",
      },
      {
        coachName: "Miguel Oliveira",
        coachPhoneNumber: "912345681",
        coachSex: "M",
        coachBirthDate: "1992-01-05",
      },
      {
        coachName: "Sofia Pereira",
        coachPhoneNumber: "923456782",
        coachSex: "F",
        coachBirthDate: "1987-09-15",
      },
      {
        coachName: "Rui Santos",
        coachPhoneNumber: "912345682",
        coachSex: "M",
        coachBirthDate: "1990-12-12",
      },
      {
        coachName: "Carolina Rocha",
        coachPhoneNumber: "923456783",
        coachSex: "F",
        coachBirthDate: "1989-08-28",
      },
    ];

    // Criar treinadores no banco
    const createdCoaches = await Coach.bulkCreate(coaches);

    // JD - Inserir dados na tabela TrainingType (5 tipos de treino)
    const trainingTypes = [
      { trainingTypeName: "Cardio", visible: true },
      { trainingTypeName: "Força", visible: true },
      { trainingTypeName: "Flexibilidade", visible: true },
      { trainingTypeName: "Resistência", visible: true },
      { trainingTypeName: "HIIT", visible: true },
    ];

    // Criar tipos de treino no banco
    const createdTrainingTypes = await TrainingType.bulkCreate(trainingTypes);

    // JD - Inserir dados na tabela Client (10 Clientes)
    const clients = [
      {
        clientName: "José Diogo",
        clientPhoneNumber: "+351938096814",
        clientSex: "M",
        clientBirthDate: "1995-04-01",
        academyId: createdAcademies[0].academyId, // usando camelCase para a FK
        coachId: createdCoaches[0].coachId, // usando camelCase para a FK
      },
      {
        clientName: "Maria Costa",
        clientPhoneNumber: "+351937654321",
        clientSex: "F",
        clientBirthDate: "1992-08-10",
        academyId: createdAcademies[1].academyId,
        coachId: createdCoaches[1].coachId,
      },
      {
        clientName: "Carlos Ramos",
        clientPhoneNumber: "+351931234568",
        clientSex: "M",
        clientBirthDate: "1989-06-15",
        academyId: createdAcademies[2].academyId,
        coachId: createdCoaches[2].coachId,
      },
      {
        clientName: "Sofia Silva",
        clientPhoneNumber: "+351937654322",
        clientSex: "F",
        clientBirthDate: "1994-03-20",
        academyId: createdAcademies[3].academyId,
        coachId: createdCoaches[3].coachId,
      },
      {
        clientName: "Luís Oliveira",
        clientPhoneNumber: "+351931234569",
        clientSex: "M",
        clientBirthDate: "1991-05-25",
        academyId: createdAcademies[4].academyId,
        coachId: createdCoaches[4].coachId,
      },
      {
        clientName: "Helena Pereira",
        clientPhoneNumber: "+351937654323",
        clientSex: "F",
        clientBirthDate: "1990-07-10",
        academyId: createdAcademies[5].academyId,
        coachId: createdCoaches[5].coachId,
      },
      {
        clientName: "Bruno Martins",
        clientPhoneNumber: "+351931234570",
        clientSex: "M",
        clientBirthDate: "1988-12-05",
        academyId: createdAcademies[6].academyId,
        coachId: createdCoaches[6].coachId,
      },
      {
        clientName: "Laura Mendes",
        clientPhoneNumber: "+351937654324",
        clientSex: "F",
        clientBirthDate: "1993-11-18",
        academyId: createdAcademies[7].academyId,
        coachId: createdCoaches[7].coachId,
      },
      {
        clientName: "Tiago Costa",
        clientPhoneNumber: "+351931234571",
        clientSex: "M",
        clientBirthDate: "1987-01-30",
        academyId: createdAcademies[8].academyId,
        coachId: createdCoaches[8].coachId,
      },
      {
        clientName: "Raquel Alves",
        clientPhoneNumber: "+351937654325",
        clientSex: "F",
        clientBirthDate: "1992-02-12",
        academyId: createdAcademies[9].academyId,
        coachId: createdCoaches[9].coachId,
      },
    ];

    // Criar clientes no banco
    const createdClients = await Client.bulkCreate(clients);

    const durations = [
      { durationName: "15min." },
      { durationName: "30min." },
      { durationName: "45min." },
      { durationName: "60min." },
      { durationName: "75min." },
      { durationName: "90min." },
      { durationName: "105min." },
      { durationName: "120min." },
    ];

    const createdDurations = await Duration.bulkCreate(durations);

    // JD - Inserir treinos para cada cliente com quantidade aleatória
    for (let i = 0; i < createdClients.length; i++) {
      // Definir uma quantidade aleatória de treinos entre 5 e 20 por cliente
      const trainingCount = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

      for (let j = 0; j < trainingCount; j++) {
        // Gerar uma data aleatória entre dezembro de 2024 e fevereiro de 2025
        const startDate = new Date(2024, 11, 1); // 1º de dezembro de 2024
        const endDate = new Date(2025, 1, 28); // 28 de fevereiro de 2025

        // Calcular a diferença entre as datas em milissegundos
        const timeDifference = endDate.getTime() - startDate.getTime();

        // Gerar um valor aleatório dentro desse intervalo
        const randomTime = Math.floor(Math.random() * timeDifference);

        // Criar uma nova data aleatória dentro do intervalo
        const randomDate = new Date(startDate.getTime() + randomTime);

        await Training.create({
          trainingDate: randomDate, // Data aleatória gerada
          trainingDurationId:
            createdDurations[
              Math.floor(Math.random() * createdDurations.length)
            ].durationId, // Associa à duração
          trainingTypeId:
            createdTrainingTypes[
              Math.floor(Math.random() * createdTrainingTypes.length)
            ].trainingTypeId, // Associa ao tipo de treino
          clientId: createdClients[i].clientId, // Associa ao cliente
          coachId: createdCoaches[i % createdCoaches.length].coachId, // Associa ao treinador
          academyId: createdAcademies[i % createdAcademies.length].academyId, // Associa à academia
        });
      }
    }

    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular banco de dados:", error);
  }
}

populateDatabase();
