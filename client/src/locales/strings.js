// export  STRINGS = {
//   TITLES: {
//     CLIENT_INFO: "Informações Pessoais",
//     ADD_NEW_CLIENT: "Adicionar Novo Cliente",
//   },
//   APP: {
//     LOADING_USER: "Carregar dados do Utilizador",
//     USER_NOT_FOUND: "Não foi possível encontrar os dados do cliente.",
//     INVALID_CLIENT_ID: "O ID do cliente não é válido.",
//     ERROR_FETCHING: "Erro ao buscar dados.",
//   },
//   CLIENT: {
//     DESIGNATION: "Cliente",
//     NAME: "Nome",
//     PHONE: "N.º Telemóvel",
//     BIRTH_DATE: "Data de Nascimento",
//     REGISTRATION_DATE: "Data de Inscrição",
//     SEX: {
//       LABEL: "Sexo",
//       MASCULINE: "Masculino",
//       FEMININE: "Feminino",
//       OTHER: "Outro",
//     },
//     EMAIL: "E-mail",
//   },
//   ACADEMY: {
//     DESIGNATION: "Academia",
//     SELECT: "Selecione uma academia",
//     OPTIONAL: "Academia (opcional)",
//     DATE: "Data do Treino",
//     TIME: "Hora do Treino",
//     TYPE: "Tipo de Treino",
//   },
//   COACH: {
//     DESIGNATION: "Treinador",
//     SELECT: "Selecione um treinador",
//     OPTIONAL: "Treinador (opcional)",
//     NONE: "Nenhum treinador",
//     SELECT_COACH: "Selecione o treinador",
//   },
//   BUTTONS: {
//     ADD: "Adicionar",
//     SAVE: "Salvar",
//     EDIT: "Editar",
//     CANCEL: "Cancelar",
//     DELETE: "Eliminar",
//     ADD_CLIENT: "Adicionar Cliente",
//   },
//   TOAST_MESSAGES: {
//     UPDATE_SUCCESS: (name) =>
//       `Os dados do/a ${name} foram atualizados com sucesso!`,
//     UPDATE_ERROR: (name) =>
//       `Não foi possível atualizar os dados do/a ${name}, tente novamente.`,
//     ADD_SUCCESS: (name) => `O/a ${name} foi adicionado/a com sucesso!`,
//     ADD_ERROR: "Ocorreu um erro ao adicionar o cliente",
//     FETCH_ERROR: "Ocorreu um erro ao buscar os dados.",
//     TRAINING_UPDATE_SUCCESS: "Treino atualizado com sucesso!",
//     TRAINING_UPDATE_ERRROR_TRY_AGAIN:
//       "Erro ao atualizar treino, por favor tente novamente.",
//   },
//   VALIDATION_ERRORS: {
//     NAME: "O nome deve ter pelo menos 2 caracteres.",
//     PHONE: "O número de telefone deve ter 9 dígitos.",
//     BIRTH_DATE: "A data de nascimento é obrigatória.",
//     REGISTRATION_DATE: "A data de inscrição é obrigatória.",
//     SEX: "Por favor, selecione um gênero.",
//   },
//   DASHBOARD: {
//     TRAININGS_AVERAGE: {
//       LABEL: "Média de Treinos",
//       DESCRIPTION: "Média de treinos por cliente.",
//       LOADING: "Carregar média de treinos.",
//     },
//     ACTIVE_CLIENTS: {
//       LABEL: "Clientes Ativos",
//       DESCRIPTION: "Clientes com treinos em 30 dias.",
//       LOADING: "Carregar média de treinos.",
//     },
//     THIS_MONTH_TRAININGS: {
//       LABEL: "Treinos este mês",
//       DESCRIPTION: "Treinos no decorrer deste mês.",
//       LOADING: "Carregar média de treinos.",
//     },
//   },
//   TRAINING: {
//     DESIGNATION: "Treino",
//     TRAINING_DETAILS: "Detalhes do Treino",
//   },
// };

export const LOGIN = {
  TITLE: "Iniciar Sessão",
  DESCRIPTION: "Insira o seu E-mail e Password para iniciar sessão.",
  EMAIL: {
    LABEL: "E-mail",
    PLACEHOLDER: "Insira o seu e-mail",
  },
  PASSWORD: {
    LABEL: "Password",
    PLACEHOLDER: "Insira a sua password",
  },
  VALIDATION: {
    EMAIL_INVALID: "Por favor, insira um e-mail válido.",
    PASSWORD_MIN: "A senha deve ter pelo menos 6 caracteres.",
    LOGIN_SUCCESS: "Login efetuado com sucesso!",
    LOGIN_ERROR: "E-mail ou Password inválidos.",
  },
  BUTTONS: {
    LOGIN: "Iniciar Sessão",
  },
  LINKS: {
    FORGOT_PASSWORD: "Esqueceu-se da password?",
    DONT_HAVE_ACCOUNT: "Ainda não tem conta?",
    REGISTER: "Registar",
  },
};

