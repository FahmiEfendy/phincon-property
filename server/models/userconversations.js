"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserConversations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserConversations.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "user",
      });
      UserConversations.belongsTo(models.Conversations, {
        foreignKey: "conversation_id",
        as: "conversation",
      });
    }
  }
  UserConversations.init(
    {
      user_id: DataTypes.STRING,
      conversation_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserConversations",
    }
  );
  return UserConversations;
};
