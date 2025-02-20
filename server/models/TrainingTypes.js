module.exports = (sequelize, DataTypes) => {
  const TrainingType = sequelize.define(
    "TrainingType",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "training_types",
    }
  );

  TrainingType.associate = (models) => {
    TrainingType.hasMany(models.Training, { foreignKey: "training_type_id" });
  };

  return TrainingType;
};
