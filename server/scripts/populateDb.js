const { Client, Academy, Coach, Training, TrainingType } = require("../models");

async function populateDatabase() {
  try {
    // JD -  Inserir dados na tabela Academy (10 Academias)
    const academies = [
      {
        name: "Academia Central",
        address: "Rua Principal, 123",
        location: "Lisboa",
        zip_code: "1000-100",
      },
      {
        name: "Academia Norte",
        address: "Avenida Norte, 456",
        location: "Porto",
        zip_code: "2000-200",
      },
      {
        name: "Academia do Sul",
        address: "Rua do Sul, 789",
        location: "Faro",
        zip_code: "3000-300",
      },
      {
        name: "Academia do Leste",
        address: "Rua Leste, 101",
        location: "Coimbra",
        zip_code: "4000-400",
      },
      {
        name: "Academia Fitness",
        address: "Avenida Fitness, 102",
        location: "Lisboa",
        zip_code: "5000-500",
      },
      {
        name: "Academia Power",
        address: "Avenida Power, 103",
        location: "Porto",
        zip_code: "6000-600",
      },
      {
        name: "Academia Elite",
        address: "Rua Elite, 104",
        location: "Lisboa",
        zip_code: "7000-700",
      },
      {
        name: "Academia Saúde",
        address: "Rua da Saúde, 105",
        location: "Braga",
        zip_code: "8000-800",
      },
      {
        name: "Academia Performance",
        address: "Rua Performance, 106",
        location: "Porto",
        zip_code: "9000-900",
      },
      {
        name: "Academia Total",
        address: "Rua Total, 107",
        location: "Funchal",
        zip_code: "10000-1000",
      },
    ];

    // Criar academias no banco
    const createdAcademies = await Academy.bulkCreate(academies);

    // JD - Inserir dados na tabela Coach (10 Coaches)
    const coaches = [
      {
        name: "Carlos Silva",
        phone_number: "912345678",
        sex: "M",
        birth_date: "1985-05-15",
      },
      {
        name: "Ana Martins",
        phone_number: "923456789",
        sex: "F",
        birth_date: "1990-07-20",
      },
      {
        name: "João Costa",
        phone_number: "912345679",
        sex: "M",
        birth_date: "1982-03-25",
      },
      {
        name: "Beatriz Almeida",
        phone_number: "923456780",
        sex: "F",
        birth_date: "1988-11-30",
      },
      {
        name: "Pedro Sousa",
        phone_number: "912345680",
        sex: "M",
        birth_date: "1991-05-10",
      },
      {
        name: "Laura Ferreira",
        phone_number: "923456781",
        sex: "F",
        birth_date: "1993-02-22",
      },
      {
        name: "Miguel Oliveira",
        phone_number: "912345681",
        sex: "M",
        birth_date: "1992-01-05",
      },
      {
        name: "Sofia Pereira",
        phone_number: "923456782",
        sex: "F",
        birth_date: "1987-09-15",
      },
      {
        name: "Rui Santos",
        phone_number: "912345682",
        sex: "M",
        birth_date: "1990-12-12",
      },
      {
        name: "Carolina Rocha",
        phone_number: "923456783",
        sex: "F",
        birth_date: "1989-08-28",
      },
    ];

    // Criar treinadores no banco
    const createdCoaches = await Coach.bulkCreate(coaches);

    // JD - Inserir dados na tabela TrainingType (5 tipos de treino)
    const trainingTypes = [
      { type: "Cardio" },
      { type: "Força" },
      { type: "Flexibilidade" },
      { type: "Resistência" },
      { type: "HIIT" },
    ];

    // Criar tipos de treino no banco
    const createdTrainingTypes = await TrainingType.bulkCreate(trainingTypes);

    // JD - Inserir dados na tabela Client (10 Clientes)
    const clients = [
      {
        name: "João Pereira",
        phone_number: "931234567",
        sex: "M",
        birth_date: "1995-04-01",
        academy_id: createdAcademies[0].id,
        coach_id: createdCoaches[0].id,
      },
      {
        name: "Maria Costa",
        phone_number: "937654321",
        sex: "F",
        birth_date: "1992-08-10",
        academy_id: createdAcademies[1].id,
        coach_id: createdCoaches[1].id,
      },
      {
        name: "Carlos Ramos",
        phone_number: "931234568",
        sex: "M",
        birth_date: "1989-06-15",
        academy_id: createdAcademies[2].id,
        coach_id: createdCoaches[2].id,
      },
      {
        name: "Sofia Silva",
        phone_number: "937654322",
        sex: "F",
        birth_date: "1994-03-20",
        academy_id: createdAcademies[3].id,
        coach_id: createdCoaches[3].id,
      },
      {
        name: "Luís Oliveira",
        phone_number: "931234569",
        sex: "M",
        birth_date: "1991-05-25",
        academy_id: createdAcademies[4].id,
        coach_id: createdCoaches[4].id,
      },
      {
        name: "Helena Pereira",
        phone_number: "937654323",
        sex: "F",
        birth_date: "1990-07-10",
        academy_id: createdAcademies[5].id,
        coach_id: createdCoaches[5].id,
      },
      {
        name: "Bruno Martins",
        phone_number: "931234570",
        sex: "M",
        birth_date: "1988-12-05",
        academy_id: createdAcademies[6].id,
        coach_id: createdCoaches[6].id,
      },
      {
        name: "Laura Mendes",
        phone_number: "937654324",
        sex: "F",
        birth_date: "1993-11-18",
        academy_id: createdAcademies[7].id,
        coach_id: createdCoaches[7].id,
      },
      {
        name: "Tiago Costa",
        phone_number: "931234571",
        sex: "M",
        birth_date: "1987-01-30",
        academy_id: createdAcademies[8].id,
        coach_id: createdCoaches[8].id,
      },
      {
        name: "Raquel Alves",
        phone_number: "937654325",
        sex: "F",
        birth_date: "1992-02-12",
        academy_id: createdAcademies[9].id,
        coach_id: createdCoaches[9].id,
      },
    ];

    // Criar clientes no banco
    const createdClients = await Client.bulkCreate(clients);


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
      date: randomDate, // Data aleatória gerada
      duration: Math.floor(Math.random() * (120 - 30 + 1)) + 30, // Duração entre 30 e 120 minutos
      training_type_id: createdTrainingTypes[
        Math.floor(Math.random() * createdTrainingTypes.length)
      ].id, // Associa ao tipo de treino
      client_id: createdClients[i].id, // Associa ao cliente
      coach_id: createdCoaches[i % createdCoaches.length].id, // Associa ao treinador
      academy_id: createdAcademies[i % createdAcademies.length].id, // Associa à academia
    });
  }
}

    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular banco de dados:", error);
  }
}

populateDatabase();
