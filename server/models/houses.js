"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Houses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Houses.belongsTo(models.Users, { foreignKey: "seller_id", as: "seller" });
      Houses.hasMany(models.Favorites, {
        foreignKey: "house_id",
        as: "favorites",
      });
    }
  }
  Houses.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.NUMBER,
      location: DataTypes.JSON,
      bedrooms: DataTypes.NUMBER,
      bathrooms: DataTypes.NUMBER,
      images: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Houses",
    }
  );
  return Houses;
};
