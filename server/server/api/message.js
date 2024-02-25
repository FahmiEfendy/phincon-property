const router = require("express").Router();

const generalHelper = require("../helpers/generalHelper");
const messageHelper = require("../helpers/messageHelper");
const userMiddleware = require("../middlewares/userMiddleware");
const validationHelper = require("../../server/helpers/validationHelper");

const sendMessage = async (req, res) => {
  const validateData = {
    message: req.body.message,
    conversation_id: req.body.conversation_id,
  };

  try {
    validationHelper.messageValidation(validateData);

    const objectData = {
      ...validateData,
      user_id: req.body.user_id,
    };

    const response = await messageHelper.postSendMessage(objectData);

    res
      .status(201)
      .send({ message: "Successfully Send Message", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

router.post("/send", userMiddleware.tokenValidation, sendMessage);

module.exports = router;
