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
