module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define(
    "Training",
    {
      trainingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "training_id",
      },
      trainingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "training_date",
      },
      trainingDuration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "training_duration",
      },
      trainingNotes: {
        type: DataTypes.STRING,
        field: "training_notes",
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  Training.associate = (models) => {
    Training.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client",
    });
    Training.belongsTo(models.Coach, {
      foreignKey: "coachId",
      as: "coach",
    });
    Training.belongsTo(models.Academy, {
      foreignKey: "academyId",
      as: "academy",
    });
    Training.belongsTo(models.TrainingType, {
      foreignKey: "trainingTypeId",
      as: "trainingType",
    });
  };

  return Training;
};