export const REGISTER = {
  TITLE: "Registar conta",
  DESCRIPTION: "Preencha os campos para registar a sua conta.",
  NAME: {
    LABEL: "Nome",
    PLACEHOLDER: "Insira o seu nome",
  },
  PHONE_NUMBER: {
    LABEL: "Número de telemóvel",
    PLACEHOLDER: "Insira o seu número de telemóvel",
  },
  EMAIL: {
    LABEL: "E-mail",
    PLACEHOLDER: "Insira o seu e-mail",
  },
  PASSWORD: {
    LABEL: "Password",
    PLACEHOLDER: "Insira a sua password",
  },
  CONFIRM_PASSWORD: {
    LABEL: "Confirmar Password",
    PLACEHOLDER: "Confirme a sua password",
  },
  VALIDATION: {
    NAME_MIN: "O nome deve ter pelo menos 2 caracteres.",
    EMAIL_INVALID: "O e-mail inserido não é válido.",
    PASSWORD_MIN: "A Password deve ter pelo menos 6 caracteres.",
    PASSWORD_UPPERCASE: "A Password deve ter pelo menos uma letra maiúscula.",
    PASSWORD_LOWERCASE: "A Password deve ter pelo menos uma letra minúscula.",
    PASSWORD_SYMBOL: "A Password deve ter pelo menos um símbolo.",
    PASSWORD_MISMATCH: "As Passwords não coincidem.",
    VALID_EMAIL: "O e-mail inserido não é válido.",
    REGISTER_SUCCESS: "Utilizador registado com sucesso!",
    REGISTER_SUCCESS_DESCRIPTION:
      "A sua conta foi criada, pode iniciar sessão.",
    REGISTER_ERROR: "Erro ao registar o utilizador.",
    REGISTER_ERROR_DESCRIPTION:
      "Ocorreu um erro ao registar o utilizador, tente novamente.",

    LOGIN_SUCCESS: "Sessão iniciada com sucesso!",
    LOGIN_ERROR: "E-mail ou Password inválidos.",
  },

  BUTTONS: {
    REGISTER: "Registar conta",
  },
  LINKS: {
    ALREADY_HAVE_ACCOUNT: "Já tem conta?",
    LOGIN: "Faça o login",
  },
};

export const ACADEMY_SETTINGS = {
  ACADEMY_SETTINGS: "Editar Academias",
  ADD_NEW_ACADEMY_FILL: "Adicionar Nova Academia",
  LOADING_ACADEMIES: "Carregar academias...",
  EDIT_ACADEMIES: "Editar Academias",
  EDIT_ACADEMY: "Editar Academias",
  ADD_ACADEMY: "Adicionar Academia",
  ADD_NEW_ACADEMY: "Adicionar nova Academia",
  ACADEMIES_SETTINGS: "Configurações das Academias",
  FILL_NEW_ACADEMY_FIELDS: "Preencha os detalhes da nova academia.",
  UPDATE_ACADEMY_DETAILS: "Atualize os detalhes da academia.",
  NAME: {
    LABEL: "Nome",
    PLACEHOLDER: "Insira o nome da academia",
  },
  ADDRESS: {
    LABEL: "Morada",
    PLACEHOLDER: "Insira a morada da academia",
  },
  LOCATION: {
    LABEL: "Localidade",
    PLACEHOLDER: "Insira a localidade da academia",
  },
  ZIP_CODE: {
    LABEL: "Código Postal",
    PLACEHOLDER: "Insira o código postal da academia",
  },
  BUTTONS: {
    ADD_ACADEMY: "Adicionar Academia",
    SAVE: "Salvar",
    CANCEL: "Cancelar",
  },
  STATUS: {
    LABEL: "Status",
    ACTIVE: "Ativo",
    INACTIVE: "Inativo",
  },
  VALIDATION_FIELDS: {
    FILL_THE_FIELD: "Preencha o campo ",
    CARACTERES: "caracteres",
    MUST_HAVE_MIN: "deve ter no mínimo",
    MUST_HAVE_MAX: "deve ter no máximo",
  },

  TOAST: {
    FILL_FIELDS: "Preencha os campos da noda academia.",
    ADD_SUCCESS: "Academia adicionada com sucesso!",
    UPDATE_SUCCESS: "Academia atualizada com sucesso!",
    UPDATE_ERROR: "Erro ao atualizar a academia.",
    ADD_ERROR: "Erro ao adicionar a academia.",
    UNEXPECTED_ERROR: "Ocorreu um erro inesperado.",
    SERVER_ERROR: "Erro ao obter os dados do servidor.",
  },
};

export const TRAINING_TYPES_SETTINGS = {
  TYPES_SETTINGS: "Editar Tipos de Treino",
  LOADING_TYPES: "Carregar tipos de treino...",
  NAME: {
    LABEL: "Nome",
    PLACEHOLDER: "Insira o nome do tipo de treino",
  },
  TOAST: {
    FILL_FIELDS: "Preencha os campos do novo tipo de treino.",
    ADD_SUCCESS: "Tipo de treino adicionado com sucesso!",
    UPDATE_SUCCESS: "Tipo de treino atualizado com sucesso!",
    UPDATE_ERROR: "Erro ao atualizar o tipo de treino.",
    ADD_ERROR: "Erro ao adicionar o tipo de treino.",
    UNEXPECTED_ERROR: "Ocorreu um erro inesperado.",
    SERVER_ERROR: "Erro ao obter os dados do servidor.",
    DELETE_SUCESS: "Tipo de treino eliminado com sucesso!",
  },
  VALIDATION: {
    FILL_THE_FIELD: "Preencha o campo ",
    CARACTERES: "caracteres",
    MUST_HAVE_MIN: "deve ter no mínimo",
    MUST_HAVE_MAX: "deve ter no máximo",
  },
}

//TODO VARIAVEIS PARA OS MODELS
