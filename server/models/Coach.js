module.exports = (sequelize, DataTypes) => {
  const Coach = sequelize.define(
    "Coach",
    {
      coachId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "coach_id",
      },
      coachName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "coach_name",
      },
      coachPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "coach_phone_number",
      },
      coachSex: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "coach_sex",
      },
      coachBirthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "coach_birth_date",
      },
      coachVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "coach_visible",
      },
    },
    {
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ["coachVisible"] },
      },
      scopes: {
        withHiddenFields: {
          attributes: { include: ["coachVisible"] },
        },
      },
    }
  );

  Coach.associate = (models) => {
    Coach.hasMany(models.Client, {
      foreignKey: "coachId",
      as: "clients",
    });
    Coach.hasMany(models.Training, {
      foreignKey: "coachId",
      as: "trainings",
    });
  };

  return Coach;
};


// todo coloca os coaches nas definições
