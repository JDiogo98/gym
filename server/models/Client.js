module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define(
    "Client",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastTraining: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      registrationDate: {
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
  Clients.associate = (models) => {
    Clients.belongsTo(models.Academy, {
      foreignKey: "academyId",
      as: "academy",
    });
    Clients.belongsTo(models.Coach, { foreignKey: "coachId", as: "coach" });
  };

  return Clients;
};
