module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define(
    "Training",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      notes: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  Training.associate = (models) => {
    Training.belongsTo(models.Client, { foreignKey: "clientId" });
    Training.belongsTo(models.Coach, { foreignKey: "coachId" });
  };

  return Training;
};
