const _ = require("lodash");
const Boom = require("boom");
const { v4: uuidv4 } = require("uuid");

const db = require("../../models");
const generalHelper = require("../helpers/generalHelper");

const fileName = "server/helpers/messageHelper.js";

const postSendMessage = async (objectData) => {
  const { user_id, conversation_id, message } = objectData;

  try {
    const selectedConversation = await db.Conversations.findOne({
      where: { id: conversation_id },
    });

    if (_.isEmpty(selectedConversation)) {
      throw Boom.notFound("No conversation found!");
    }

    const newMessage = await db.Messages.create({
      id: uuidv4(),
      user_id,
      conversation_id,
      message,
      statusMessage: "delivered",
    });

    console.log([fileName, "POST Send Message", "INFO"]);

    return Promise.resolve(newMessage);
  } catch (err) {
    console.log([fileName, "POST Send Message", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

module.exports = { postSendMessage };
