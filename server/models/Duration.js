module.exports = (sequelize, DataTypes) => {
  const Duration = sequelize.define(
    "Duration",
    {
      durationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "duration_id",
      },
      durationName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "duration_name",
      },
    },
    {
      tableName: "training_durations",
      timestamps: true,
      underscored: true,
    }
  );

  return Duration;
};
