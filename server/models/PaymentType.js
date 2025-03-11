module.exports = (sequelize, DataTypes) => {
  const PaymentType = sequelize.define(
    "PaymentType",
    {
      paymentTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "payment_type_id",
      },
      paymentMethod: {
        type: DataTypes.ENUM("cash", "mbway", "bank_transfer", "credit_card"),
        allowNull: false,
        unique: true,
        field: "payment_method",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "description",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "payment_types",
    }
  );

  PaymentType.associate = (models) => {
    PaymentType.hasMany(models.WalletMovement, {
      foreignKey: "paymentTypeId",
      as: "transactions",
    });
  };

  return PaymentType;
};
