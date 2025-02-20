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
      notes: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  Training.associate = (models) => {
    Training.belongsTo(models.Client, {
      foreignKey: "client_id",
      as: "client",
    });
    Training.belongsTo(models.Coach, { foreignKey: "coach_id", as: "coach" });
    Training.belongsTo(models.Academy, {
      foreignKey: "academy_id",
      as: "academy",
    });
    Training.belongsTo(models.TrainingType, {
      foreignKey: "training_type_id",
      as: "trainingType",
    });
  };

  return Training;
};
