"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorites.belongsTo(models.Users, { foreignKey: "user_id" });
      Favorites.belongsTo(models.Houses, { foreignKey: "house_id" });
    }
  }
  Favorites.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
        },
      },
      house_id: {
        type: DataTypes.STRING,
        references: {
          model: "Houses",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Favorites",
    }
  );
  return Favorites;
};
