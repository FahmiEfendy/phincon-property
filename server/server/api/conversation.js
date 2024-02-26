const router = require("express").Router();

const generalHelper = require("../helpers/generalHelper");
const userMiddleware = require("../middlewares/userMiddleware");
const conversationHelper = require("../helpers/conversationHelper");
const validationHelper = require("../../server/helpers/validationHelper");

const createConversation = async (req, res) => {
  try {
    const objectData = {
      user_id: req.body.user_id,
      target_id: req.body.target_id,
    };

    validationHelper.idValidation({ id: req.body.target_id });

    const response = await conversationHelper.postCreateConversation(
      objectData
    );

    res.status(201).send({
      message: "Successfully Create or Find New Conversation",
      data: response,
    });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const userConversationList = async (req, res) => {
  try {
    const response = await conversationHelper.getUserConversationList({
      user_id: req.body.user_id,
    });

    res.status(200).send({
      message: "Successfully Get User Conversation List",
      data: response,
    });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const conversationDetail = async (req, res) => {
  try {
    validationHelper.idValidation(req.params);
    validationHelper.paginationValidation(req.query);

    const objectData = {
      id: req.params.id,
      page: req.query.page,
      pageSize: req.query.pageSize,
    };

    const response = await conversationHelper.getConversationDetail(objectData);

    res.status(200).send({
      message: "Successfully Get Conversation Detail",
      data: response,
    });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

router.post("/create", userMiddleware.tokenValidation, createConversation);
router.get("/list", userMiddleware.tokenValidation, userConversationList);
router.get("/detail/:id", userMiddleware.tokenValidation, conversationDetail);

module.exports = router;
