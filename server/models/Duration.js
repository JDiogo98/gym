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
      durationNumber: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "duration_number",
      },
      durationName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "duration_name",
      },
      durationVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "duration_visible",
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
