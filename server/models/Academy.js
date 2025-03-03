module.exports = (sequelize, DataTypes) => {
  const Academy = sequelize.define(
    "Academy",
    {
      academyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "academy_id",
      },
      academyName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "academy_name",
      },
      academyAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "academy_address",
      },
      academyLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "academy_location",
      },
      academyZipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "academy_zip_code",
      },
      academyVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "academy_visible",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "academies",
      defaultScope: {
        attributes: { exclude: ["academyVisible"] },
      },
      scopes: {
        withHiddenFields: {
          attributes: { include: ["academyVisible"] },
        },
      },
    }
  );

  Academy.associate = (models) => {
    Academy.hasMany(models.Client, {
      foreignKey: "academyId",
      as: "clients",
    });
    Academy.hasMany(models.Training, {
      foreignKey: "academyId",
      as: "trainings",
    });
  };

  return Academy;
};
