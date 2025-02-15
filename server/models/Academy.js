module.exports = (sequelize, DataTypes) => {
  const Academy = sequelize.define(
    "Academy",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
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

  // JD - Definição de Associação (Uma academia tem vários clientes)
  Academy.associate = (models) => {
    Academy.hasMany(models.Client, { foreignKey: "academyId", as: "clients" });
  };

  return Academy;
};
