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
      zip_code: {
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
        attributes: { exclude: ["visible"] }, // Oculta "visible" por padrão
      },
      scopes: {
        withHiddenFields: {
          attributes: { include: ["visible"] }, // Permite obter "visible" quando necessário
        },
      },
    }
  );

  // Definição de Associação: Uma academia tem vários clientes
  Academy.associate = (models) => {
    Academy.hasMany(models.Client, {
      foreignKey: "academy_id",
      as: "clients",
    });
  };

  return Academy;
};
