module.exports = (sequelize, DataTypes) => {
  const Coach = sequelize.define(
    "Coach",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["visible"] }, // JD -  Oculta "visible" por padrão
      },
      scopes: {
        withHiddenFields: {
          attributes: { include: ["visible"] }, // JD -  Permite obter o  "visible" quando necessário
        },
      },
    }
  );

  // Relacionamentos - Devem ser definidos externamente
  Coach.associate = (models) => {
    // JD - Coaches com Academies
    Coach.belongsTo(models.Academy, { foreignKey: "academyId" });

    // JD - Definição de Associação Coaches com Clients
    Coach.hasMany(models.Client, { foreignKey: "coachId" });
  };

  return Coach;
};
