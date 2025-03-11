module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      walletId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "wallet_id",
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: "client_id",
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "balance",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "wallets",
    }
  );

  Wallet.associate = (models) => {
    Wallet.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client",
    });

    Wallet.hasMany(models.WalletMovement, {
      foreignKey: "walletId",
      as: "movements",
    });
  };

  return Wallet;
};
