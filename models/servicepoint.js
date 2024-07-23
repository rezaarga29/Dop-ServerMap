"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicePoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServicePoint.belongsTo(models.ServiceCategory, {
        foreignKey: "ServiceCategoryId",
      });
    }
  }
  ServicePoint.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already exists",
        },
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address is required",
          },
          notEmpty: {
            msg: "Address is required",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Phone already exists",
        },
        validate: {
          notNull: {
            msg: "Phone is required",
          },
          notEmpty: {
            msg: "Phone is required",
          },
        },
      },
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      open: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Open is required",
          },
          notEmpty: {
            msg: "Open is required",
          },
        },
      },
      closed: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Closed is required",
          },
          notEmpty: {
            msg: "Closed is required",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Type is required",
          },
          notEmpty: {
            msg: "Type is required",
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      ServiceCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ServicePoint",
      hooks: {
        // beforeCreate: async (instance, options) => {
        //   instance.latitude = parseFloat(instance.latitude);
        //   instance.longitude = parseFloat(instance.longitude);
        // },
        // beforeUpdate: async (instance, options) => {
        //   instance.latitude = parseFloat(instance.latitude);
        //   instance.longitude = parseFloat(instance.longitude);
        // },
        beforeCreate: async (instance, options) => {
          if (instance.type === "DOP") {
            instance.ServiceCategoryId = 1;
          } else if (instance.type === "CPB") {
            instance.ServiceCategoryId = 2;
          } else {
            instance.ServiceCategoryId = 3;
          }
        },
        beforeUpdate: async (instance, options) => {
          if (instance.type === "DOP") {
            instance.ServiceCategoryId = 1;
          } else if (instance.type === "CPB") {
            instance.ServiceCategoryId = 2;
          } else {
            instance.ServiceCategoryId = 3;
          }
        },
      },
    }
  );
  return ServicePoint;
};
