"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Messages.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
      Messages.belongsTo(models.Conversations, {
        foreignKey: "conversation_id",
      });
    }
  }
  Messages.init(
    {
      user_id: DataTypes.STRING,
      message: DataTypes.STRING,
      statusMessage: DataTypes.STRING,
      conversation_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
