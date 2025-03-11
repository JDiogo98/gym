module.exports = (sequelize, DataTypes) => {
  const WalletMovement = sequelize.define(
    "WalletMovement",
    {
      movementId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "movement_id",
      },
      walletId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "wallet_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      trainingQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "training_quantity",
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "payment_method",
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "purchase_date",
      },
      paymentNotes: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "payment_notes",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "wallet_movements",
    }
  );

  WalletMovement.associate = (models) => {
    WalletMovement.belongsTo(models.Wallet, {
      foreignKey: "walletId",
      as: "wallet",
    });

    WalletMovement.belongsTo(models.User, {
      foreignKey: "userId",
      as: "registeredBy",
    });
  };

  return WalletMovement;
};
