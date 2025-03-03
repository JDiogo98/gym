module.exports = (sequelize, DataTypes) => {
  const TrainingType = sequelize.define(
    "TrainingType",
    {
      trainingTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "training_type_id",
      },
      trainingTypeName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "training_type_name",
      },
      trainingTypeVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "training_type_visible",
      },
    },
    {
      tableName: "training_types",
    }
  );

  TrainingType.associate = (models) => {
    TrainingType.hasMany(models.Training, {
      foreignKey: "trainingTypeId",
      as: "trainings",
    });
  };

  return TrainingType;
};
