export default {
  TITLES: {
    CLIENT_INFO: "Informações Pessoais",
    ADD_NEW_CLIENT: "Adicionar Novo Cliente",
  },
  APP: {
    LOADING_USER: "Carregar dados do Utilizador",
    USER_NOT_FOUND: "Não foi possível encontrar os dados do cliente.",
    INVALID_CLIENT_ID: "O ID do cliente não é válido.",
    ERROR_FETCHING: "Erro ao buscar dados.",
  },
  CLIENT: {
    DESIGNATION: "Cliente",
    NAME: "Nome",
    PHONE: "N.º Telemóvel",
    BIRTH_DATE: "Data de Nascimento",
    REGISTRATION_DATE: "Data de Inscrição",
    SEX: {
      LABEL: "Sexo",
      MASCULINE: "Masculino",
      FEMININE: "Feminino",
      OTHER: "Outro",
    },
    EMAIL: "E-mail",
  },
  ACADEMY: {
    DESIGNATION: "Academia",
    SELECT: "Selecione uma academia",
    OPTIONAL: "Academia (opcional)",
    DATE: "Data do Treino",
    TIME: "Hora do Treino",
    TYPE: "Tipo de Treino",
  },
  COACH: {
    DESIGNATION: "Treinador",
    SELECT: "Selecione um treinador",
    OPTIONAL: "Treinador (opcional)",
    NONE: "Nenhum treinador",
    SELECT_COACH: "Selecione o treinador",
  },
  BUTTONS: {
    ADD: "Adicionar",
    SAVE: "Salvar",
    EDIT: "Editar",
    CANCEL: "Cancelar",
    DELETE: "Eliminar",
    ADD_CLIENT: "Adicionar Cliente",
  },
  TOAST_MESSAGES: {
    UPDATE_SUCCESS: (name) =>
      `Os dados do/a ${name} foram atualizados com sucesso!`,
    UPDATE_ERROR: (name) =>
      `Não foi possível atualizar os dados do/a ${name}, tente novamente.`,
    ADD_SUCCESS: (name) => `O/a ${name} foi adicionado/a com sucesso!`,
    ADD_ERROR: "Ocorreu um erro ao adicionar o cliente",
    FETCH_ERROR: "Ocorreu um erro ao buscar os dados.",
    TRAINING_UPDATE_SUCCESS: "Treino atualizado com sucesso!",
    TRAINING_UPDATE_ERRROR_TRY_AGAIN:
      "Erro ao atualizar treino, por favor tente novamente.",
  },
  VALIDATION_ERRORS: {
    NAME: "O nome deve ter pelo menos 2 caracteres.",
    PHONE: "O número de telefone deve ter 9 dígitos.",
    BIRTH_DATE: "A data de nascimento é obrigatória.",
    REGISTRATION_DATE: "A data de inscrição é obrigatória.",
    SEX: "Por favor, selecione um gênero.",
  },
  DASHBOARD: {
    TRAININGS_AVERAGE: {
      LABEL: "Média de Treinos",
      DESCRIPTION: "Média de treinos por cliente.",
      LOADING: "Carregar média de treinos.",
    },
    ACTIVE_CLIENTS: {
      LABEL: "Clientes Ativos",
      DESCRIPTION: "Clientes com treinos em 30 dias.",
      LOADING: "Carregar média de treinos.",
    },
    THIS_MONTH_TRAININGS: {
      LABEL: "Treinos este mês",
      DESCRIPTION: "Treinos no decorrer deste mês.",
      LOADING: "Carregar média de treinos.",
    },
  },
  TRAINING: {
    DESIGNATION: "Treino",
    TRAINING_DETAILS: "Detalhes do Treino",
  },
};
