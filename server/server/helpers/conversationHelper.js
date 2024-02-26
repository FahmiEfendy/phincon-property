const _ = require("lodash");
const Boom = require("boom");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const db = require("../../models");
const generalHelper = require("../helpers/generalHelper");

const fileName = "server/helpers/conversationHelper.js";

const postCreateConversation = async (objectData) => {
  const { user_id, target_id } = objectData;

  try {
    const [conversation, conversationCreated] =
      await db.Conversations.findOrCreate({
        where: { user_id, target_id },
        defaults: { id: uuidv4(), user_id, target_id },
      });

    if (!conversationCreated) {
      const existingConversation = await db.Conversations.findOne({
        where: { user_id, target_id },
      });

      if (!existingConversation) {
        throw Boom.notFound(
          `Conversation from user with id of ${user_id} to user with id of ${target_id} not found!`
        );
      }

      return Promise.resolve(existingConversation);
    }

    console.log([fileName, "POST Create Conversation", "INFO"]);

    return Promise.resolve(conversation);
  } catch (err) {
    console.log([fileName, "POST Create Conversation", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getUserConversationList = async (objectData) => {
  const { user_id } = objectData;

  try {
    const userConversationList = await db.Conversations.findAll({
      where: { [Op.or]: [{ user_id: user_id }, { target_id: user_id }] },
      include: [
        {
          model: db.Users,
          as: "User",
          attributes: ["id", "fullName", "image_url"],
        },
        {
          model: db.Users,
          as: "TargetUser",
          attributes: ["id", "fullName", "image_url"],
        },
      ],
    });

    if (_.isEmpty(userConversationList)) {
      throw Boom.notFound("No user conversation list found!");
    }

    console.log([fileName, "GET User Conversation List", "INFO"]);

    return Promise.resolve(userConversationList);
  } catch (err) {
    console.log([fileName, "GET User Conversation List", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getConversationDetail = async (params) => {
  const { id } = params;

  try {
    const conversationDetail = await db.Conversations.findOne({
      where: { id },
      include: [
        {
          model: db.Messages,
          as: "Messages",
        },
        {
          model: db.Users,
          as: "User",
        },
        {
          model: db.Users,
          as: "TargetUser",
        },
      ],
    });

    const sortedMessages = conversationDetail.Messages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    conversationDetail.Messages = sortedMessages;

    if (_.isEmpty(conversationDetail)) {
      throw Boom.notFound("No conversation detail found!");
    }

    console.log([fileName, "GET Conversation Detail", "INFO"]);

    return Promise.resolve(conversationDetail);
  } catch (err) {
    console.log([fileName, "GET Conversation Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

module.exports = {
  postCreateConversation,
  getUserConversationList,
  getConversationDetail,
};
