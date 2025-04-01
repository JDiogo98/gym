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
      otpExpirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "otp_expiration_date",
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "used", "expired"],
        defaultValue: "pending",
        field: "otp_status",
      },
      otpAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: "otp_attempts",
      },
      otpActionType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "otp_action_type",
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
    OTP.belongsTo(models.Coach, {
      foreignKey: "coachId",
      as: "coach",
    });
  };

  return OTP;
};
