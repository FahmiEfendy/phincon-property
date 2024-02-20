"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Favorites, {
        foreignKey: "user_id",
        as: "favorites",
      });
      Users.hasMany(models.Houses, {
        foreignKey: "seller_id",
        as: "houses",
      });
    }
  }
  Users.init(
    {
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      image_url: DataTypes.STRING,
      image_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
