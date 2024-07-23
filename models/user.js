"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ServiceCategory, { foreignKey: "UserId" });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username has already been taken",
        },
        validate: {
          notNull: { msg: "Username is required!" },
          notEmpty: { msg: "Username is required!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required!" },
          notEmpty: { msg: "Password is required!" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
          notNull: { msg: "Role is required!" },
          notEmpty: { msg: "Role is required!" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        async beforeCreate(instance, options) {
          instance.password = await encrypt(instance.password);
        },
        async beforeUpdate(instance, options) {
          if (instance.changed("password")) {
            instance.password = await encrypt(instance.password);
          }
        },
      },
    }
  );

  return User;
};
