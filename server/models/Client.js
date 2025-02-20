module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_training: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      registration_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
    }
  );

  // Relacionamentos - Devem ser definidos externamente
  Client.associate = (models) => {
    Client.belongsTo(models.Academy, {
      foreignKey: "academy_id",
      as: "academy",
    });
    Client.belongsTo(models.Coach, {
      foreignKey: "coach_id",
      as: "coach",
    });
    Client.hasMany(models.Training, {
      foreignKey: "client_id",
      as: "trainings",
    });
  };
  return Client;
};
