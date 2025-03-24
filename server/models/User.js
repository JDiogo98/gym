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
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        field: "user_email",
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "user_name",
      },
      userPasswordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "user_password_hash",
      },
      userRefreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "user_refresh_token",
      },
      userLastLogin: {
        type: DataTypes.DATE,
        field: "user_last_login",
      },
      userLastIp: {
        type: DataTypes.STRING,
        validate: {
          isIP: true,
        },
        field: "user_last_ip",
      },
      userRole: {
        type: DataTypes.ENUM("admin", "user", "coach"),
        defaultValue: "user",
        field: "user_role",
      },
      userIsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "user_is_active",
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

// todo criar o phone input
// todo regitar os metadados do user


// todo fazer forget_password e reset_password

// roles: admin, user




// o admin tem as definições de academias, treinos durações, 

// admin pode suspender, ativar e eliminar utilizadores
// só o admin pode verificar contas de users