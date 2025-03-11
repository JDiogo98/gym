module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        field: "email",
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password_hash",
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "refresh_token",
      },
      lastLogin: {
        type: DataTypes.DATE,
        field: "last_login",
      },
      lastIp: {
        type: DataTypes.STRING,
        validate: {
          isIP: true,
        },
        field: "last_ip",
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "coach"),
        defaultValue: "user",
        field: "role",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "users",
    }
  );

  return User;
};
