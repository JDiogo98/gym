module.exports = (sequelize, DataTypes) => {
  const OTP = sequelize.define(
    "OTP",
    {
      otpId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "otp_id",
      },
      otpCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 4],
        },
        field: "otp_code",
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expiration_date",
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "used", "expired"],
        defaultValue: "pending",
        field: "status",
      },
      attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: "attempts",
      },
      actionType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "action_type",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "otps",
      defaultScope: {
        attributes: { exclude: ["status"] },
      },
    }
  );

  OTP.associate = (models) => {
    // Relacionamento com o modelo Client
    OTP.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client",
    });
  };

  return OTP;
};
