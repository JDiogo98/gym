module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      clientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "client_id",
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "client_name",
      },
      clientPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "client_phone_number",
      },
      clientSex: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "client_sex",
      },
      clientBirthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "client_birth_date",
      },
      clientRegistrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "client_registration_date",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "clients",
    }
  );

  Client.associate = (models) => {
    Client.belongsTo(models.Academy, {
      foreignKey: "academyId",
      as: "academy",
    });
    Client.belongsTo(models.Coach, {
      foreignKey: "coachId",
      as: "coach",
      onDelete: "SET NULL",
    });
    Client.hasMany(models.Training, {
      foreignKey: "clientId",
      as: "trainings",
    });
  };

  return Client;
};
