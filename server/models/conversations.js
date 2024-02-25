"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversations.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "User",
      });
      Conversations.belongsTo(models.Users, {
        foreignKey: "target_id",
        as: "TargetUser",
      });
      Conversations.hasMany(models.Messages, {
        foreignKey: "conversation_id",
        as: "Messages",
      });
    }
  }
  Conversations.init(
    {
      user_id: DataTypes.STRING,
      target_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Conversations",
    }
  );
  return Conversations;
};
